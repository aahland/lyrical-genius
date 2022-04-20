import { n as noop, a as safe_not_equal, c as create_ssr_component, b as createEventDispatcher, e as escape, d as each, f as add_attribute, g as get_store_value, v as validate_component, m as missing_component } from "../../chunks/index-446e01a5.js";
import ioClient from "socket.io-client";
var app = "";
const ENDPOINT = "http://localhost:3000";
const socket = ioClient(ENDPOINT);
const io = socket;
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
  { song: "Hey Ya!", artist: "outkast" },
  { song: "Since u been gone", artist: "kelly clarkson" },
  { song: "Stayin alive", artist: "bee gees" },
  { song: "Don't stop believin'", artist: "journey" },
  { song: "Space oddity", artist: "david bowie" },
  { song: "Still loving you", artist: "scorpions" },
  { song: "The final countdown", artist: "europe" },
  { song: "Big in japan", artist: "alphaville" },
  { song: "Que sera sera", artist: "doris day" },
  { song: "Enjoy the silence", artist: "depeche mode" },
  { song: "Let it be", artist: "beatles" },
  { song: "Hung up", artist: "madonna" },
  { song: "Happy", artist: "pharrell williams" },
  { song: "Hot stuff", artist: "donna summer" },
  { song: "Wuthering heights", artist: "kate bush" },
  { song: "Faith", artist: "george michael" },
  { song: "Good vibrations", artist: "the beach boys" },
  { song: "Beautiful", artist: "christina aguilera" },
  { song: "Call me maybe", artist: "carly rae jepsen" },
  { song: "Shake it off", artist: "taylor swift" },
  { song: "November rain", artist: "guns n' roses" },
  { song: "In the ghetto", artist: "elvis presley" },
  { song: "Don't speak", artist: "no doubt" },
  { song: "Cry me a river", artist: "justin timberlake" },
  { song: "I believe I can fly", artist: "r.kelly" },
  { song: "Stand by me", artist: "ben e. king" },
  { song: "Bring me to life", artist: "evanescence" },
  { song: "Disciple", artist: "slayer" },
  { song: "Born to be wild", artist: "steppenwolf" },
  { song: "Epic", artist: "faith no more" },
  { song: "Last resort", artist: "papa roach" },
  { song: "Black hole sun", artist: "soundgarden" },
  { song: "Run to the hills", artist: "iron maiden" },
  { song: "Sex on fire", artist: "kings of leon" },
  { song: "Rebel yell", artist: "billy idol" },
  { song: "The middle", artist: "jimmy eat world" },
  { song: "Baba o'riley", artist: "the who" },
  { song: "Like a stone", artist: "audioslave" },
  { song: "Cemetary gates", artist: "pantera" },
  { song: "So long, Marianne", artist: "leonard cohen" },
  { song: "Duality", artist: "slipknot" },
  { song: "It ain't me babe", artist: "bob dylan" },
  { song: "White rabbit", artist: "jefferson airplane" },
  { song: "The letter", artist: "the box tops" },
  { song: "Pumped up kicks", artist: "foster the people" },
  { song: "Grenade", artist: "bruno mars" },
  { song: "My Boo", artist: "usher" },
  { song: "Family affair", artist: "mary j. blige" },
  { song: "Halo", artist: "beyonce" },
  { song: "Stan", artist: "eminem" }
];
function getRandomNumber() {
  return Math.floor(Math.random() * answers.length);
}
function getRandomAnswer() {
  let randomNumber1 = getRandomNumber();
  let randomNumber2 = getRandomNumber();
  let randomNumber3 = getRandomNumber();
  let randomNumber4 = getRandomNumber();
  if (randomNumber1 === randomNumber2 || randomNumber1 === randomNumber3 || randomNumber1 === randomNumber4) {
    console.log("this number already exist");
    randomNumber1 = randomNumber1 - 1;
    if (randomNumber2 === randomNumber1 || randomNumber2 === randomNumber3 || randomNumber2 === randomNumber4) {
      console.log("this number already exist");
      randomNumber2 = randomNumber2 - 1;
    }
    if (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2 || randomNumber3 === randomNumber4) {
      console.log("this number already exist");
      randomNumber3 = randomNumber3 - 1;
    }
    if (randomNumber4 === randomNumber1 || randomNumber4 === randomNumber2 || randomNumber4 === randomNumber3) {
      console.log("this number already exist");
      randomNumber4 = randomNumber4 - 1;
    }
  }
  let answer = [
    { answer: answers[randomNumber1] },
    { answer: answers[randomNumber2] },
    { answer: answers[randomNumber3] },
    { answer: answers[randomNumber4] }
  ];
  return answer;
}
let distractors$1 = [
  "Hells Bells",
  "Soul man",
  "The saftey dance",
  "Don't stop me now",
  "Something",
  "Ain't no mountain high enough",
  "Push the button",
  "Mr. Blue Sky",
  "Disco Inferno",
  "Help",
  "Ain't no sunshine",
  "Honk tonk woman",
  "No diggity",
  "The winner takes it all",
  "Walk on the wild side",
  "Despacito",
  "Rolling in the deep",
  "One",
  "Heart of glass",
  "Rockstar",
  "Kiss",
  "Wannabee",
  "Bad",
  "Genie in a bottle",
  "Tik Tok",
  "Losing my religion",
  "Old town road",
  "Roar",
  "Heart of gold",
  "The real slim shady",
  "Jump",
  "Dancing Queen",
  "Poker face",
  "Toxic",
  "I'm yours",
  "Use somebody",
  "Take on me",
  "Heartbreak Hotel",
  "Beautiful day",
  "Umbrella",
  "Under pressure",
  "House of the rising sun",
  "Respect",
  "Hot in here",
  "YMCA",
  "Sweet Child O\u2019 Mine",
  "Personal Jesus",
  "Light my fire",
  "Viva la vida",
  "Stronger",
  "Gimme Shelter",
  "More than a feeling",
  "Can\u2019t feel my face",
  "Dancing in the dark",
  "Roxanne",
  "Thrift Shop",
  "Eye of the tiger",
  "Africa",
  "Work",
  "Mirrors",
  "Smoke on the water",
  "Tears in heaven",
  "Promiscuous",
  "Money for nothing",
  "Killing in the name",
  "Dream on",
  "War pigs",
  "Come as you are",
  "Whole lotta love",
  "September",
  "Uptown funk",
  "Time to pretend",
  "I will survive",
  "Just like heaven",
  "Young americans",
  "Lady marmalade",
  "Super freak",
  "Sabotage",
  "Last nite",
  "Into the mystic",
  "Runaway",
  "Surrender",
  "My sweet lord",
  "Pressure drop",
  "Beast of burden",
  "Piano man",
  "Fuck tha police",
  "Juicy",
  "Enter sandman",
  "Tiny dancer",
  "Bitter sweet symphony",
  "White room",
  "Self esteem"
];
function getRandomDistractor() {
  let randomNumber1 = Math.floor(Math.random() * distractors$1.length);
  let randomNumber2 = randomNumber1 - 1;
  if (randomNumber2 > distractors$1.length) {
    randomNumber2 = 0;
  }
  let randomNumbers = [randomNumber1, randomNumber2];
  return randomNumbers;
}
function getRandomDistractors() {
  let randomNumbers = getRandomDistractor();
  let r1 = randomNumbers[0];
  let r2 = randomNumbers[1];
  let randomNumbers2 = getRandomDistractor();
  let r3 = randomNumbers2[0];
  let r4 = randomNumbers2[1];
  let randomNumbers3 = getRandomDistractor();
  let r5 = randomNumbers3[0];
  let r6 = randomNumbers3[1];
  let randomNumbers4 = getRandomDistractor();
  let r7 = randomNumbers4[0];
  let r8 = randomNumbers4[1];
  let eightDistractors = [distractors$1[r1], distractors$1[r2], distractors$1[r3], distractors$1[r4], distractors$1[r5], distractors$1[r6], distractors$1[r7], distractors$1[r8]];
  return eightDistractors;
}
getRandomAnswer();
let distractors = getRandomDistractors();
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
let storedStats = writable([]);
let questions = writable([]);
function randomArrayShuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function splitLyrics(string) {
  let splitted = string.split(/(?=[A-Y])/);
  return splitted;
}
let round$3 = "Round 1";
const Round_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let objects = [];
  let data;
  let playersReadyToStart = [];
  let snippets = [];
  let song1 = "";
  let artist1 = "";
  let distractor1 = "";
  let distractor2 = "";
  let allAlternatives = [];
  let shuffled = [];
  let alts = [];
  io.on("data", (data2) => {
    objects = [...objects, data2];
    console.log(objects);
    questions.set(objects);
  });
  io.on("start", (start) => {
    playersReadyToStart = [...playersReadyToStart, start];
    let waiting = document.getElementById("waiting");
    waiting.innerHTML = "waiting for other players";
    let playersReady = document.getElementById("playersReady");
    if (playersReadyToStart.length === 1) {
      playersReady.innerHTML = "1/4";
    }
    if (playersReadyToStart.length === 2) {
      playersReady.innerHTML = "2/4";
    }
    if (playersReadyToStart.length === 3) {
      playersReady.innerHTML = "3/4";
    }
    if (playersReadyToStart.length === 4) {
      waiting.remove();
      playersReady.remove();
      displayLyrics();
    }
  });
  async function shareData() {
    let songs = getRandomAnswer();
    let number = 1;
    let song = songs[number];
    songs.splice(number, 1);
    let distractor12 = distractors[0];
    let distractor22 = distractors[1];
    data = { song, distractor1: distractor12, distractor2: distractor22 };
    io.emit("data", data);
  }
  async function fetchLyrics() {
    song1 = objects[0].data.song.answer.song;
    artist1 = objects[0].data.song.answer.artist;
    distractor1 = objects[0].data.distractor1;
    distractor2 = objects[0].data.distractor2;
    alts = [
      { song: song1, id: "button1" },
      { song: distractor1, id: "button2" },
      { song: distractor2, id: "button3" }
    ];
    allAlternatives = [...allAlternatives, alts];
    shuffled = randomArrayShuffle(alts);
    console.log(shuffled);
    let stylisticLine = document.getElementById("stylisticLine");
    let header = document.createElement("h1");
    header.className = "header";
    header.innerHTML = "Which song is this?";
    header.style.marginBottom = "0";
    header.style.marginTop = "0";
    stylisticLine.appendChild(header);
    stylisticLine.style.borderBottom = "1px solid white";
    let lyricsWrapper = document.getElementById("lyricsWrapper1");
    lyricsWrapper.style.color = "white";
    let url = "https://api.lyrics.ovh/v1/" + artist1 + "/" + song1;
    let lyrics = await fetch(url);
    if (!lyrics.ok) {
      let failedToFetch = document.getElementById("lyricsWrapper1");
      let sorryMessage = document.createElement("p");
      sorryMessage.innerHTML = "Sorry, we couldn't get the lyrics for you. Have a blind guess and earn 2 points if you are correct!";
      sorryMessage.style.backgroundColor = "red";
      sorryMessage.style.padding = "5px 10px 5px 10px";
      sorryMessage.style.borderRadius = "10px";
      sorryMessage.style.width = "280px";
      sorryMessage.style.fontWeight = "bold";
      failedToFetch.appendChild(sorryMessage);
    }
    let lyricsResponse = await lyrics.json();
    let textSplitted = splitLyrics(lyricsResponse.lyrics);
    snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    if (textSplitted[0].includes("Paroles")) {
      lyricsWrapper.style.visibility = "hidden";
      let lyrics2 = await fetch(url);
      let lyricsResponse2 = await lyrics2.json();
      let textSplitted2 = splitLyrics(lyricsResponse2.lyrics);
      snippets = [textSplitted2[0], textSplitted2[1], textSplitted2[2], textSplitted2[3]];
      if (textSplitted2[0].includes("Paroles")) {
        lyricsWrapper.style.visibility = "hidden";
        let lyrics3 = await fetch(url);
        let lyricsResponse3 = await lyrics3.json();
        let textSplitted3 = splitLyrics(lyricsResponse3.lyrics);
        snippets = [textSplitted3[0], textSplitted3[1], textSplitted3[2], textSplitted3[3]];
      }
    }
    if (textSplitted[0].length + textSplitted[1].length > 70) {
      console.log("snippet to long remove half");
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2]];
    }
    if (textSplitted[0].length < 40 && textSplitted[1].length < 10) {
      textSplitted[1] = textSplitted[0] + textSplitted[1];
      textSplitted.splice(0, 1);
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    }
    lyricsWrapper.style.visibility = "visible";
    return snippets;
  }
  async function displayLyrics() {
    await fetchLyrics();
  }
  shareData();
  return `<div id="${"mainWrapper"}" class="${"mainWrapper"}"><div class="${"componentWrapper"}" id="${"componentWrapper"}"><p class="${"round"}">${escape(round$3)}</p>
	<div id="${"stylisticLine"}"></div> 
		<button id="${"btn"}" class="${"button"}">start round</button>
		<div class="${"waitingForPlayers"}"><p id="${"waiting"}"></p>
			<p id="${"playersReady"}"></p></div>
		<div class="${"lyricsWrapper1"}" id="${"lyricsWrapper1"}">${each(snippets, (snippet) => {
    return `<div class="${"displayLyrics"}"><p class="${"snippet"}">${escape(snippet)}</p>
				</div>`;
  })}</div>
		<div class="${"alternatives"}" id="${"alternatives"}">${each(alts, (alt) => {
    return `<div class="${"altBtns"}"><button class="${"altBtn"}"${add_attribute("id", alt.id, 0)}>${escape(alt.song)}</button>
				</div>`;
  })}</div></div>
</div>`;
});
let round$2 = "Round 2";
const Round_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let objects = get_store_value(questions);
  let snippets = [];
  let song1 = "";
  let artist1 = "";
  let distractor1 = "";
  let distractor2 = "";
  let allAlternatives = [];
  let alts = [];
  let playersReadyToStart = [];
  io.on("start", (start) => {
    playersReadyToStart = [...playersReadyToStart, start];
    let waiting = document.getElementById("waiting");
    waiting.innerHTML = "waiting for other players";
    let playersReady = document.getElementById("playersReady");
    if (playersReadyToStart.length === 1) {
      playersReady.innerHTML = "1/4";
    }
    if (playersReadyToStart.length === 2) {
      playersReady.innerHTML = "2/4";
    }
    if (playersReadyToStart.length === 3) {
      playersReady.innerHTML = "3/4";
    }
    if (playersReadyToStart.length === 4) {
      waiting.remove();
      playersReady.remove();
      displayLyrics();
    }
  });
  async function fetchLyrics() {
    song1 = objects[1].data.song.answer.song;
    artist1 = objects[1].data.song.answer.artist;
    distractor1 = objects[1].data.distractor1;
    distractor2 = objects[1].data.distractor2;
    alts = [
      { song: song1, id: "button1" },
      { song: distractor1, id: "button2" },
      { song: distractor2, id: "button3" }
    ];
    allAlternatives = [...allAlternatives, alts];
    randomArrayShuffle(alts);
    let btn = document.getElementById("btn");
    btn.remove();
    let stylisticLine = document.getElementById("stylisticLine");
    let header = document.createElement("h1");
    header.className = "header";
    header.innerHTML = "Which song is this?";
    header.style.marginBottom = "0";
    header.style.marginTop = "0";
    stylisticLine.appendChild(header);
    stylisticLine.style.borderBottom = "1px solid white";
    let lyricsWrapper = document.getElementById("lyricsWrapper");
    lyricsWrapper.style.color = "white";
    let url = "https://api.lyrics.ovh/v1/" + artist1 + "/" + song1;
    let lyrics = await fetch(url);
    if (!lyrics.ok) {
      let failedToFetch = document.getElementById("lyricsWrapper");
      let sorryMessage = document.createElement("p");
      sorryMessage.innerHTML = "Sorry, we couldn't get the lyrics for you. Have a blind guess and earn 2 points if you are correct";
      sorryMessage.style.backgroundColor = "red";
      sorryMessage.style.padding = "5px 10px 5px 10px";
      sorryMessage.style.borderRadius = "10px";
      sorryMessage.style.width = "280px";
      sorryMessage.style.fontWeight = "bold";
      failedToFetch.appendChild(sorryMessage);
    }
    let lyricsResponse = await lyrics.json();
    let textSplitted = splitLyrics(lyricsResponse.lyrics);
    snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    if (textSplitted[0].includes("Paroles")) {
      lyricsWrapper.style.visibility = "hidden";
      let lyrics2 = await fetch(url);
      let lyricsResponse2 = await lyrics2.json();
      let textSplitted2 = splitLyrics(lyricsResponse2.lyrics);
      snippets = [textSplitted2[0], textSplitted2[1], textSplitted2[2], textSplitted2[3]];
      if (textSplitted2[0].includes("Paroles")) {
        lyricsWrapper.style.visibility = "hidden";
        let lyrics3 = await fetch(url);
        let lyricsResponse3 = await lyrics3.json();
        let textSplitted3 = splitLyrics(lyricsResponse3.lyrics);
        snippets = [textSplitted3[0], textSplitted3[1], textSplitted3[2], textSplitted3[3]];
      }
    }
    if (textSplitted[0].length + textSplitted[1].length > 70) {
      console.log("snippet to long remove half");
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2]];
    }
    if (textSplitted[0].length < 40 && textSplitted[1].length < 10) {
      textSplitted[1] = textSplitted[0] + textSplitted[1];
      textSplitted.splice(0, 1);
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    }
    lyricsWrapper.style.visibility = "visible";
    return snippets;
  }
  async function displayLyrics() {
    await fetchLyrics();
  }
  return `<div id="${"mainWrapper"}" class="${"mainWrapper"}"><div class="${"componentWrapper"}" id="${"componentWrapper"}"><p class="${"round"}">${escape(round$2)}</p>
        <div id="${"stylisticLine"}"></div>  
        <button id="${"btn"}" class="${"button"}">start round</button>
        <div class="${"waitingForPlayers"}"><p id="${"waiting"}"></p>
            <p id="${"playersReady"}"></p></div>
        <div class="${"lyricsWrapper"}" id="${"lyricsWrapper"}">${each(snippets, (snippet) => {
    return `<div class="${"displayLyrics"}"><p class="${"snippet"}">${escape(snippet)}</p>
            </div>`;
  })}</div>
        <div class="${"alternatives"}" id="${"alternatives"}">${each(alts, (alt) => {
    return `<div class="${"altBtns"}"><button class="${"altBtn"}"${add_attribute("id", alt.id, 0)}>${escape(alt.song)}</button>
        </div>`;
  })}</div></div>
</div>`;
});
let round$1 = "Round 3";
const Round_3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let objects = get_store_value(questions);
  let snippets = [];
  let song1 = "";
  let artist1 = "";
  let distractor1 = "";
  let distractor2 = "";
  let allAlternatives = [];
  let alts = [];
  let playersReadyToStart = [];
  io.on("start", (start) => {
    playersReadyToStart = [...playersReadyToStart, start];
    let waiting = document.getElementById("waiting");
    waiting.innerHTML = "waiting for other players";
    let playersReady = document.getElementById("playersReady");
    if (playersReadyToStart.length === 1) {
      playersReady.innerHTML = "1/4";
    }
    if (playersReadyToStart.length === 2) {
      playersReady.innerHTML = "2/4";
    }
    if (playersReadyToStart.length === 3) {
      playersReady.innerHTML = "3/4";
    }
    if (playersReadyToStart.length === 4) {
      waiting.remove();
      playersReady.remove();
      displayLyrics();
    }
  });
  async function fetchLyrics() {
    song1 = objects[2].data.song.answer.song;
    artist1 = objects[2].data.song.answer.artist;
    distractor1 = objects[2].data.distractor1;
    distractor2 = objects[2].data.distractor2;
    alts = [
      { song: song1, id: "button1" },
      { song: distractor1, id: "button2" },
      { song: distractor2, id: "button3" }
    ];
    allAlternatives = [...allAlternatives, alts];
    randomArrayShuffle(alts);
    let btn = document.getElementById("btn");
    btn.remove();
    let stylisticLine = document.getElementById("stylisticLine");
    let header = document.createElement("h1");
    header.className = "header";
    header.innerHTML = "Which song is this?";
    header.style.marginBottom = "0";
    header.style.marginTop = "0";
    stylisticLine.appendChild(header);
    stylisticLine.style.borderBottom = "1px solid white";
    let lyricsWrapper = document.getElementById("lyricsWrapper");
    lyricsWrapper.style.color = "white";
    let url = "https://api.lyrics.ovh/v1/" + artist1 + "/" + song1;
    let lyrics = await fetch(url);
    if (!lyrics.ok) {
      let failedToFetch = document.getElementById("lyricsWrapper");
      let sorryMessage = document.createElement("p");
      sorryMessage.innerHTML = "Sorry, we couldn't get the lyrics for you. Have a blind guess and earn 2 points if you are correct";
      sorryMessage.style.backgroundColor = "red";
      sorryMessage.style.padding = "5px 10px 5px 10px";
      sorryMessage.style.borderRadius = "10px";
      sorryMessage.style.width = "280px";
      sorryMessage.style.fontWeight = "bold";
      failedToFetch.appendChild(sorryMessage);
    }
    let lyricsResponse = await lyrics.json();
    let textSplitted = splitLyrics(lyricsResponse.lyrics);
    snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    if (textSplitted[0].includes("Paroles")) {
      lyricsWrapper.style.visibility = "hidden";
      let lyrics2 = await fetch(url);
      let lyricsResponse2 = await lyrics2.json();
      let textSplitted2 = splitLyrics(lyricsResponse2.lyrics);
      snippets = [textSplitted2[0], textSplitted2[1], textSplitted2[2], textSplitted2[3]];
      if (textSplitted2[0].includes("Paroles")) {
        lyricsWrapper.style.visibility = "hidden";
        let lyrics3 = await fetch(url);
        let lyricsResponse3 = await lyrics3.json();
        let textSplitted3 = splitLyrics(lyricsResponse3.lyrics);
        snippets = [textSplitted3[0], textSplitted3[1], textSplitted3[2], textSplitted3[3]];
      }
    }
    if (textSplitted[0].length + textSplitted[1].length > 70) {
      console.log("snippet to long remove half");
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2]];
    }
    if (textSplitted[0].length < 40 && textSplitted[1].length < 10) {
      textSplitted[1] = textSplitted[0] + textSplitted[1];
      textSplitted.splice(0, 1);
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    }
    lyricsWrapper.style.visibility = "visible";
    return snippets;
  }
  async function displayLyrics() {
    await fetchLyrics();
  }
  return `<div id="${"mainWrapper"}" class="${"mainWrapper"}"><div class="${"componentWrapper"}" id="${"componentWrapper"}"><p class="${"round"}">${escape(round$1)}</p>
        <div id="${"stylisticLine"}"></div>
        <button id="${"btn"}" class="${"button"}">start round</button>
        <div class="${"waitingForPlayers"}"><p id="${"waiting"}"></p>
            <p id="${"playersReady"}"></p></div>
        <div class="${"lyricsWrapper"}" id="${"lyricsWrapper"}">${each(snippets, (snippet) => {
    return `<div class="${"displayLyrics"}"><p class="${"snippet"}">${escape(snippet)}</p>
            </div>`;
  })}</div>
        <div class="${"alternatives"}" id="${"alternatives"}">${each(alts, (alt) => {
    return `<div class="${"altBtns"}"><button class="${"altBtn"}"${add_attribute("id", alt.id, 0)}>${escape(alt.song)}</button>
        </div>`;
  })}</div></div>
</div>`;
});
let round = "Round 4";
const Round_4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let objects = get_store_value(questions);
  let allStats = [{}];
  let snippets = [];
  let song1 = "";
  let artist1 = "";
  let distractor1 = "";
  let distractor2 = "";
  let allAlternatives = [];
  let alts = [];
  let playersReadytoStart = [];
  io.on("finalScores", ({ finalScores }) => {
    allStats = [...allStats, { finalScores }];
    storedStats.set(allStats);
  });
  io.on("start", (start) => {
    playersReadytoStart = [...playersReadytoStart, start];
    let waiting = document.getElementById("waiting");
    waiting.innerHTML = "waiting for other players";
    let playersReady = document.getElementById("playersReady");
    if (playersReadytoStart.length === 1) {
      playersReady.innerHTML = "1/4";
    }
    if (playersReadytoStart.length === 2) {
      playersReady.innerHTML = "2/4";
    }
    if (playersReadytoStart.length === 3) {
      playersReady.innerHTML = "3/4";
    }
    if (playersReadytoStart.length === 4) {
      waiting.remove();
      playersReady.remove();
      displayLyrics();
    }
  });
  async function fetchLyrics() {
    song1 = objects[3].data.song.answer.song;
    artist1 = objects[3].data.song.answer.artist;
    distractor1 = objects[3].data.distractor1;
    distractor2 = objects[3].data.distractor2;
    alts = [
      { song: song1, id: "button1" },
      { song: distractor1, id: "button2" },
      { song: distractor2, id: "button3" }
    ];
    allAlternatives = [...allAlternatives, alts];
    randomArrayShuffle(alts);
    let btn = document.getElementById("btn");
    btn.remove();
    let stylisticLine = document.getElementById("stylisticLine");
    let header = document.createElement("h1");
    header.className = "header";
    header.innerHTML = "Which song is this?";
    header.style.marginBottom = "0";
    header.style.marginTop = "0";
    stylisticLine.appendChild(header);
    stylisticLine.style.borderBottom = "1px solid white";
    let lyricsWrapper = document.getElementById("lyricsWrapper");
    lyricsWrapper.style.color = "white";
    let url = "https://api.lyrics.ovh/v1/" + artist1 + "/" + song1;
    let lyrics = await fetch(url);
    if (!lyrics.ok) {
      let failedToFetch = document.getElementById("lyricsWrapper");
      let sorryMessage = document.createElement("p");
      sorryMessage.innerHTML = "Sorry, we couldn't get the lyrics for you. Have a blind guess and earn 2 points if you are correct";
      sorryMessage.style.backgroundColor = "red";
      sorryMessage.style.padding = "5px 10px 5px 10px";
      sorryMessage.style.borderRadius = "10px";
      sorryMessage.style.width = "280px";
      sorryMessage.style.fontWeight = "bold";
      failedToFetch.appendChild(sorryMessage);
    }
    let lyricsResponse = await lyrics.json();
    let textSplitted = splitLyrics(lyricsResponse.lyrics);
    snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    if (textSplitted[0].includes("Paroles")) {
      lyricsWrapper.style.visibility = "hidden";
      let lyrics2 = await fetch(url);
      let lyricsResponse2 = await lyrics2.json();
      let textSplitted2 = splitLyrics(lyricsResponse2.lyrics);
      snippets = [textSplitted2[0], textSplitted2[1], textSplitted2[2], textSplitted2[3]];
      if (textSplitted2[0].includes("Paroles")) {
        lyricsWrapper.style.visibility = "hidden";
        let lyrics3 = await fetch(url);
        let lyricsResponse3 = await lyrics3.json();
        let textSplitted3 = splitLyrics(lyricsResponse3.lyrics);
        snippets = [textSplitted3[0], textSplitted3[1], textSplitted3[2], textSplitted3[3]];
      }
    }
    if (textSplitted[0].length + textSplitted[1].length > 70) {
      console.log("snippet to long remove half");
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2]];
    }
    if (textSplitted[0].length < 40 && textSplitted[1].length < 10) {
      textSplitted[1] = textSplitted[0] + textSplitted[1];
      textSplitted.splice(0, 1);
      snippets = [textSplitted[0], textSplitted[1], textSplitted[2], textSplitted[3]];
    }
    lyricsWrapper.style.visibility = "visible";
    return snippets;
  }
  async function displayLyrics() {
    await fetchLyrics();
  }
  return `<div id="${"mainWrapper"}" class="${"mainWrapper"}"><div class="${"componentWrapper"}" id="${"componentWrapper"}"><p class="${"round"}">${escape(round)}</p>
        <div id="${"stylisticLine"}"></div>
        <button id="${"btn"}" class="${"button"}">start round</button>
        <div class="${"waitingForPlayers"}"><p id="${"waiting"}"></p>
            <p id="${"playersReady"}"></p></div>
        <div class="${"lyricsWrapper"}" id="${"lyricsWrapper"}">${each(snippets, (snippet) => {
    return `<div class="${"displayLyrics"}"><p class="${"snippet"}">${escape(snippet)}</p>
            </div>`;
  })}</div>
        <div class="${"alternatives"}" id="${"alternatives"}">${each(alts, (alt) => {
    return `<div class="${"altBtns"}"><button class="${"altBtn"}"${add_attribute("id", alt.id, 0)}>${escape(alt.song)}</button>
        </div>`;
  })}</div></div>
</div>`;
});
function removeFirstObject(array) {
  array.splice(0, 1);
}
var gameFinished_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".scoreWrapper.svelte-1dfamud{background-color:black;text-align:center;display:flex;flex-direction:column;justify-content:flex-start;margin-bottom:0;align-items:center}.position.svelte-1dfamud{height:30px;width:30px;border-radius:50%;border:solid #198dc1 3px;position:relative;top:4px;left:15px;background-color:black}.positionNumber.svelte-1dfamud{color:white;font-size:25px;position:relative;bottom:28px}.positionWrapper.svelte-1dfamud{display:flex;flex-direction:row;width:fit-content;padding:0px 35px 0px 10px}.scores.svelte-1dfamud{color:white}.score.svelte-1dfamud{color:white;border:solid #198dc1 3px;border-radius:10px;width:100px;padding:5px 10px 5px 20px;margin-top:5px}#waiting.svelte-1dfamud{color:white;font-weight:bold}#playersReady.svelte-1dfamud{color:white;font-weight:bold}h1.svelte-1dfamud{color:#ffffffd4;margin-bottom:0px;width:300px}.stylisticLine.svelte-1dfamud{border-bottom:1px solid white;;;margin-bottom:15px}@media screen and (min-width: 768px){h1.svelte-1dfamud{width:700px}}@media screen and (min-width: 1024px){h1.svelte-1dfamud{width:900px}}@media screen and (min-width: 1440px){h1.svelte-1dfamud{width:1300px}}",
  map: null
};
const Game_finished = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const dispatch = createEventDispatcher();
  let playersScoreReady = [];
  let sortedResults = [];
  let sortedFinal;
  function sortResults() {
    sortedResults = sortedFinal.sort((a, b) => {
      return b.finalScores[0].score - a.finalScores[0].score;
    });
  }
  io.on("playersScoreReady", (ready) => {
    playersScoreReady = [...playersScoreReady, ready];
    let waiting = document.getElementById("waiting");
    waiting.innerHTML = "waiting for other players score";
    let numberOfPlayersReady = document.getElementById("playersReady");
    if (playersScoreReady.length === 1) {
      numberOfPlayersReady.innerHTML = "1/4";
    }
    if (playersScoreReady.length === 2) {
      numberOfPlayersReady.innerHTML = "2/4";
    }
    if (playersScoreReady.length === 3) {
      numberOfPlayersReady.innerHTML = "3/4";
    }
    if (playersScoreReady.length === 4) {
      let statsFromStore = get_store_value(storedStats);
      removeFirstObject(statsFromStore);
      let scoreOne = parseInt(statsFromStore[0].finalScores[0].score);
      statsFromStore[0].finalScores[0].score = scoreOne;
      let scoreTwo = parseInt(statsFromStore[1].finalScores[0].score);
      statsFromStore[1].finalScores[0].score = scoreTwo;
      let scoreThree = parseInt(statsFromStore[2].finalScores[0].score);
      statsFromStore[2].finalScores[0].score = scoreThree;
      let scoreFour = parseInt(statsFromStore[3].finalScores[0].score);
      statsFromStore[3].finalScores[0].score = scoreFour;
      let finalScores = statsFromStore;
      sortedFinal = finalScores;
      sortResults();
      sortedResults[0].finalScores.push("1");
      sortedResults[1].finalScores.push("2");
      sortedResults[2].finalScores.push("3");
      sortedResults[3].finalScores.push("4");
      console.log(sortedResults[0]);
      numberOfPlayersReady.remove();
      waiting.remove();
      let buttonWrapper = document.getElementById("buttonWrapper");
      let restartBtn = document.createElement("button");
      restartBtn.innerHTML = "Play Again";
      buttonWrapper.appendChild(restartBtn);
      restartBtn.onclick = restartGame;
      let sendScoresBtn = document.getElementById("sendScoresBtn");
      sendScoresBtn.remove();
    }
  });
  function restartGame() {
    dispatch("restartGame");
  }
  if ($$props.sortResults === void 0 && $$bindings.sortResults && sortResults !== void 0)
    $$bindings.sortResults(sortResults);
  $$result.css.add(css$3);
  return `<div class="${"scoreWrapper svelte-1dfamud"}"><div class="${"stylisticLine svelte-1dfamud"}"><h1 class="${"svelte-1dfamud"}">Score</h1></div>
	<div><p id="${"waiting"}" class="${"svelte-1dfamud"}"></p>
		<p id="${"playersReady"}" class="${"svelte-1dfamud"}"></p></div>
	<div class="${"scores svelte-1dfamud"}" id="${"scores"}"></div>
	${each(sortedResults, (sortedResult) => {
    return `<div class="${"positionWrapper svelte-1dfamud"}"><div class="${"position svelte-1dfamud"}"><p class="${"positionNumber svelte-1dfamud"}">${escape(sortedResult.finalScores[1])}</p></div>
			<p class="${"score svelte-1dfamud"}">${escape(sortedResult.finalScores[0].name + ": " + sortedResult.finalScores[0].score)}</p>
		</div>`;
  })}
	<div id="${"buttonWrapper"}"><button id="${"sendScoresBtn"}">Submit in your score</button></div>
</div>`;
});
var footr_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".footer.svelte-x1spce{background-color:#198dc1;width:100vw;height:200px;position:sticky;bottom:0px}.triangleContainer.svelte-x1spce{display:flex;flex-direction:row}.triangle.svelte-x1spce{width:0;height:0;border-left:19px solid transparent;border-right:19px solid transparent;border-top:20px solid black}@media screen and (min-width: 768px){.footer.svelte-x1spce{height:250px}}",
  map: null
};
const Footr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="${"footer svelte-x1spce"}"><div class="${"triangleContainer svelte-x1spce"}"><div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div>
        <div class="${"triangle svelte-x1spce"}"></div></div>
