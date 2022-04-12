import { getRandomAnswer } from "./answers"
import { getRandomDistractors } from "./distractors"

export let answer = getRandomAnswer();
export let distractors = getRandomDistractors();

export async function getLyrics() {

    let answers = [
        { song: answer[0].answer.song, distractor1: distractors[0], distractor2: distractors[1] },
        { song: answer[1].answer.song, distractor1: distractors[2], distractor2: distractors[3] },
        { song: answer[2].answer.song, distractor1: distractors[4], distractor2: distractors[5] },
        { song: answer[3].answer.song, distractor1: distractors[6], distractor2: distractors[7] }
    ]
    return answers
}

