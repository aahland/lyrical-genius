let string = "Ah! I love the colorful clothes she wears. And the way the sunlight plays upon her hair Ah!"

function splitLyrics(string){
    let splitted = string.split(".");
    return splitted;
} 

test("The function should split the string on every dot creating 2 snippets", () => {
    expect(splitLyrics(string).length = 4)
})
