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

function arrToStr(arr) {
    var s = '';

    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            s += arr[i];
            if (i < (arr.length - 1)) {
                s += ', ';
            }
        }
    }

    return s;
}

var R = function (name, key, attr) {
    this.name = name;
    this.key = key;
    attr = _.unique(attr, true);
    this.attr = attr

    this.all_attrs = function () {
        var all = [];

        var isArrayOfArray = false;
        for (var i = 0; i < key.length; i++) {
            if (Array.isArray(key[i])) {
                isArrayOfArray = true;
            }
        }

        if (isArrayOfArray) {
            for (var i = 0; i < key.length; i++) {
                all = all.concat(key[i]);
            }
        } else {
            all = all.concat(key);
        }

        all = all.concat(attr);

        return all;
    }
    this.html = function () {
        var s = name;

        if (key.length == 0 && attr.length == 0) {
            s += '()';
        } else {
            s += '(';

            var isArrayOfArray = false;
            for (var i = 0; i < key.length; i++) {
                if (Array.isArray(key[i])) {
                    isArrayOfArray = true;
                }
            }

            if (isArrayOfArray) {
                for (var i = 0; i < key.length; i++) {
                    s += '<u>' + arrToStr(key[i]) + '</u>';
                    if (i < key.length - 1) {
                        s += ', ';
                    }
                }
            } else {
                s += '<u>' + arrToStr(key) + '</u>';
            }

            if (attr.length > 0) {
                s += ', ';
                s += arrToStr(attr);
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

            var isArrayOfArray = false;
            for (var i = 0; i < key.length; i++) {
                if (Array.isArray(key[i])) {
                    isArrayOfArray = true;
                }
            }

            if (isArrayOfArray) {
                for (var i = 0; i < key.length; i++) {
                    s += arrToStr(key[i]);
                    if (i < key.length - 1) {
                        s += ', ';
                    }
                }
            } else {
                s += arrToStr(key);
            }

            if (attr.length > 0) {
                s += ', ';
                s += arrToStr(attr);
            }

            s += ')';
        }
        return s;
    }
}
R.prototype = new R();
