// let answers = [
// 	{ song: "Sultans of swing", artist: "dire straits" },
//     { song: "Smells like teen spirit", artist: "nirvana" },
//     { song: "God's-plan", artist: "drake" },
//     { song: "Creep", artist: "radiohead" },
//     { song: "Wonderwall", artist: "oasis" },
//     { song: "Mr. Brightside", artist: "the killers" },
//     { song: "Riptide", artist: "vance joy" },
//     { song: "One", artist: "u2" },
//     { song: "Bohemian rhapsody", artist: "queen" },
//     { song: "Wake me up", artist: "avicii" },
//     { song: "Take me to church", artist: "hozier" },
//     { song: "Shape of you", artist: "ed sheeran" },
//     { song: "All that she wants", artist: "ace of base" },
//     { song: "Lean on", artist: "major lazer" },
//     { song: "Cheap thrills", artist: "sia" },
//     { song: "When I come around", artist: "green day" },
//     { song: "I'm yours", artist: "jason mraz" },
//     { song: "This love", artist: "maroon 5" },
//     { song: "The bad touch", artist: "bloodhound gang" },
//     { song: "The sound of silence", artist: "simon and garfunkel" },
//     { song: "Coming undone", artist: "korn" },
//     { song: "Just cant get enough", artist: "black eyed peas" },
//     { song: "Nothing else matters", artist: "metallica" },
//     { song: "Hey Ya!", artist: "outkast" },
//     { song: "Since u been gone", artist: "kelly clarkson"},
//     { song: "Stayin alive", artist: "bee gees"},
//     { song: "Don't stop believin'", artist: "journey"},
//     { song: "Space oddity", artist: "david bowie"},
//     { song: "Still loving you", artist: "scorpions"},
//     { song: "The final countdown", artist: "europe"},
//     { song: "Big in japan", artist: "alphaville"},
//     { song: "Que sera sera", artist: "doris day"},
//     { song: "Enjoy the silence", artist: "depeche mode"},
//     { song: "Let it be", artist: "beatles"},
//     { song: "Hung up", artist: "madonna"},
//     { song: "Happy", artist: "pharrell williams"},
//     { song: "Hot stuff", artist: "donna summer"},
//     { song: "Wuthering heights", artist: "kate bush"},
//     { song: "Faith", artist: "george michael"},
//     { song: "Good vibrations", artist: "the beach boys"},
//     { song: "Beautiful", artist: "christina aguilera"},
//     { song: "Call me maybe", artist: "carly rae jepsen"},
//     { song: "Shake it off", artist: "taylor swift"},
// 	{ song: "November rain", artist: "guns n' roses"},
// 	{ song: "In the ghetto", artist: "elvis presley"},
// 	{ song: "Don't speak", artist: "no doubt"},
// 	{ song: "Cry me a river", artist: "justin timberlake"},
// 	{ song: "I believe I can fly", artist: "r.kelly"},
// 	{ song: "Stand by me", artist: "ben e. king"},
// 	{ song: "Bring me to life", artist: "evanescence"},
// 	{ song: "Disciple", artist: "slayer"},
// 	{ song: "Born to be wild", artist: "steppenwolf"},
// 	{ song: "Epic", artist: "faith no more"},
// 	{ song: "Last resort", artist: "papa roach"},
// 	{ song: "Black hole sun", artist: "soundgarden"},
// 	{ song: "Run to the hills", artist: "iron maiden"},
// 	{ song: "Sex on fire", artist: "kings of leon"},
// 	{ song: "Rebel yell", artist: "billy idol"},
// 	{ song: "The middle", artist: "jimmy eat world"},
// 	{ song: "Baba o'riley", artist: "the who"},
// 	{ song: "Like a stone", artist: "audioslave"},
// 	{ song: "Cemetary gates", artist: "pantera"},
// 	{ song: "So long, Marianne", artist: "leonard cohen"},
// 	{ song: "Duality", artist: "slipknot"},
// 	{ song: "It ain't me babe", artist: "bob dylan"},
// 	{ song: "White rabbit", artist: "jefferson airplane"},
// 	{ song: "The letter", artist: "the box tops"},
// 	{ song: "Pumped up kicks", artist: "foster the people"},
// 	{ song: "Grenade", artist: "bruno mars"},
// 	{ song: "My Boo", artist: "usher"},
// 	{ song: "Family affair", artist: "mary j. blige"},
// 	{ song: "Halo", artist: "beyonce"},
// 	{ song: "Stan", artist: "eminem"}

// ];
import songs from "../../static/songs/songs.json"

function getRandomNumber() {
	return Math.floor(Math.random() * songs.length);
}

export function getRandomAnswer() {
	// let randomNumber1 = getRandomNumber();
	// let randomNumber2 = getRandomNumber();
	// let randomNumber3 = getRandomNumber();
	// let randomNumber4 = getRandomNumber();
	// if((randomNumber1 === randomNumber2)||(randomNumber1 === randomNumber3)||(randomNumber1 === randomNumber4)){
	// 	console.log("this number already exist");
		
	// 	randomNumber1 = randomNumber1 - 1;
    //     if((randomNumber2 === randomNumber1)||(randomNumber2 === randomNumber3)||(randomNumber2 === randomNumber4)){
    //         console.log("this number already exist");
    //         randomNumber2 = randomNumber2 - 1;
    //     }
    //     if((randomNumber3 === randomNumber1)||(randomNumber3 === randomNumber2)||(randomNumber3 === randomNumber4)){
    //         console.log("this number already exist");
    //         randomNumber3 = randomNumber3 - 1;
    //     }
    //     if((randomNumber4 === randomNumber1)||(randomNumber4 === randomNumber2)||(randomNumber4 === randomNumber3)){
    //         console.log("this number already exist");
    //         randomNumber4 = randomNumber4 - 1;
    //     }
	// }
	
	let answer = [
		{ answer: songs[0] },
		{ answer: songs[1] },
		{ answer: songs[2] },
		{ answer: songs[3] }
	]	
 
   
	return answer;

}

