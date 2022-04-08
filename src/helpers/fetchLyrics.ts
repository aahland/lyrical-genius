import { getRandomAnswer } from "./answers"
import { getRandomDistractors } from "./distractors"

export let answer = getRandomAnswer();
export let distractors = getRandomDistractors();

const url1 = "https://api.lyrics.ovh/v1/" + answer[0].answer.artist + "/" + answer[0].answer.song;
const url2 = "https://api.lyrics.ovh/v1/" + answer[1].answer.artist + "/" + answer[1].answer.song;
const url3 = "https://api.lyrics.ovh/v1/" + answer[2].answer.artist + "/" + answer[2].answer.song;
const url4 = "https://api.lyrics.ovh/v1/" + answer[3].answer.artist + "/" + answer[3].answer.song;


export async function getLyrics() {

    let lyrics1 = await fetch(url1)
    let lyrics2 = await fetch(url2)
    let lyrics3 = await fetch(url3)
    let lyrics4 = await fetch(url4)
   
    


    if (!lyrics1.ok) {
        throw new Error(`HTTP error! Status: ${lyrics1.status}`)

    }
    if (!lyrics2.ok) {
        throw new Error(`HTTP error! Status: ${lyrics2.status}`)
    }
    if (!lyrics3.ok) {
        throw new Error(`HTTP error! Status: ${lyrics3.status}`)
    }
    if (!lyrics4.ok) {
        throw new Error(`HTTP error! Status: ${lyrics3.status}`)
    }

// This doesn't work Needs to be fixed

    let lyricResponse1 = await lyrics1.json();
    if (lyricResponse1.lyrics.includes("Paroles de la chanson")){
        lyrics1 = await fetch("https://api.lyrics.ovh/v1/" + answer[0].answer.artist + "/" + answer[0].answer.song)
        lyricResponse1 = await lyrics1.json();
    }
    let lyricResponse2 = await lyrics2.json()
    if (lyricResponse2.lyrics.includes("Paroles de la chanson")){
        lyrics2 = await fetch("https://api.lyrics.ovh/v1/" + answer[1].answer.artist + "/" + answer[1].answer.song)
        lyricResponse2 = await lyrics3.json();
    }
    let lyricResponse3 = await lyrics3.json()
    if (lyricResponse3.lyrics.includes("Paroles de la chanson")){
        lyrics3 = await fetch("https://api.lyrics.ovh/v1/" + answer[2].answer.artist + "/" + answer[2].answer.song)
        lyricResponse3 = await lyrics3.json();
    }
    let lyricResponse4 = await lyrics4.json()
    if (lyricResponse4.lyrics.includes("Paroles de la chanson")){
        lyrics4 = await fetch("https://api.lyrics.ovh/v1/" + answer[3].answer.artist + "/" + answer[3].answer.song)
        lyricResponse4 = await lyrics4.json();
    }


    let answers = [
        { firstObject: lyricResponse1.lyrics, song: answer[0].answer.song, distractor1: distractors[0], distractor2: distractors[1] },
        { secondObject: lyricResponse2.lyrics, song: answer[1].answer.song, distractor1: distractors[2], distractor2: distractors[3] },
        { thirdObject: lyricResponse3.lyrics, song: answer[2].answer.song, distractor1: distractors[4], distractor2: distractors[5] },
        { fourthObject: lyricResponse4.lyrics, song: answer[3].answer.song, distractor1: distractors[6], distractor2: distractors[7] }
    ]
    return answers
}

