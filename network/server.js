const http = require("http");
const crypto = require("crypto");

const PORT = 3000;
const ALLOWED_ORIGIN = "http://127.0.0.1:8080";

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (req.method === "GET" && req.url === "/data") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Hello from server!", timestamp: Date.now() }));
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

// WebSocket Upgrade
server.on("upgrade", (req, socket) => {
    if (req.headers["upgrade"] !== "websocket") {
        socket.destroy();
        return;
    }

    const key = req.headers["sec-websocket-key"];
    const acceptKey = crypto.createHash("sha1")
        .update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
        .digest("base64");

    const headers = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${acceptKey}`,
    ];
    socket.write(headers.join("\r\n") + "\r\n\r\n");

    console.log("WebSocket connection established");

    // Send a message every second
    const interval = setInterval(() => {
        if (socket.destroyed) {
            clearInterval(interval);
        } else {
            const message = JSON.stringify({ message: "Real-time update", timestamp: Date.now() });
            socket.write(encodeWebSocketMessage(message));
        }
    }, 1000);

    // Handle WebSocket Messages
    socket.on("data", (data) => {
        const message = decodeWebSocketMessage(data);
        if (message) {
            console.log("Received WebSocket message:", message);

            // Echo the message back to the client
            socket.write(encodeWebSocketMessage(`Echo: ${message}`));
        }
    });

    socket.on("close", () => {
        console.log("WebSocket connection closed");
        clearInterval(interval);
    });

    socket.on("end", () => {
        console.log("WebSocket connection ended by client");
        clearInterval(interval);
    });
});

// Function to encode WebSocket messages correctly
function encodeWebSocketMessage(message) {
    const messageBuffer = Buffer.from(message);
    const length = messageBuffer.length;
    let frame;

    if (length < 126) {
        frame = Buffer.alloc(2 + length);
        frame[1] = length;
    } else if (length < 65536) {
        frame = Buffer.alloc(4 + length);
        frame[1] = 126;
        frame.writeUInt16BE(length, 2);
    } else {
        frame = Buffer.alloc(10 + length);
        frame[1] = 127;
        frame.writeBigUInt64BE(BigInt(length), 2);
    }

    frame[0] = 0x81; // Text frame
    messageBuffer.copy(frame, frame.length - length);
    return frame;
}

// Function to decode WebSocket messages properly
function decodeWebSocketMessage(buffer) {
    if (buffer.length < 2) return null;

    const secondByte = buffer[1];
    let length = secondByte & 127;
    let offset = 2;

    if (length === 126) {
        length = buffer.readUInt16BE(2);
        offset = 4;
    } else if (length === 127) {
        length = Number(buffer.readBigUInt64BE(2));
        offset = 10;
    }

    const maskingKey = buffer.slice(offset, offset + 4);
    offset += 4;
    const encodedMessage = buffer.slice(offset, offset + length);
    const decodedMessage = Buffer.alloc(length);

    for (let i = 0; i < length; i++) {
        decodedMessage[i] = encodedMessage[i] ^ maskingKey[i % 4];
    }

    return decodedMessage.toString();
}

// Start Server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
