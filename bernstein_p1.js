//method to remove redundant attribute and FDs (covering)
function removeCover(tempArr, rhs) {
     var diff = [];
  //check any elements in rhs is in closure
    //repeated element will be removed
   diff = _.without(rhs, tempArr);
     if (diff != null){
        rhs = _.difference(rhs, tempArr);
     } else {
        rhs = rhs;
     }
    return rhs; 
} 

function cover(att, fds, z) {
    var res = [];
    // init
    if (Array.isArray(att)) {
        for (var i = 0; i < att.length; i++) {
            res.push(att[i]);
        }
    } else {
        res.push(att);
    }
    
    for (var i = 0; i < fds.length; i++) {
        var lhs = fds[i].lhs;
        var rhs = fds[i].rhs;
        
        if (i == z) {}
        else{
            if (contains(lhs, res)) {
                if (lhs == fds[z].lhs) {} 
                else {
                newR = uniqueAdd(res, rhs);
                res = newR;
                }
            }
        }
    }    
    lhs1 = fds[z].lhs;
    rhs1 = fds[z].rhs;  
    rhs2 = removeCover(res, rhs1);
    if (rhs1.length !=0 && rhs2.length == 0) {
        print_message(fds[z].str() + " is removed as it is a non-redundant covering.");
    }
    fds[z] = new Fd(lhs1, rhs2);

    return fds;
}

function covering(att, fds, z) {
    //closure for first attribute
    var res = cover(att, fds, z);
    // closure with elements added in
    var res2 = cover(res, fds, z);
    //Get all closure
    while (!arrayEqual(res, res2)) {
        res = res2;
       res2 = cover(res, fds, z);
    }
    return res2;
}

function rhsSetSubtraction(fds) {
    // sort
    var uniqueLHS = [];
    for (var i = 0; i < fds.length; i++) {
        uniqueLHS = uniqueAdd(fds[i].lhs, uniqueLHS);
    }

    // init lhs array
    var sortedFds = [];
    for (var i = 0; i < uniqueLHS.length; i++) {
        sortedFds.push([]);
    }

    // sort the fds
    for (var i = 0; i < fds.length; i++) {
        var lhs = fds[i].lhs;

        for (var j = 0; j < sortedFds.length; j++) {
            if (arrayEqual(lhs, uniqueLHS[j])) {
                sortedFds[j].push(fds[i]);
                sortedFds[j] = sortedFds[j].sort();
                sortedFds[j] = sortedFds[j].reverse();
                break;
            }
        }
    }

    // set difference
    $.each(sortedFds, function(index, array) {
        for (var i = 0; i < array.length; i++) {
            var rhs = array[i].rhs;
            var initStr = array[i].str();
            var initLength = rhs.length;

            for (var j = 0; j < array.length; j++) {
                if (i != j) {
                    // not myself
                    var newRHS = [];
                    if (rhs.length > array[j].rhs.length) {
                        newRHS = _.difference(rhs, array[j].rhs);
                    } else if (rhs.length < array[j].rhs.length) {
                        newRHS = _.difference(array[j].rhs, rhs);
                    } else {
                        newRHS = rhs;
                    }

                    if (newRHS.length < initLength) {
                        array[i] = new Fd(array[i].lhs, newRHS);
                        console.log('fds have changed from, \''
                                    + initStr + '\' to \''
                                    + array[i].str());
                    }
                }
            }
        }
    });

    res = [];
    $.each(sortedFds, function(index, array) {
        res = res.concat(array);
    });

    return res;
}

function step1(fds) {
    print_message("Find redundant attribute for each LHS");

    for (var i=0;i<fds.length;i++)
    {
        //get closure for attributes on LHS
        //then exclude LHS attributes from the closure
        var lhsClosure = closure(fds[i].lhs, fds);


        var lhsClosureEx = _.difference(lhsClosure, fds[i].lhs);
        lhsCheck = fds[i].lhs;

        for (var j=0;j<fds.length;j++)
        {
            lhs = fds[j].lhs;
            rhs = fds[j].rhs;
            //remove redundant attributes from LHS
             if(contains(lhsCheck, lhs)){
                removedLHS = _.intersection(lhs, lhsClosureEx);
                lhs = _.difference(lhs, lhsClosureEx);
                 if (removedLHS.length > 0){
                     print_message(fds[j].str() + " contains redundant attribute, " + removedLHS + ", as LHS's closure is " + lhsClosureEx);
                     fds[j] = new Fd(lhs,rhs);
                     print_message("After removing it, the FD becomes " + fds[j].str());
                 }
             }
        }
    }
    return fds;
}


function step2(fds) {
    rhsSetSubtraction(fds);
	
	for (var i=0;i<fds.length;i++)
    {
        //get closure for attributes on LHS
        //then exclude LHS attributes from the closure
        var lhsClosure = closure(fds[i].lhs, fds);
        var lhsClosureEx = _.difference(lhsClosure, fds[i].lhs);
        lhsCheck = fds[i].lhs;

        for (var j=0;j<fds.length;j++)
        {
            lhs = fds[j].lhs;
            rhs = fds[j].rhs;
            //remove redundant attributes from LHS
             if(contains(lhsCheck, rhs)){
                removedRHS = _.intersection(rhs, lhsClosureEx);
                rhs = _.difference(rhs, lhsClosureEx);
                 if (removedRHS.length > 0){
                     print_message(removedRHS + " is determined by " + lhsCheck + ", hence it can be removed from " + fds[j].str());
                     fds[j] = new Fd(lhs,rhs);
                 }
             }
        }
    }
  
    /****** handles transitive dependency ******/
    for (var i=0;i<fds.length;i++)
    {
        fds = covering(fds[i].lhs, fds, i);
    }
    
      for (var j = 0; j < fds.length; j++) { 
         if (fds[j].rhs.length == 0){
             fds.splice(j, 1); 
         } 
    }
    return fds;
}