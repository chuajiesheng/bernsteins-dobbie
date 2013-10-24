describe("Testing reconstruct step", function() {

    it("Given: A->B and B->>C and expected that D will be an missing attribute ",function(){

        var attributes = ["A", "B", "C", "D"];
        window.attributes = attributes;

        var fds = [];
        fds[0] = new Fd(["A"],["B"]);
        window.fds = fds;

        var mvds = [];
        mvds[0] = new Mvd(["B"],["C"]);
        window.mvds = mvds;

        var groupfds = [];
        groupfds[0] = [[fds[0]]];
        window.groupfds = new Array();

        var expected = "D"

        var reconstructRes = reconstruct(groupfds);

        var result = arrayEqual(expected, reconstructRes);
        expect(result).toBe(true);
  })

    it("Given: A->BCD and E->>F and expected no missing attribute ",function(){

        var attributes = ["A", "B", "C", "D", "E", "F"];
        window.attributes = attributes;

        var fds = [];
        fds[0] = new Fd(["A"],["B","C","D"]);
        window.fds = fds;

        var mvds = [];
        mvds[0] = new Mvd(["E"],["F"]);
        window.mvds = mvds;

        var groupfds = [];
        groupfds[0] = [[fds[0]]];
        window.groupfds = new Array();

        var expected = []

        var reconstructRes = reconstruct(groupfds);

        var result = arrayEqual(expected, reconstructRes);
        expect(result).toBe(true);
    })

    it("Given: A->BCD and expected E,F as  missing attribute ",function(){

        var attributes = ["A", "B", "C", "D", "E", "F"];
        window.attributes = attributes;

        var fds = [];
        fds[0] = new Fd(["A"],["B","C","D"]);
        window.fds = fds;

        var mvds = [];
        window.mvds = mvds;

        var groupfds = [];
        groupfds[0] = [[fds[0]]];
        window.groupfds = new Array();

        var expected = ["E", "F"]

        var reconstructRes = reconstruct(groupfds);

        var result = arrayEqual(expected, reconstructRes);
        expect(result).toBe(true);
    })

    it("Given: A->>B, C->>D and expected E,F as  missing attribute ",function(){

        var attributes = ["A", "B", "C", "D", "E", "F"];
        window.attributes = attributes;

        var fds = [];
        window.fds = fds;

        var mvds = [];
        mvds[0] = new Mvd(["A"],["B"]);
        mvds[1] = new Mvd(["C"],["D"]);
        window.mvds = mvds;

        var groupfds = [];
        groupfds[0] = [];
        window.groupfds = new Array();

        var expected = ["E", "F"]

        var reconstructRes = reconstruct(groupfds);

        var result = arrayEqual(expected, reconstructRes);
        expect(result).toBe(true);
    })

});
