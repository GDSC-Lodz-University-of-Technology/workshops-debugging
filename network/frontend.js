const httpCallBtn = document.querySelector('#http-call');
const openWSBtn = document.querySelector('#ws-call-open');
const closeWSBtn = document.querySelector('#ws-call-close');
const sendWSMsgBtn = document.querySelector('#ws-send-msg');
const wsMsgInput = document.querySelector('#ws-msg');
let ws;

async function sendHTTPRequest() {
    const request = await fetch("http://localhost:3000/data");
    const response = await request.json();
    console.log(response);
}

function openWSConnection() {
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("WebSocket is already open.");
        return;
    }

    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
        console.log("WebSocket Opened");
    };
    ws.onmessage = (msg) => console.log("Received:", msg.data);
    ws.onclose = () => console.log("WebSocket Closed");
}

function closeWSConnection() {
    if (ws) {
        ws.close();
        console.log("Closing WebSocket connection");
    } else {
        console.log("No WebSocket connection to close.");
    }
}

function sendWSMsg() {
    if (ws) {
        const msg = wsMsgInput.value || 'Hello World';
        ws.send(msg);
    } else {
        console.log("No WebSocket connection.");
    }
}

httpCallBtn.addEventListener('click', sendHTTPRequest);
openWSBtn.addEventListener('click', openWSConnection);
closeWSBtn.addEventListener('click', closeWSConnection);
sendWSMsgBtn.addEventListener('click', sendWSMsg);
