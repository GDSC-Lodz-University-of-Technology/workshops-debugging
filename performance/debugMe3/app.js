function blockMainThread() {
	const start = Date.now();
	while (Date.now() - start < 200) {
	} // Block for 100ms

	console.log('finish blocking')
}

let a = [];

function answerA() {
	for (let i = 0; i < 100; i++) {
		a.push({ a: Math.random(), data: new Array(1000) })
	}
	blockMainThread()
}

function answerB() {
	for (let i = 0; i < 100; i++) {
		a.push({ b: Math.random(), data: new Array(1000) })
	}
	blockMainThread()
}

function answerC() {
	for (let i = 0; i < 100; i++) {
		a.push({ c: 1, data: new Array(1) })
	}
	blockMainThread()
}


function answerD() {
	for (let i = 0; i < 200; i++) {
		a.push({ b: Math.random(), data: new Array(10000) })
	}
	blockMainThread()
}


const fns = [answerA, answerB, answerC, answerD]
setInterval(function allocateSth() {
	const selectFn = Math.floor(Math.random() * 4);
	fns[selectFn]();
	console.log("list length: ", a.length)
	if (a.length > 4294967294) {
		console.log("reset list")
		a.length = 0;
	}

	a.forEach(() => {

	})

}, 1000)
