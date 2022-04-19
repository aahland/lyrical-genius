describe("testing the splice function", () => {
    test("should remove first object in array", () => {
        const input = [
            {playername: "per"},
            {playername: "anton"},
            {playername: "pelle"},
            {playername: "calle"}
        ]

        const output = [
            {playername: "per"}
        ]

        expect(input.splice(0, 1)).toStrictEqual(output);

    })
})