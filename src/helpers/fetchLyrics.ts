import { getRandomAnswer } from "./answers"
import { getRandomDistractors } from "./distractors"

export let answer = getRandomAnswer();
let distractors = getRandomDistractors();

const url1 = "https://api.lyrics.ovh/v1/" + answer[0].answer1.artist + "/" + answer[0].answer1.song;
const url2 = "https://api.lyrics.ovh/v1/" + answer[1].answer2.artist + "/" + answer[1].answer2.song;
const url3 = "https://api.lyrics.ovh/v1/" + answer[2].answer3.artist + "/" + answer[2].answer3.song;
const url4 = "https://api.lyrics.ovh/v1/" + answer[3].answer4.artist + "/" + answer[3].answer4.song;


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



    let lyricResponse1: any = await lyrics1.json()
    if (lyricResponse1.lyrics.includes("Paroles de la chanson")){
        lyrics1 = await fetch(url1)
        lyricResponse1 = await lyrics1.json();
    }
    let lyricResponse2: any = await lyrics2.json()
    if (lyricResponse2.lyrics.includes("Paroles de la chanson")){
        lyrics2 = await fetch(url2)
        lyricResponse2 = await lyrics3.json();
    }
    let lyricResponse3: any = await lyrics3.json()
    if (lyricResponse3.lyrics.includes("Paroles de la chanson")){
        lyrics3 = await fetch(url3)
        lyricResponse3 = await lyrics3.json();
    }
    let lyricResponse4: any = await lyrics4.json()
    if (lyricResponse4.lyrics.includes("Paroles de la chanson")){
        lyrics4 = await fetch(url4)
        lyricResponse4 = await lyrics4.json();
    }


    let answers = [
        { firstObject: lyricResponse1.lyrics, song: answer[0].answer1.song, distractor1: distractors[0], distractor2: distractors[1] },
        { secondObject: lyricResponse2.lyrics, song: answer[1].answer2.song, distractor1: distractors[2], distractor2: distractors[3] },
        { thirdObject: lyricResponse3.lyrics, song: answer[2].answer3.song, distractor1: distractors[4], distractor2: distractors[5] },
        { fourthObject: lyricResponse4.lyrics, song: answer[3].answer4.song, distractor1: distractors[6], distractor2: distractors[7] }
    ]
    return answers
}

