describe("Testing step 1 of Bernstein", function() {
  
  it("Given A,B -> C and A->B, result is A->C, A->B", function() {
    
    var fds = [];
    fds[0] = new Fd(["a","b"], ["c"]);
    fds[1] = new Fd(["a"], ["b"]);

    var step1FdsResult = step1(fds);
    
    var expectedfds = [];
    expectedfds[0] = new Fd(["a"],["c"]);
    expectedfds[1] = new Fd(["a"],["b"]);

    var result = arrayEqual(expectedfds,step1FdsResult);

    expect(result).toBe(true);
  });

});