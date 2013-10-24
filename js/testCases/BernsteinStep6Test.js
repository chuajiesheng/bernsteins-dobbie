describe("Testing step 6 of Bernstein algo", function() {

  it("Given: {X1 X2 ->C D and C D ->X1 X2} and {A X1->B} and {B X2 ->C} and {C->A}."+
    "check that X1 and X2 both are independent key for relation {X1, X2, C, D}"
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

    Bernstein.step6(step5groupfds);
    var step6groupfds = window.groupfds; 

    //creating expected output
    var expectedGroupfds = new Array();
    expectedGroupfds[0] = new Array();
    expectedGroupfds[0][0] = new Fd(["X1","X2"],["C","D"]);
    expectedGroupfds[0][1] = new Fd(["C","D"],["X1","X2"]);
    expectedGroupfds[1] = new Array(); 
    expectedGroupfds[1][0] = new Fd(["X1","X2"],["A"]);
    expectedGroupfds[2] = new Array(); 
    expectedGroupfds[2][0] = new Fd(["A","X1"],["B"]);
    expectedGroupfds[3] = new Array(); 
    expectedGroupfds[3][0] = new Fd(["B","X2"],["C"]);  
    expectedGroupfds[4] = new Array(); 
    expectedGroupfds[4][0] = new Fd(["C"],["A"]);
    //end of expected output 

    var step4groupfds = Bernstein.convertGroupToFds(step4groupfds);
    var expectedfds = Bernstein.convertGroupToFds(expectedGroupfds);

    var result = dependencyArrayEqual(step4groupfds,expectedfds);
    expect(result).toBe(true);

  })

  it("Given: A->B and B->C and B->D and D->B and AE->F "+
      "Check that (1) Create group J of {B->D and D->B}, " + 
      "(2) remove B->D and D->B from the fD." 
      ,function(){

    var fds = new Array();
    fds[0] = new Fd(["X1","X2"],["A","D"]);
    fds[1] = new Fd(["C","D"],["X1","X2"]);
    fds[2] = new Fd(["A","X1"],["B"]);
    fds[3] = new Fd(["B","X2"],["C"]);
    fds[3] = new Fd(["C"],["A"]);

    window.fds = fds;
    window.groupfds = new Array();

    Bernstein.step3(groupfds);
    var step3groupfds = window.groupfds; 

    Bernstein.step4(step3groupfds);
    var step4groupfds = window.groupfds; 

    //creating expected output
    var expectedGroupfds = new Array();
    expectedGroupfds[0] = new Array();
    expectedGroupfds[0][0] = new Fd(["B"],["D"]);
    expectedGroupfds[0][1] = new Fd(["D"],["B"]);
    expectedGroupfds[1] = new Array(); 
    expectedGroupfds[1][0] = new Fd(["A"],["B"]);
    expectedGroupfds[2] = new Array(); 
    expectedGroupfds[2][0] = new Fd(["B"],["C"]);
    expectedGroupfds[3] = new Array(); 
    expectedGroupfds[3][0] = new Fd(["A","E"],["F"]); 
    
    //end of expected output 
    
    var step4groupfds = Bernstein.convertGroupToFds(step4groupfds);
    var expectedfds = Bernstein.convertGroupToFds(expectedGroupfds);

    var result = dependencyArrayEqual(step4groupfds,expectedfds);
    expect(result).toBe(true);

  })

});
