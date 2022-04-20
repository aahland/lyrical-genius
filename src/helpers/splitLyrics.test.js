let string = "Ah! I love the colorful clothes she wears And the way the sunlight plays upon her hair Ah!"

function splitLyrics(string){
    let splitted = string.split(/(?=[A-Y])/);
    return splitted;
} 

test("The function should split the string before each capital letter creating 4 snippets", () => {
    expect(splitLyrics(string).length = 4)
})
