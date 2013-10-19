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


function step1(fds) {
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
                lhs = _.difference(lhs, lhsClosure);
                fds[j] = new Fd(lhs,rhs);
             }
        }
    }
    return fds;
}


function step2(fds) {
    for (var i=0;i<fds.length;i++)
    {
        fds = covering(fds[i].lhs, fds);    
    }
	return fds;
}