</div>`;
});
var signin_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".wrap.svelte-1uxzl7x{display:flex;flex-direction:column;margin-top:70px;justify-content:space-around;max-height:400px;justify-content:center;align-items:center}#logo.svelte-1uxzl7x{width:300px;position:relative;left:5px;margin-bottom:20px;margin-top:20px}.messages.svelte-1uxzl7x,p.svelte-1uxzl7x{margin-bottom:5px}.instructions.svelte-1uxzl7x{color:rgba(255, 255, 255, 0.8);text-align:center;max-width:250px;padding:0px 5px 5px 5px;border:1px solid rgba(255, 255, 255, 0.8);border-radius:10px;margin-top:20px;position:relative;bottom:40px}.instructions.svelte-1uxzl7x,h2.svelte-1uxzl7x{margin-top:5px;margin-bottom:0px}.instructions.svelte-1uxzl7x,p.svelte-1uxzl7x{margin-top:5px}.signinAndUsernamesWrapper.svelte-1uxzl7x{display:flex;flex-direction:column;justify-content:flex-start;height:100px;margin-bottom:10px}.playernames.svelte-1uxzl7x{color:white;text-align:center;margin-top:50px;height:0px;visibility:hidden}.signInContainer.svelte-1uxzl7x{display:flex;flex-direction:column;max-width:300px;align-items:center}.messages.svelte-1uxzl7x{color:white}.wait.svelte-1uxzl7x{font-weight:bold}@media screen and (min-width: 1440px){.wrap.svelte-1uxzl7x{height:400px}#logo.svelte-1uxzl7x{width:350px;margin-top:60px}}",
  map: null
};
const Signin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let textfield = "";
  let messages = [];
  $$result.css.add(css$1);
  return `<div class="${"wrap svelte-1uxzl7x"}" id="${"wrap"}"><div><img id="${"logo"}" src="${"/images/logoMobile.png"}" alt="${"logotype"}" class="${"svelte-1uxzl7x"}"></div>
	<div class="${"signinAndUsernamesWrapper svelte-1uxzl7x"}" id="${"signinAndUsernamesWrapper"}"><form action="${"#"}"><div class="${"signInContainer svelte-1uxzl7x"}" id="${"signInContainer"}"><input id="${"input"}" type="${"text"}" placeholder="${"Enter your name..."}"${add_attribute("value", textfield, 0)}>
				<button id="${"btn"}" type="${"submit"}">Join</button></div></form></div>
	<div class="${"playernames svelte-1uxzl7x"}" id="${"playernames"}"><div><header><span class="${"wait svelte-1uxzl7x"}">Waiting for players..</span></header>
			<div>${each(messages, (message) => {
    return `<div class="${"messages svelte-1uxzl7x"}"><span><p class="${"svelte-1uxzl7x"}">${escape(message.message)}</p></span>
					</div>`;
  })}</div></div></div>

	<div class="${"instructions svelte-1uxzl7x"}" id="${"instructions"}"><div><h2 class="${"svelte-1uxzl7x"}">Game Instructions</h2>
			<p class="${"svelte-1uxzl7x"}">Each round the players are presented with a snippet of a songlyric and three answer
				alternatives. A correct answer gives the player 1 point. The player with the highest score
				after 4 rounds wins. Fair play!
			</p></div></div>
</div>`;
});
var __layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".layoutWrapper.svelte-qamq8v{display:flex;flex-direction:column;justify-content:space-between;height:800px}",
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const round2 = [
    { component: Signin },
    { component: Round_1 },
    { component: Round_2 },
    { component: Round_3 },
    { component: Round_4 },
    { component: Game_finished }
  ];
  let i = 0;
  $$result.css.add(css);
  return `<div class="${"layoutWrapper svelte-qamq8v"}"><main>${validate_component(round2[i].component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</main>
	${validate_component(Footr, "Footer").$$render($$result, {}, {}, {})}
</div>`;
});
export { _layout as default };
