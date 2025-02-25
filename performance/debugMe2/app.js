function answer11() {
	const a = new Array(10000)
	a.map(() => Math.random)
}

function answer22() {
	const a = new Array(5000000)
	a.map(() => Math.random)
}

function answer44() {
	const a = new Array(10000000)
	a.map(() => Math.random)
}

function answer55() {
	const a = new Array(999999)
	a.map(() => Math.random)
}

setInterval(() => {
	answer11();
	answer22();
	answer44()
	answer55();
}, 20)


