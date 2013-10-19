// free for all testing script
var t_fds = []

t_fds[0] = new Fd(["a"], ["b"]);
t_fds[1] = new Fd(["b"], ["c"]);
t_fds[2] = new Fd(["a"], ["c"]);
t_fds[3] = new Fd(["a","d"], ["e"]);
t_fds[4] = new Fd(["a","b"], ["d","f"]);

var res = closure('a', t_fds);
var expected = ['a','b','c','d','e','f'];
console.log('test1: ' + arrayEqual(res, expected));

var res2 = step1(t_fds);
res2 = step2(res2);
console.log('test2: ' + res2);

var res3 = flatten(['a', ['b','c'], ['d', ['e'], 'f']]);
console.log('test3: ' + res3);

var t2_fds = [];
t2_fds[0] = new Fd(['x1','x2'], ['a']);
t2_fds[1] = new Fd(['a','x1'], ['b']);
t2_fds[2] = new Fd(['b','x2'], ['c']);
t2_fds[3] = new Fd(['c'], ['a']);
t2_fds[4] = new Fd(['x1','x2'], ['c','d']);
t2_fds[5] = new Fd(['c','d'], ['x1','x2']);

var res4 = closure(['b','x2'], t2_fds);
console.log('test4: ' + res4);
