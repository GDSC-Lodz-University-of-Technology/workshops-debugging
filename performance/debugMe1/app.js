(() => {
	document.body.innerHTML = `<div style="width: 100%; height: 100%; background: #1a6490"><span id="answer" style="display: user-select: none; font-size: 2rem; color: black">000</span><p>solution is 9 digits. It will be in 3 frames after slower one.</p></div>`

	function blockMainThread() {
		const start = Date.now();
		while (Date.now() - start < 100) {
			frames = 0;
		} // Block for 100ms
	}

	let lastFrameTime = 0;
	let showAnswer = 0;
	const answer = ["000", "125", "126", "127"]
	let answerElement = document.getElementById("answer");
	let showOne = true;
	function animate() {
		requestAnimationFrame(() => {
			// block main thread every 2 seconds
			if (performance.now() - lastFrameTime > 2000) {
				blockMainThread();
				lastFrameTime = performance.now();
				showAnswer = 4;
			}
			if (showAnswer > 0) {
				answerElement.innerHTML = answer[showAnswer - 1]
				showAnswer--;

				if (showAnswer === 0) answerElement.innerHTML = "000"
			} else {
				answerElement.innerHTML = showOne ? "001" : "000";
				showOne = !showOne
			}
			animate();
		});
	}

	setTimeout(animate(), 1000);
})()



