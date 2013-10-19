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
