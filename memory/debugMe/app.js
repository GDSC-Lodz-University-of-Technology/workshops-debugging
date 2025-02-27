

window.functions = [];
window.globals = [];
//good classic global example
functions.push(['make FIND_ME_STRING', function makeString() {
	findMeString = "FIND_ME_STRING"
}])

functions.push(['make string and log', () => {
	findmeString = "FIND_ME_STRING_LOG"
	console.log(findmeString)
}])


functions.push(['make findMe object', () => {
	function FindMe() { }

	const one = new FindMe()
	const two = new FindMe()
}])


function FindMeDistanced() { }

functions.push(['make FindMeDistanced', () => {
	const foo = {
		one: {
			two: {
				three: {
					four: {
						five: new FindMeDistanced()
					}
				}
			}
		}
	}
}]);


functions.push(['make empty array', () => {
	globals.push(new Array(100000))
}])

//how js allocate strings
functions.push(['create array with strings', () => {
	let strings = new Array(1000);
	strings.fill(undefined);
	strings = strings.map((_, idx) => `${idx}`)
	globals.push(strings);
}])

//how js allocate strings with prefix
functions.push(['make array with prefix', () => {
	let strings = new Array(1000);
	strings.fill(undefined);
	strings = strings.map((_, idx) => `STRING_IN_ARRAY_${idx}`)
	globals.push(strings);
}])

functions.push(['make array of random strings', () => {
	let strings = new Array(1000);
	strings.fill(undefined);
	strings = strings.map((_, idx) => `${Math.random()}`);
	globals.push(strings);
}])

functions.push(['remove last item from globals', deleteLastObject = () => {
	globals.pop();
}])

functions.push(['copy globals', window.copyGlobals = () => {
	globals = [...globals]
}])


console.log(functions)

window.allButtons = [];

function renderButtons() {
	document.body.innerHTML = "</>"
	const buttons = functions.forEach(([label, fn]) => {
		const btn = document.createElement("button");
		btn.innerText = label;
		btn.style.display = 'block';
		btn.style.margin = '10px'
		btn.onclick = fn;
		document.body.appendChild(btn);
		allButtons.push(btn);
	})
}

functions.push(['render ui', renderButtons])
	;
renderButtons()
