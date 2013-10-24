// check if all elements of a is in b
function contains(a, b) {
    var res = true;
    for (var i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) > -1) {
            // b contains a
            res = res && true;
        } else {
            // b don't have a
            res = res && false;
        }
    }
    return res;
}

// add a to b but only unique element
function uniqueAdd(a, b) {
    var res = [];
    for (var i = 0; i < a.length; i++) {
        res.push(a[i]);
    }
    for (var i = 0; i < b.length; i++) {
        res.push(b[i]);
    }

    var sorted = res.sort();

    if (sorted.length > 0) {
        var previous = sorted[0];

        for (var i = 1; true;) {
            if (i < sorted.length) {
                if (sorted[i] == previous) {
                    sorted.splice(i, 1);
                } else {
                    previous = sorted[i];
                    i++;
                }
            } else {
                break;
            }
        }
    }

    return res;
}

// add a to set only if the FD is unique
function uniqueAddDependency(a, set) {
    var exist = false;

    if (Array.isArray(set)) {
        for (var i = 0; i < set.length; i++) {
            if (set[i].str() == a.str()) {
                exist = true;
                break;
            }
        }
    }

    if (!exist) {
        set[set.length] = a;
    }
    return set;
}

function close(att, fds) {
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
            // lhs is in res
            newR = uniqueAdd(res, rhs);
            res = newR;
        }
    }
    return res;
}

function arrayEqual(a, b) {
    var sortedA = a;
    if (Array.isArray(a)) {
        sortedA = a.sort();
    }

    var sortedB = b;
    if (Array.isArray(b)) {
        sortedB = b.sort();
    }


    if (sortedA.length != sortedB.length) {
        return false;
    } else {
        for (var i = 0; i < sortedA.length; i++) {
            if (sortedA[i] != sortedB[i]) {
                return false;
            }
        }
    }
    return true;
}

function dependencyArrayEqual(a, b) {
    sortedA = a.sort();
    sortedB = b.sort();

    if (sortedA.length != sortedB.length) {
        return false;
    } else {
        for (var i = 0; i < sortedA.length; i++) {
            if (sortedA[i].str() != sortedB[i].str()) {
                return false;
            }
        }
    }
    return true;
}

// sample input, att = 'a', fds = fds (in global.js)
function closure(att, fds) {
    var res = close(att, fds);
    var res2 = close(res, fds);
    while (!arrayEqual(res, res2)) {
        res = res2;
        res2 = close(res, fds);
    }
    return res2;
}
