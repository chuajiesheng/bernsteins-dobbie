// free for all testing script
var t_fds = []

t_fds[0] = new Fd(["a"], ["b"]);
t_fds[1] = new Fd(["b"], ["c"]);
t_fds[2] = new Fd(["a"], ["c"]);
t_fds[3] = new Fd(["a","d"], ["e"]);
t_fds[4] = new Fd(["a","b"], ["d","f"]);

var res = closure('a', t_fds)
console.log(res);
