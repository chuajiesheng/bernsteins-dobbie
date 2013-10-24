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
        var r = new R('R' + i, list[i].lhs, list[i].rhs);
        rels.push(r);
        //print_message('Constructed relation object: ' + r.html());
    }
    console.log(rels);

    // find all attrs
    var att = [];
    var att2 = [];

    if (Array.isArray(rels) && rels.length > 0) {
        att = rels[0].all_attrs();
        print_message('Starting with first relation object: ' + rels[0].html())
    }

    while (!arrayEqual(att, att2)) {
        att2 = att;

        for (var i = 1; i < rels.length; i++) {
            var allAttr = rels[i].all_attrs();
            var intersect = intersection(att, allAttr);
            if (intersect.length > 0) {
                var combine = att.concat(allAttr);
                var unique = _.unique(combine, true);
                att = unique;
                print_message('Intersect with ' + rels[i].html());
                print_message('Result of join is ' + unique);
            }
        }
    }

    att = _.unique(att,true);
    console.log('[reconstruct] all attr: ');
    console.log(att);

    var missing = difference(attributes, att);
    console.log('[reconstruct] missing: ');
    console.log(missing);

    if (missing.length > 0) {
        print_message('Missing attributes is ' + missing);
    } else {
        print_message('There is no missing attribute');
    }

    var found = [];

    // loop for each missing attribute
    for (var i = 0; i < missing.length; i++) {
        console.log('[reconstruct] checking missing attribute in fds, ' + missing[i]);
        var inAnyFd = false;

        // find if the missing belong to any fd
        for (var j = 0; j < fds.length; j++) {
            console.log('[reconstruct] checking fd, ' + fds[j].str());
            // in the lhs?
            var lhs = fds[j].lhs;
            var inLHS = contains([missing[i]], lhs);

            // in the rhs?
            var rhs = fds[j].rhs;
            var inRHS = contains([missing[i]], rhs);

            inAnyFd =  inLHS || inRHS;

            if (inAnyFd) {
                found.push(missing[i]);
                console.log('is in fd: ' + fds[j].str());
                print_message('Found missing attribute, \''
                              + missing[i] + '\'' + ' in ' + fds[j].str());

                var allAttr = lhs.concat(rhs);
                var r = new R('R' + rels.length, lhs, rhs);
                rels.push(r);

                print_message('New relation for missing attribute, ' + r.html());

                // look forward and remove
                console.log('looking forward');
                for (var k = i + 1; k < missing.length; k++) {
                    if (allAttr.indexOf(missing[k]) > -1) {
                        // this attr in the new relation too, therefore remove
                        var removed = missing.splice(k, 1);
                        found.push(removed);
                        print_message('Found ' + removed + ' in the new relation');
                    }
                }
            } else {
                // not in this fd
            }
        }
    }

    missing = difference(missing, found);
    found = [];

    // search in mvd
    for (var i = 0; i < missing.length; i++) {
        console.log('[reconstruct] checking missing attribute in mvds, ' + missing[i]);
        var inAnyMvd = false;

        for (var j = 0; j < mvds.length; j++) {
            console.log('[reconstruct] checking mvd, ' + mvds[j].str());
            // in the lhs?
            var lhs = mvds[j].lhs;
            var inLHS = contains([missing[i]], lhs);

            // in the rhs?
            var rhs = mvds[j].rhs;
            var inRHS = contains([missing[i]], rhs);

            inAnyMvd =  inLHS || inRHS;

            if (inAnyMvd) {
                found.push(missing[i]);
                console.log('is in mvd: ' + mvds[j].str());
                print_message('Found missing attribute, \''
                              + missing[i] + '\'' + ' in ' + mvds[j].str());

                var allAttr = lhs.concat(rhs);
                var r = new R('R' + rels.length, lhs.concat(rhs), []);
                rels.push(r);

                print_message('New relation for missing attribute, ' + r.html());

                // look forward and remove
                console.log('looking forward');
                for (var k = i + 1; k < missing.length; k++) {
                    if (allAttr.indexOf(missing[k]) > -1) {
                        // this attr in the new relation too, therefore remove
                        var removed = missing.splice(k, 1);
                        found.push(removed);
                        print_message('Found ' + removed + ' in the new relation');
                    }
                }
            } else {
                // not in this mvd
            }
        }

    }

    missing = difference(missing, found);
    if (missing.length > 0) {
        // these attr still missing
        print_message('Unable to find any intersection with these attributes: ' + missing);
    }

    res = '';
    for (var i = 0; i < rels.length; i++) {
        res += rels[i].html() + ' ';
    }
    print_message('Result: ' + res);

    return missing;
}
