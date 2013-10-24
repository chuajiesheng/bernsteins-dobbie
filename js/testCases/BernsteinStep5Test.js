describe("Testing step 5 of Bernstein algo", function() {

  it("Given: {X1 X2-> C D && C D -> X1 X2} and {X1 X2 ->A} and {A X1 ->B} and {B X2 -> C} and {C ->A}" +
      " remove {X1 X2 -> A} as it is a transitive element"
      ,function(){

    var fds = new Array();
    fds[0] = new Fd(["X1","X2"],["A","D"]);
    fds[1] = new Fd(["C","D"],["X1","X2"]);
    fds[2] = new Fd(["A","X1"],["B"]);
    fds[3] = new Fd(["B","X2"],["C"]);
    fds[3] = new Fd(["C"],["A"]);

    window.fds = fds;
    window.groupfds = new Array();

    Bernstein.step3(fds);
    var step3groupfds = window.groupfds;

    Bernstein.step4(step3groupfds);
    var step4groupfds = window.groupfds;

    Bernstein.step5(step4groupfds);
    var step5groupfds = window.groupfds;

    //creating expected output
    var expectedGroupfds = new Array();
    expectedGroupfds[0] = new Array();
    expectedGroupfds[0][0] = new Fd(["X1","X2"],["C","D"]);
    expectedGroupfds[0][1] = new Fd(["C","D"],["X1","X2"]);
    expectedGroupfds[1] = new Array();
    //expectedGroupfds[1][0] = new Fd(["X1","X2"],["A"]);
    expectedGroupfds[2] = new Array();
    expectedGroupfds[2][0] = new Fd(["A","X1"],["B"]);
    expectedGroupfds[3] = new Array();
    expectedGroupfds[3][0] = new Fd(["B","X2"],["C"]);
    expectedGroupfds[4] = new Array();
    expectedGroupfds[4][0] = new Fd(["C"],["A"]);
    //end of expected output

    var step5fds = Bernstein.convertGroupToFds(step5groupfds);
    var expectedfds = Bernstein.convertGroupToFds(expectedGroupfds);

    var result = dependencyArrayEqual(step5fds,expectedfds);
    expect(result).toBe(true);

  })

  it("Given: A->B and B->C and A->C "+
      " check removal of A->C as it is a transitive dependencies"
      ,function(){

    var fds = new Array();
    fds[0] = new Fd(["A"],["B"]);
    fds[1] = new Fd(["A"],["C"]);
    fds[2] = new Fd(["B"],["C"]);

    window.fds = fds;
    window.groupfds = new Array();

    Bernstein.step3(fds);
    var step3groupfds = window.groupfds;

    Bernstein.step4(step3groupfds);
    var step4groupfds = window.groupfds;

    Bernstein.step5(step4groupfds);
    var step5groupfds = window.groupfds;

    //creating expected output
    var expectedGroupfds = new Array();
    expectedGroupfds[0] = new Array();
    expectedGroupfds[0][0] = new Fd(["A"],["B"]);
    expectedGroupfds[1] = new Array();
    expectedGroupfds[1][0] = new Fd(["B"],["C"]);

    //end of expected output
    var step5fds = Bernstein.convertGroupToFds(step5groupfds);
    var expectedfds = Bernstein.convertGroupToFds(expectedGroupfds);

    var result = dependencyArrayEqual(step5fds,expectedfds);
    expect(result).toBe(true);

  })

});
