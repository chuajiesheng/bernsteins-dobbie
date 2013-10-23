//method to remove redundant attribute and FDs (covering)
function removeCover(tempArr, rhs) {
    var diff = [];
	//check any elements in rhs is in closure
    //repeated element will be removed
    diff = _.without(rhs, tempArr);
    if (diff != null){
        rhs = _.difference(rhs, tempArr);
    } else {
        rhs = rhs
    }
    return rhs;
}

function cover(att, fds) {
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
        if (contains(lhs, res)) {
            //remove redundant attribute from RHS
            rhs = removeCover(res, rhs);
            fds[i].rhs = rhs;
            //if rhs becomes empty, whole FD is removed
            if (rhs.length == 0){
                fds.splice(i, 1);
            } else {
            newR = uniqueAdd(res, rhs);
            res = newR;
            }
        }
    }
    return fds;
}

function covering(att, fds) {
    //closure for first attribute
    var res = cover(att, fds);
    // closure with elements added in
    var res2 = cover(res, fds);
    //Get all closure
    while (!arrayEqual(res, res2)) {
        res = res2;
       res2 = cover(res, fds);
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
                    newRHS = _.difference(rhs, array[j].rhs);
                    if (newRHS.length != initLength) {
                        array[i] = new Fd(array[i].lhs, newRHS);
                        console.log('fds have changed from, \''
                                    + initStr + '\' to \''
                                    + array[i].str());
                    }
                }
            }
        }
    });
}

function step1(fds) {
    print_message("Find redundant attribute for each LHS");

    for (var i=0;i<fds.length;i++)
    {
        //get closure for attributes on LHS
        //then exclude LHS attributes from the closure
        var lhsClosure = closure(fds[i].lhs, fds);


        lhsClosure = _.difference(lhsClosure, fds[i].lhs);
        lhsCheck = fds[i].lhs;

        for (var j=0;j<fds.length;j++)
        {
            lhs = fds[j].lhs;
            rhs = fds[j].rhs;
            //remove redundant attributes from LHS
             if(contains(lhsCheck, lhs)){
                removedLHS = _.intersection(lhs, lhsClosure);
                lhs = _.difference(lhs, lhsClosure);
                 if (removedLHS.length > 0){
                     print_message("Find the closure of attribute "+ fds[i].lhs +": " + lhsClosure);
                     print_message("Remove redundant attribute on the LHS that is within the closure");
                     print_message(removedLHS + " is removed from " +     fds[j].str());
                     fds[j] = new Fd(lhs,rhs);
                     print_message("Hence the FD becomes " + fds[j].str());
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
        fds = covering(fds[i].lhs, fds);
    }
	return fds;
}
