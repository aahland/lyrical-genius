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


function sorting(string){

 let sortedResults;

sortedResults = string.sort((a, b) => {
 return b.score - a.score;
        });
}

describe("sorts function", () => {
    test("it should sort by score, from highest to lowest", () => {
        expect(sorting(array1)[0].score).toBe(array2[0].score)

    })})




