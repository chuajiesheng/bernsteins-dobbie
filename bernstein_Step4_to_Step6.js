
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
function step4($wtf_is_coming_in){


}
//Step 5 function eliminate transitive dependency
	//for each FD, check transitive as follow
		//if A->B, check if B appears at LHS and see what it points to (eg. B->C)
			//then check if A->C exist
				//if exist
					//remove A->C
function step5($wtf_is_coming_in){



}

//Step 6 function
	//yay simple as it is, convert all to the relation 
function step6(wtf_is_coming_in){


}