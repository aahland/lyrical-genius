function spliceFunction(array) {
array.splice(0,1);
return array;
}


describe("testing the splice function", () => {
    test("should remove first object in array", () => {
        let input = [
            {playername: "per"},
            {playername: "anton"},
            {playername: "pelle"},
            {playername: "calle"}
        ]

        let output = [
            {playername: "anton"},
            {playername: "pelle"},
            {playername: "calle"}
        ]

        expect(spliceFunction(input)).toStrictEqual(output);

    })
})