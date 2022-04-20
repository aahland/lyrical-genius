// Splitting string after captial letters, code taken from (https://bobbyhadz.com/blog/javascript-split-by-capital-letter)
export function splitLyrics(string){
    let splitted = string.split(/(?=[A-Y])/);
    return splitted;
} 
