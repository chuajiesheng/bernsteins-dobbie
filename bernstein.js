(function(window){
    
    function Bernstein(){}

    //Partition FDs into respective group
    Bernstein.prototype.step3 = function(fds) {

        var fdsGroup = fds;

        $.each(fdsGroup,function(index,tempFDS){
        	
        	var found = false;

        	//for each fds, check the LHS exist in any group
        	//if exist, push it inside that group 
        	$.each(groupfds,function(groupIndex,groupVal){

  				var firstFdsInGroup = groupfds[groupIndex][0];

  				if(firstFdsInGroup != undefined){

  					var isLHSEqual = compareFDLHS(firstFdsInGroup,tempFDS);

  					//result 1 == similar
  					if(isLHSEqual == true){
	        			groupfds[groupIndex].push(tempFDS);
	        			found = true; 
	        		}
  				}
        		
        	});

        	//if its not found in any group
        	if(found == false) {
        		console.log(groupfds.length + "<-- length!");
        		var size = groupfds.length;
        		//create a new group and push the tempFDS in 
        		groupfds[size] = new Array();

        		//groupfds[groupfds.length][0] = tempFDS;
        		groupfds[size].push(tempFDS);
        	}

        });

    }

	//Step 4 function, merge equivalent keys
	//Assume an array of functional dependencies 

	//Loop through all the keys and check for proper equivalent (find closure)
	//Example would be B->D in R1 and D->B in R2 
	//ANother example would be AB -> CD and CE-> AB, 
		//for the above case, pull out AB->C

	//If proper equivalent, create another relation with (B->D and D->B)
		//remove B->D and D->B from the other relation

	//Also if X->Z in either of the relation and Z is inside Y, remove X->Z,
	//likewise if Y->Z in either of the relation where Z inside X

	//output the relation (it will depend on the input)
    Bernstein.prototype.step4 = function() {
        console.log("hello");
    }

    //Step 5 function eliminate transitive dependency
	//for each FD, check transitive as follow
		//if A->B, check if B appears at LHS and see what it points to (eg. B->C)
			//then check if A->C exist
				//if exist
					//remove A->C
    Bernstein.prototype.step5 = function() {
        console.log("hello");
    }

	//Step 6 function
		//yay simple as it is, convert all to the relation 
    Bernstein.prototype.step6= function() {
        console.log("hello");
    }


    //methods check for equity for LHS attribute of fd1 and fd2
    function compareFDLHS(fd1,fd2){

    	var result1 = compareLHS(fd1,fd2);
    	var result2 = compareLHS(fd2,fd1);

    	if(result1==1 && result2==1)
    		return true;
    	else
    		return false;
    }

    //methods check if all LHS of fd1 exist in LHS of fd2
    function compareLHS(fd1,fd2){
    	
    	var fd1_lhs_equal_fd2_rhs= true;

    	//loop through all the LHS attribute in fd1
    	$.each(fd1.lhs,function(fd1Index,fd1Value){
    		//compare to see if it exist at fd2 
    		var found = false;	
    		$.each(fd2.lhs,function(fd2Index,fd2Value){
    			if(fd1Value == fd2Value)
    				found = true; 
    		})

    		if (found == false)
    			fd1_lhs_equal_fd2_rhs = false;
    	})

    	if(fd1_lhs_equal_fd2_rhs == true)
    		return 1;
    	else
    		return 0;

    }


    window.Bernstein = new Bernstein();

})(window);
