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

var R = function (name, key, attr) {
    this.name = name;
    key = _.unique(key, true);
    this.key = key;
    attr = _.unique(attr, true);
    this.attr = attr

    this.html = function () {
        var s = name;

        if (key.length == 0 && attr.length == 0) {
            s += '()';
        } else {
            s += '(';
            s += '<u>';
            for (i = 0; i < key.length; i++) {
                s += key[i];
                if (i < (key.length - 1)) {
                    s += ', ';
                }
            }
            s += '</u>';
            s += ', ';
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
    this.str = function () {
        var s = name;

        if (key.length == 0 && attr.length == 0) {
            s += '()';
        } else {
            s += '(';
            for (i = 0; i < key.length; i++) {
                s += key[i];
                if (i < (key.length - 1)) {
                    s+= ', ';
                }
            }
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
