describe("Testing step 2 of Bernstein algo", function() {

  it("Given: A->B && A->C && B->C && B->D and expected that A->C will be redudant",function(){

    var fds = new Array();
    fds[0] = new Fd(["A"],["B"]);
    fds[1] = new Fd(["A"],["C"]);
    fds[1] = new Fd(["B"],["C"]);
    fds[1] = new Fd(["B"],["D"]);

    window.fds = fds;
    window.groupfds = new Array();

    var step2fds = step2(fds);

    var expectedfds = new Array();
    expectedfds[0] = new Fd(["A"],["B"]);
    expectedfds[1] = new Fd(["B"],["C"]);
    expectedfds[1] = new Fd(["B"],["D"]);

    var result = dependencyArrayEqual(step2fds,expectedfds);
    expect(result).toBe(true);

  })

  it("Given: AB->C && C->D && A->D and expected that A->D will be redundant",function(){

    var fds = new Array();
    fds[0] = new Fd(["A","B"],["C"]);
    fds[1] = new Fd(["C"],["D"]);
    fds[1] = new Fd(["A"],["D"]);

    window.fds = fds;
    window.groupfds = new Array();

    var step2fds = step2(fds);

    var expectedfds = new Array();
    expectedfds[0] = new Fd(["A","B"],["C"]);
    expectedfds[1] = new Fd(["C"],["D"]);

    var result = dependencyArrayEqual(step2fds,expectedfds);
    expect(result).toBe(true);

  })

  it("Given: AB->C && C->DE && A->E and expected that A->E will be redundant",function(){

    var fds = new Array();
    fds[0] = new Fd(["A","B"],["C"]);
    fds[1] = new Fd(["C"],["D","E"]);
    fds[1] = new Fd(["A"],["E"]);

    window.fds = fds;
    window.groupfds = new Array();

    var step2fds = step2(fds);

    var expectedfds = new Array();
    expectedfds[0] = new Fd(["A","B"],["C"]);
    expectedfds[1] = new Fd(["C"],["D","E"]);

    var result = dependencyArrayEqual(step2fds,expectedfds);
    expect(result).toBe(true);

  })


  it("Given: A->B && A->C && B->D and expected that there will not be any redundant",function(){

    var fds = new Array();
    fds[0] = new Fd(["A"],["B"]);
    fds[1] = new Fd(["A"],["C"]);
    fds[2] = new Fd(["B"],["D"]);

    window.fds = fds;
    window.groupfds = new Array();

    var step2fds = step2(fds);

    var expectedfds = new Array();
    expectedfds[0] = new Fd(["A"],["B"]);
    expectedfds[1] = new Fd(["A"],["C"]);
    expectedfds[2] = new Fd(["B"],["D"]);

    var result = dependencyArrayEqual(step2fds,expectedfds);
    expect(result).toBe(true);

  })

});
