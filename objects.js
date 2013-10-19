var Fd = function (lhs, rhs) {
    this.lhs = lhs;
    this.rhs = rhs;
    this.str = function () {
        var fd = '';

        for (i = 0; i < lhs.length; i++) {
            fd += lhs[i] + ' ';
        }
        fd += String.fromCharCode(8594) + ' ';
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
        fd += String.fromCharCode(8608) + ' ';
        for (i = 0; i < rhs.length; i++) {
            fd += rhs[i] + ' ';
        }
        return fd;
    }
}
Mvd.prototype = new Mvd();

var R = function (name, attr) {
    this.name = name;
    this.attr = attr;
    this.str = function () {
        var s = name;

        if (attr.length == 0) {
            s += '()';
        } else {
            s += '(';
            for (i = 0; i < attr.length; i++) {
                s+= attr[i];
                if (i < (attr.length - 1)) {
                    s+= ', ';
                }
            }
            s += ')';
        }
        return s;
    }
}
R.prototype = new R();
