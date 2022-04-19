let array1 = [
    {playername: "janne", score: 2},
    {playername: "pelle", score: 1},
    {playername: "steve", score:4},
    {playername: "calle", score:3}
];

let array2 = [{playername: "steve", score: 4},{playername: "calle", score: 3},{playername: "janne", score:2},{playername: "pelle", score:1}];

// function sortResults(array1){
//    return array1.map(a => a.score).sort();
// }

// describe("sorts function", () => {
//     test("it should sort by score, from highest to lowest", () => {
//         expect(sortResults(array1)[0].score).not.toBe(array2[0].score)

//     })})


function sorting(array1){

 let sortedResults;

sortedResults = array1.sort((a, b) => {
 return b.finalScores[0].score - a.finalScores[0].score;
        });
}

describe("sorts function", () => {
    test("it should sort by score, from highest to lowest", () => {
        expect(sorting(array1)[0].score).toBe(array2[0].score)

    })})




