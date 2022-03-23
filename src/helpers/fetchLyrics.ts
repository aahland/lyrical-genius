import { getRandomAnswer } from "./answers"
import { getRandomDistractors } from "./distractors"

export let answer = getRandomAnswer();
let distractors = getRandomDistractors();

const url1 = "https://api.lyrics.ovh/v1/" + answer[0].answer1.artist + "/" + answer[0].answer1.song;
const url2 = "https://api.lyrics.ovh/v1/" + answer[1].answer2.artist + "/" + answer[1].answer2.song;
const url3 = "https://api.lyrics.ovh/v1/" + answer[2].answer3.artist + "/" + answer[2].answer3.song;

export async function getLyrics() {
  
    const lyrics1 = await fetch(url1)
    const lyrics2 = await fetch(url2)
    const lyrics3 = await fetch(url3)
  
    if (!lyrics1.ok) {
      throw new Error(`HTTP error! Status: ${lyrics1.status}`)
        
    }
    if (!lyrics2.ok) {
      throw new Error(`HTTP error! Status: ${lyrics2.status}`)
    }
    if (!lyrics3.ok) {
        throw new Error(`HTTP error! Status: ${lyrics3.status}`)
      }
  
    const lyricResponse1: any = await lyrics1.json()
    const lyricResponse2: any = await lyrics2.json()
    const lyricResponse3: any = await lyrics3.json()

    let answers = [
        {firstObject: lyricResponse1.lyrics, song: answer[0].answer1.song, distractor1: distractors[0], distractor2: distractors[1]},
        {secondObject: lyricResponse2.lyrics, song: answer[1].answer2.song, distractor1: distractors[2], distractor2: distractors[3]},
        {thirdObject: lyricResponse3.lyrics, song: answer[2].answer3.song, distractor1: distractors[4], distractor2: distractors[5]}
    ]
    return answers
  }

