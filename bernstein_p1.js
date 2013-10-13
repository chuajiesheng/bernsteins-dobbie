function removeSame(a, b) {
    
    var res = [];
    var diff = [];
    diff = _.without(b, a);
    if (diff != null){
        b = _.difference(b, a);
    } else {
        b = b
    }
    return b; 
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
            rhs = removeSame(res, rhs);
            fds[i].rhs = rhs;
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
    //loop to get all closure
    while (!arrayEqual(res, res2)) {
        res = res2;
       res2 = cover(res, fds);
    }
    return res2;
}


/*****************************************************/
/*
var fds = [];
fds[0] = new Fd(["a"], ["b"]);
fds[1] = new Fd(["b"], ["c"]);
fds[2] = new Fd(["a"], ["c"]);
fds[3] = new Fd(["a","d"], ["e"]);
fds[4] = new Fd(["a","b"], ["d","f"]);
*/
var fds = [];
fds[0] = new Fd(["a"], ["b"]);
fds[1] = new Fd(["b"], ["c"]);
fds[2] = new Fd(["a"], ["c"]);
fds[3] = new Fd(["a","b"], ["d","f"]);
fds[4] = new Fd(["a","d"], ["e"]);

function step1(fds) {
//step 1
    for (var i=0;i<fds.length;i++)
    {
        var clos = closure(fds[i].lhs, fds);
        clos = _.difference(clos, fds[i].lhs);
        for (var j=0;j<fds.length;j++)
        {
             if(contains(fds[i].lhs, fds[j].lhs)){
                fds[j].lhs = _.difference(fds[j].lhs, clos);
             }
        }
    }
}


function step2(fds) {
    for (var i=0;i<fds.length;i++)
    {
        fds = covering(fds[i].lhs, fds);    
    }
}

step1(fds);
step2(fds);

//check printing
for (var j=0;j<fds.length;j++)
{
    console.log(fds[j].lhs + " then "+ fds[j].rhs);      
}