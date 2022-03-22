
let answers = [
	{ song: "Sultans of swing", artist: "dire straits" },
	{ song: "Smells like teen spirit", artist: "nirvana" },
	{ song: "God's-plan", artist: "drake" },
	{ song: "Creep", artist: "radiohead" },
	{ song: "Wonderwall", artist: "oasis" },
	{ song: "Mr. Brightside", artist: "the killers" },
	{ song: "Riptide", artist: "vance joy" },
	{ song: "One", artist: "u2" },
	{ song: "Bohemian rhapsody", artist: "queen" },
	{ song: "Wake me up", artist: "avicii" },
	{ song: "Take me to church", artist: "hozier" },
	{ song: "Shape of you", artist: "ed sheeran" },
	{ song: "All that she wants", artist: "ace of base" },
	{ song: "Lean on", artist: "major lazer" },
	{ song: "Cheap thrills", artist: "sia" },
	{ song: "When I come around", artist: "green day" },
	{ song: "I'm yours", artist: "jason mraz" },
	{ song: "This love", artist: "maroon 5" },
	{ song: "The bad touch", artist: "bloodhound gang" },
	{ song: "The sound of silence", artist: "simon and garfunkel" },
	{ song: "Coming undone", artist: "korn" },
	{ song: "Just cant get enough", artist: "black eyed peas" },
	{ song: "Nothing else matters", artist: "metallica" },
	{ song: "Hey Ya!", artist: "outkast" }

];

function getRandomNumber() {
	return Math.floor(Math.random() * answers.length);
}

export function getRandomAnswer() {
	let randomNumber1 = getRandomNumber();
	let randomNumber2 = getRandomNumber();
	let randomNumber3 = getRandomNumber();
	let answer = [
		{ answer1: answers[randomNumber1] },
		{ answer2: answers[randomNumber2] },
		{ answer3: answers[randomNumber3] }
	]

	return answer;

}

