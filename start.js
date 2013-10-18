$('#startBernstein').on('click', function () {
    console.log('start bernstein algorithm');

    // start bernstein algorithm here
    // step 1
    // pass in fds, return fds
function step1(fds) {
    for (var i=0;i<fds.length;i++)
    {
        //get closure for attributes on LHS
        //then exclude LHS attributes from the closure
        var lhsClosure = closure(fds[i].lhs, fds);
        lhsClosure = _.difference(lhsClosure, fds[i].lhs);
      
        for (var j=0;j<fds.length;j++)
        {
            //remove redundant attributes from LHS
             if(contains(fds[i].lhs, fds[j].lhs)){
                fds[j].lhs = _.difference(fds[j].lhs, lhsClosure);
             }
        }
    }
	return fds;
}
    
    // step 2
    // pass in fds, return fds
function step2(fds) {
    for (var i=0;i<fds.length;i++)
    {
        fds = covering(fds[i].lhs, fds);    
    }
	return fds;
}
    // step 3

    // step 4

    // step 5

    // step 6
});
