bernsteins-dobbie
=================

Teaching Aid for Bernstein’s Algorithm with Step-by-step Explanation

Running the test
=================
- open testCases.html at the root folder and open it 

Adding test cases (js/testCases/BernsteinTest.js)
================= 

    //sample test cases
    describe("Title of this test cases", function() {
      
      it("Sub-title of each test cases", function() {
          expect(true).toBe(true);
      });

      it("Sub-title of each test cases", function() {
          expect(true).toBe(true);
      });
    }

Step 6 output
=================

    groupfds[0...step6JIndex-1] are the typical relation with LHS = key, RHS = attribute
    
    groupfds[step6JIndex-1..end] are all key relation, LHS itself might have an array. 

If an array of length 2 exist, it means that both could possibly be keys