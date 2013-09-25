var Fd = function (lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
    this.str = function () {
        var fd = '';

        for (i = 0; i < lhs.length; i++) {
            fd += lhs[i] + ' ';
        }
        fd += '&rarr; '
        for (i = 0; i < rhs.length; i++) {
            fd += rhs[i] + ' ';
        }
        return fd;
    }
}
Fd.prototype = new Fd();

// TODO: support independent of '|'
var Mvd = function (lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
    this.str = function () {
        var fd = '';

        for (i = 0; i < lhs.length; i++) {
            fd += lhs[i] + ' ';
        }
        fd += '&rarr; '
        for (i = 0; i < rhs.length; i++) {
            fd += rhs[i] + ' ';
        }
        return fd;
    }
}
Mvd.prototype = new Mvd();
