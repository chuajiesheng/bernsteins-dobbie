// describe("Testing step 1 of Bernstein", function() {
  
//   it("Given A,B -> C and A->B, result is A->C, A->B", function() {
    
//     var fds = [];
//     fds[0] = new Fd(["a","b"], ["c"]);
//     fds[1] = new Fd(["a"], ["b"]);

//     var step1FdsResult = step1(fds);

//     console.log(step1FdsResult);
    
//     var expectedfds = [];
//     expectedfds[0] = new Fd(["a"],["c"]);
//     expectedfds[1] = new Fd(["a"],["b"]);


//     // var result = (step1FdsResult.str() == expectedfds.str());

//     // expect(result).toBe(true);

//     expect(true).toBe(true);
//   });

// });

// //sample test cases
// describe("Title of this test cases", function() {
  
//   it("Sub-title of each test cases", function() {
    
//     expect(true).toBe(true);
//   });

//   it("Sub-title of each test cases", function() {
    
//     expect(true).toBe(true);
//   });

// });

describe("Testing step 3 to step 6 of Bernstein", function() {

  it("Given - A->B and A->C and B->A",function(){

    var fds = new Array();
    fds = window.fds;

    fds[0] = new Fd(["A"],["B"]);
    fds[1] = new Fd(["A"],["C"]);
    fds[2] = new Fd(['B'],['A']);

    // console.log('before start');
    // console.log(fds);
    // console.log('before start');

    Bernstein.step3(fds);
    // console.log('step 3 result ==');
    // console.log(groupfds);

    Bernstein.step4(groupfds);
    // console.log('step 4 result ==');
    // console.log(groupfds);

    Bernstein.step5(groupfds);
    // console.log('step 5 result ==');
    // console.log(groupfds);

    Bernstein.step6(groupfds);
    console.log('step6 result ');
    console.log(groupfds);

    var expectedfds = new Array(new Array());
    expectedfds[0] = [];
    expectedfds[1] = [];
    expectedfds[2] = [];
    expectedfds[2][0] = new Fd([["A"],["B"]],["C"]);

  })


  // it("Given, X1,X2->A,D and C,D->X1,X2 and A,X1->B and B,X2->C and C->A", function() {

  //   var fds = [];
    
  //   fds[0] = new Fd(["X1","X2"],["A","D"]);
  //   fds[1] = new Fd(["C","D"],["X1","X2"]);
  //   fds[2] = new Fd(["A","X1"],["B"]);
  //   fds[3] = new Fd(["B","X2"],["C"]);
  //   fds[4] = new Fd(["C"],["A"]);

  //   // var step1FdsResult = step1(fds);
  //   // var step2FdsResult = step2(fds);
  //   // var step3FdsResult = Bernstein.step3(step2FdsResult);

  //   var step3FdsResult = Bernstein.step3(fds);
  //   var step4FdsResult = Bernstein.step4(step3FdsResult);
  //   var step5FdsResult = Bernstein.step5(step4FdsResult);
  //   var step6FdsResult = Bernstein.step6(step5FdsResult);

  //   console.log('step6 result ');
  //   console.log(step6FdsResult);

  //   expect(true).toBe(true);

  // });

});