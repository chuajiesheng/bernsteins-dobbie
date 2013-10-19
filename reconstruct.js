function flatten(a) {
    if (!Array.isArray(a)) {
        return a;
    } else {
        var list = [];
        for (var i = 0; i < a.length; i++) {
            var flat = flatten(a[i]);
            if (Array.isArray(flat)) {
                list = list.concat(flat)
            } else {
                list.push(flat);
            }
        }
        return list;
    }
}

function difference(big, small) {
    // subtract small from big
    // example: _.difference([1, 2, 3, 4, 5], [5, 2, 10]) => [1, 3, 4]
    return _.difference(big, small);
}

function intersection(a1, a2) {
    // find intersection
    // _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]) => [1, 2]
    return _.intersection(a1, a2);
}

function reconstruct(groupfds) {
    console.log('[reconstruct] groupfds: ');
    console.log(groupfds);

    // flatten
    var list = flatten(groupfds);
    console.log('[reconstruct] flatten list: ');
    console.log(list);

    // generate relations
    var rels = [];
    for (var i = 0; i < list.length; i++) {
        var allAttr = list[i].lhs.concat(list[i].rhs);
        var r = new R('R' + i, allAttr);
        rels.push(r);
    }
    console.log(rels);

    // find all attrs

}
