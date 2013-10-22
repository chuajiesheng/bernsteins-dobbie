(function(window){

    function Bernstein(){}


    var initialGroupfdsLength = -1;

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
        		var size = groupfds.length;
        		//create a new group and push the tempFDS in 
        		groupfds[size] = new Array();

        		//groupfds[groupfds.length][0] = tempFDS;
        		groupfds[size].push(tempFDS);
        	}

        });

        initialGroupfdsLength = groupfds.length;

    }

	//Step 4 function, merge equivalent keys, 
    //input : an array of fds in each partitioned grp 
    Bernstein.prototype.step4 = function(groupfds) {
        

        var totalGrp = groupfds.length;
        var originalGrpLength = groupfds.length;
        var noAddedPartitionedGrp = 0; 
        

        //loop through each groupsfds with the form [Array,Array,Array]
        $.each(groupfds, function(index,sameLHSFds){

            //given LHS, find the closure 
            if(sameLHSFds[0] != undefined){
                var closureSet = closure(sameLHSFds[0].lhs,fds);
            }else{
                var closureSet = ['zzz'];
            }

            //loop through the other groupfds 
            for(var i=index+1; i < originalGrpLength; i++ ){

                //check the closure for the next partitioned group 
                var closureSet2 = closure(groupfds[i][0].lhs,fds);

                //if same closure
                    if (arrayEqual(closureSet,closureSet2)){

                        var message = "found identical closure and creating a new group with"+
                                        sameLHSFds[0].lhs + "->" + groupfds[i][0].lhs;
                        print_message(message);
                        step4Messages.push(message);

                        
                        //create new group with FD of same LHSFds.lhs and groupfds[i][0].lhs 
                        groupfds[totalGrp] = new Array();

                        console.log('before cloning');
                        console.log(groupfds);

                        //copy a new array if not its copying references 
                        var tempArrayCopy = clone(groupfds[index]);
                        var tempArrayCopy2 = clone(groupfds[i]);

                        groupfds[totalGrp][0] = new Fd;
                        groupfds[totalGrp][0].lhs = tempArrayCopy[0].lhs;
                        groupfds[totalGrp][0].rhs = tempArrayCopy2[0].lhs;
                        // groupfds[totalGrp][0].lhs = sameLHSFds[0].lhs;
                        // groupfds[totalGrp][0].rhs = groupfds[i][0].lhs;

                        groupfds[totalGrp][1] = new Fd;
                        groupfds[totalGrp][1].lhs = tempArrayCopy2[0].lhs;
                        groupfds[totalGrp][1].rhs = tempArrayCopy[0].lhs;
                        // groupfds[totalGrp][1].lhs = groupfds[i][0].lhs;
                        // groupfds[totalGrp][1].rhs = sameLHSFds[0].lhs;

                        // console.log('before calling');
                        // console.log(groupfds);

                        //loop through all the partitioned group fds and remove X-Y if found 
                        removeFDFromGroup(groupfds[totalGrp][0],groupfds,originalGrpLength);
                        removeFDFromGroup(groupfds[totalGrp][1],groupfds,originalGrpLength);

                        totalGrp++;

                    }
            }
        })

    }

    //eg. remove FDS of X->Y from groupfds
    //Case 1: if groupFDS contains X->YZ, change it to only X->Z
    //Case 2: if groupFDS contains Y->XZ, change it to only Y->Z 
    function removeFDFromGroup(fdsToRemove,groupfds,initialGroupFdsLength){

        // console.log('came inside remove FD From Group with');
        // console.log(fdsToRemove);
        // console.log(groupfds);
        // console.log(initialGroupFdsLength);

        for(var i=0;i<initialGroupFdsLength;i++){

            var group = groupfds[i];

            for(var x =0; x < group.length; x ++){

                fds = group[x];

                //case 1
                if(arrayEqual(fdsToRemove.lhs,fds.lhs)){

                    //Remove any fds.rhs that is inside fdsToRemove.rhs 
                    $.each(fdsToRemove.rhs, function(fdsRemoveIndex,fdsToRemoveAttr){

                        $.each(fds.rhs,function(fdsIndex,fdsAttr){

                            if(fdsAttr == fdsToRemoveAttr){

                                //found a similar LHS and RHS 
                                var message = "Found a FD of "+fds.str()+ ", pusing the FD to group J instead.";
                                print_message(message);
                                step4Messages.push(message);

                                //remove it from the fds 
                                fds.rhs.splice(fdsIndex,1);
                            }
                        })
                    })

                    if (fds.rhs.length ==0){
                        groupfds[i].splice(x,1);
                        x--;
                    }

                } //case 2 
                else if(arrayEqual(fdsToRemove.rhs,fds.lhs)){

                    //Remove any fds.rhs that is inside fdsToRemove.rhs 
                    $.each(fdsToRemove.rhs,function(fdsRemoveIndex,fdsToRemoveAttr){

                        $.each(fds.rhs,function(fdsIndex,fdsAttr){
                            if(fdsAttr == fdsToRemoveAttr){
                                //remove it from the fds 
                                fds.lhs.splice(fdsIndex,1);
                            }
                        })

                        if (fds.rhs.length ==0){
                            groupfds[i].splice(x,1);
                            x--;
                        }

                    })

                } 

            }

        }

        //return groupfds;

    }


    //Step 5 function eliminate transitive dependency
    Bernstein.prototype.step5 = function(groupfds) {


        //convert the group fds to the fds 
        var tempfdsSet = getAllFdsFromGroupFds(groupfds);

        $.each(groupfds, function(groupIndex,setFds){
            
            for(var i =0; i < setFds.length;i++){

                // check if this FDS is transitive 
                // console.log("======== checking =======")
                // console.log(setFds[i]);
                // console.log(tempfdsSet);
                //console.log(isTransitive(setFds[i],tempfdsSet));
                if (isTransitive(setFds[i],tempfdsSet)){

                    var message = setFds[i].str() + " is a transitive attribute, removing it from the group";
                    step5Messages.push(message);
                    print_message(message);

                    //is transitive, remove that fds from the group 
                    groupfds[groupIndex].splice(i,1);
                    i--;
                    console.log("is transitive");
                }else{
                    console.log("not transitive");
                }
                // else{
                //     console.log("not transitive");
                // }

            }
        });

    }

    //function convert the groupfds which is array of arrays of FDS into arrays of FDS
    function getAllFdsFromGroupFds(groupfds){

        var tempfdsSet = new Array();

        $.each(groupfds, function(groupIndex,setfds){
            $.each(setfds,function(setIndex,fds){
                tempfdsSet.push(fds);
            })
        
        });

        return tempfdsSet;
    }

    //input sample
    //fdsToCheck = A->DEF
    //fds = set of FDS [A->B,B->C,C->DE,B->F,A->DEF]
    //comment below will be based on the above input 
    function isTransitive(fdsToCheck,fds){

        // console.log('checking transitive for the following');
        // console.log(fdsToCheck);
        // console.log(fds);

        //tempFdsSet contains all FD except A->DEF 
        var tempFdsSet = new Array();

        $.each(fds,function(index,fd){

            if(!arrayEqual(fd.lhs,fdsToCheck.lhs) || !arrayEqual(fd.rhs,fdsToCheck.rhs)){
                
                tempFdsSet.push(fd);
            }

        })

        //get closure of A without A->DEF inside 
        // console.log('checking closure of');
        // console.log(fdsToCheck.lhs);
        // console.log(tempFdsSet);

        var closureAttr = closure(fdsToCheck.lhs,tempFdsSet);

        // console.log('closure ==');
        // console.log(closureAttr);
        // console.log('end closure ==');

        //if closure contains DEF
        if(contains(fdsToCheck.rhs,closureAttr)){

            var transitivePointed = false; 

            //fdsSet will contain other fd that has RHS of B or E or F 
            var fdsSet = new Array(); 
                
            //loop through all RHS attribute (B,E,F)
            $.each(fdsToCheck.rhs,function(index,attr){

                //for each (B,E,F), check who is pointing to it 
                $.each(tempFdsSet,function(innderIndex,fd){

                    //found the guy that pointed to either (B,E or F)
                    if(contains(attr,fd.rhs)){

                        if(_.intersection(fd.lhs,fdsToCheck.lhs).length == 0){
                            
                            fdsSet.push(fd);                            
                        }

                    }
                })

            })

            /*
            fdsSet now contains all functional dependencies that
            was pointing to the closure attribute 
            
            */

            //no chance of transitive 
            if (fdsSet.length ==0)
                return false;


            //looping through all the functional dependencies
            $.each(fds,function(index,fd){

                //if the functional dependencies has the same LHS as the 
                //to check FDS 
                if(arrayEqual(fdsToCheck.lhs,fd.lhs)){

                    var pointedToFD = false;    

                    $.each(fdsSet,function(innerIndex,fdsSet_fd){

                        if(contains(fdsSet_fd.lhs,fd.rhs)){
                            pointedToFD = true;
                        }

                    })

                    if(pointedToFD == false){
                        transitivePointed = true;
                    }


                }

            })
            
            return transitivePointed;

        }

        return false;

    }

	//Step 6 function
		//yay simple as it is, convert all to the relation 
    Bernstein.prototype.step6= function(groupfds) {


        //fds = getAllFdsFromGroupFds(groupfds);

        // console.log(initialGroupfdsLength);

        step6JIndex = initialGroupfdsLength;

        //merge all the individual group set of FD into one FD
        //eg. {A -> B, A -> C} into {A -> B,C}
        //$.each(groupfds,function(groupIndex,setFds){
        for(var i =0;i<initialGroupfdsLength;i++){
                
            var setFds = groupfds[i];

            $.each(setFds,function(setIndex,fds){

                if(setIndex!=0){

                    $.each(setFds[setIndex].rhs,function(index,rhs_attr){

                        var message = "merging " +  setFds[setIndex].str() + " into" + setFds[0].str();

                        setFds[0].rhs.push(rhs_attr);    
                    })
                    
                }                

            });
            setFds.splice(1,setFds.length-1);
        }

        //Merge all the all key relation into one FD
        //eg. {B->D, D->B} into FD.lhs = ['B','D'] and FD.rhs = '';
        for(var j= initialGroupfdsLength;j<groupfds.length;j++){

            groupfds[j].splice(1,groupfds[j].length-1);

            var value = groupfds[j][0].lhs;
            groupfds[j][0].lhs = [];
            groupfds[j][0].lhs.push(value);
            groupfds[j][0].lhs.push(groupfds[j][0].rhs);

            groupfds[j][0].rhs = [];

        }

        // groupfds index 0 to initialGroupfds contains normal relation
        // groupfds index initialGroupFds to end contain all key relation
        // goal of this part is to remove fds from normal relation if their key is in all_key
        for(var i =0;i< initialGroupfdsLength;i++){

            for(var j= initialGroupfdsLength;j<groupfds.length;j++){
                
                // console.log('comparing jehe with j=='+j);
                // console.log(groupfds[j]);
                
                $.each(groupfds[j][0].lhs,function(index,allKeyLhs){

                    // console.log('comparing');
                    // console.log(groupfds[i].lhs);
                    // console.log(allKeyLhs);
                    $.each(groupfds[i],function(innerIndex,innerfds){

                        if(arrayEqual(innerfds.lhs,allKeyLhs)){

                            groupfds[j][0].rhs.push(innerfds.rhs);
                            groupfds[i].splice(0,groupfds[i].length+1);

                        }

                    })              

                })

                 
            }

        }

        //calling the R 
        for(var i =0;i<initialGroupfdsLength;i++){
            if(groupfds[i].lhs !=undefined){
                console.log('pushing R with');
                console.log(i);
                console.log(groupfds[i].lhs);
                console.log(groupfds[i].rhs);

               rels.push(new R(i,groupfds[i].lhs,groupfds[i].rhs));
            }
        }

        for(var i=initialGroupfdsLength; i < groupfds.length; i++){
            
            var tempLeftArray = new Array();
            var tempRightArray = new Array();
            console.log('printing weird grp');
            console.log(groupfds[i]);

            $.each(groupfds[i],function(index,fd){
                $.each(fd.lhs,function(innerIndex,lhs_attr){
                    tempLeftArray.push(lhs_attr);    
                })
                $.each(fd.rhs,function(innerIndex,rhs_attr){
                    tempRightArray.push(rhs_attr);    
                })

            })    

            rels.push(new R(i,tempLeftArray,tempRightArray));
        }

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

    function clone(source) {
        var result = source, i, len;
        if (!source
            || source instanceof Number
            || source instanceof String
            || source instanceof Boolean) {
            return result;
        } else if (Object.prototype.toString.call(source).slice(8,-1) === 'Array') {
            result = [];
            var resultLen = 0;
            for (i = 0, len = source.length; i < len; i++) {
                result[resultLen++] = clone(source[i]);
            }
        } else if (typeof source == 'object') {
            result = {};
            for (i in source) {
                if (source.hasOwnProperty(i)) {
                    result[i] = clone(source[i]);
                }
            }
        }
        return result;
    };

    window.Bernstein = new Bernstein();

})(window);
