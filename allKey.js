//a to be LHS and b as relation and c as closure
function addInLhs(a, b,closure) {
    var flag=0;

    for ( var i =0; i< b.length;i++){
        for (var j=0; j<closure.length;j++){
            if (b[i] == closure[j]){
                flag=1
                break;
            }
        }

        if (flag==0){
            a.push(b[i]);
        }
        flag=0;
    }
    return a;
}

function removeDuplicateKey(a) {
    var sorted=a;
    var sorted = a.sort();

    if (sorted.length > 0) {
        var previous = sorted[0];

        for (var i = 1; true;) {
            if (i < sorted.length) {
                var temp=sorted[i];
                if (isSubset(temp[0],previous[0]) ){
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
    return sorted;
}

function isSubset(a, b)
{
    var temp=[];
    if( a.length < b.length)
    {
        temp=a;
        a=b;
        b=temp;

    }
    var i = 0;
    var j = 0;
    for (i=0; i<b.length; i++)
    {
        for (j = 0; j<a.length; j++)
        {
           if(b[i] == a[j])
              break;
        }

        /* If the above inner loop was not broken at all then
           arr2[i] is not present in arr1[] */
        if (j == a.length)
           return false;
    }

    /* If we reach here then all elements of arr2[]
      are present in arr1[] */
    return true;
}

// check if elements LHS[] is in b[] closure
// check if elements LHS[] is in b[] closure
function containsInClosure(a, b) {
    var res = true;

    if (b.length == 0)
    {
        res=false;
    }
    for (var j = 0; j < a.length; j++){
        for (var i = 0; i < b.length; i++) {
            if (b[i].indexOf(a[j]) > -1) {
                // b contains a
                res = true;
                break;
            } else {
                // b don't have a
                res = false;
            }
            if ( res= false){
                break;
            }
        }
    }
    return res;
}

function step7(fds) {
    console.log("Find All key for relation");

    var fdsNew = fds;
    var lhs = [];
    var rhs = [];
    var keyno=1;
    var mvdsNew=mvds;

    for (var p = 0; p < mvdsNew.length; p++) {
        fdsNew.push(mvdsNew[p]);
    }

    var attributesgroup = attributes;
    var tempLhs = [];
    var tempResult = "";
    var tempRhs = [];
    var result = [];
    var closure = [];
    var tempClosure = [];

    for (var i = 0 ;i< fdsNew.length; i++) {
        for( var j=i; j< fdsNew.length; j++){

            lhs = fds[j].lhs;
            rhs = fds[j].rhs;

            if (containsInClosure(lhs,closure)) {
                tempClosure = uniqueAdd(rhs, closure);
                closure = tempClosure;
                if (arrayEqual(closure,attributesgroup)) {
                    break;
                }
            }
            else {
                tempLhs = uniqueAdd(lhs,tempLhs);
                closure = uniqueAdd(rhs, closure);
                closure = uniqueAdd(lhs,closure);
                if (arrayEqual(closure,attributesgroup)) {
                    break;
                }
            }
        }

        if (arrayEqual(closure,attributesgroup)) {
            closure = closure;
        } else {
            for(var j = 0; j < i; j++){
                lhs = fds[j].lhs;
                rhs = fds[j].rhs;
                if (containsInClosure(lhs,closure)) {
                    tempClosure = uniqueAdd(rhs, closure);
                    closure = tempClosure;
                    if (arrayEqual(closure,attributesgroup)) {
                        break;
                    }
                }
                else
                {
                    tempLhs = uniqueAdd(lhs,tempLhs);
                    closure = uniqueAdd(rhs, closure);
                    closure = uniqueAdd(lhs,closure);
                    if (arrayEqual(closure,attributesgroup)) {
                        break;
                    }
                }
            }
        }

        if (arrayEqual(closure,attributesgroup)) {
            closure = closure;

        } else {
            tempLhs = addInLhs(tempLhs,attributesgroup,closure);
            closure = uniqueAdd(tempLhs,closure);
        }

        if (arrayEqual(closure,attributesgroup)) {
            result.push(tempLhs);
        }

        keyResult.push(result);
        tempLhs = [];
        closure = [];
        result = [];

    }
    keyResult = removeDuplicateKey(keyResult);

    for (var k = 0; k < keyResult.length; k++)
    {
        var tempKeyResult = "";

        for( var l = 0; l < keyResult[k].length; l++)
        {
            tempKeyResult += keyResult[k][l];
        }

        console.log("Key " + (k+1) + ": " + tempKeyResult);
        print_message("Key " + (k+1) + ": " + tempKeyResult);
        tempKeyResult = "";
    }
    return groupfds;
}



function step8(fds) {
    console.log("Missing Key");
    var step8Fds = groupfds;
    var lhs = [];
    var rhs = [];
    var lhsKey = [];
    var closureRelation = [];
    var tempLhsKey = [];
    var tempKey = [];
    var temp = [];
    var tempFinalKey = [];
    var tempKR = [];
    var temptemp = [];
    var finalKey = [];

    for (var i = 0; i < step6JIndex; i++){
        lhs = step8Fds[i];
        rhs = step8Fds[i];

        if (step8Fds[i].length !=0) {
            lhs = lhs[0].lhs;
            rhs = rhs[0].rhs;
            if (containsInClosure(lhs,closureRelation)) {
                closureRelation = uniqueAdd(rhs, closureRelation);
            } else {
                lhsKey = uniqueAdd(lhs,lhsKey);
                closureRelation = uniqueAdd(rhs, closureRelation);
                closureRelation = uniqueAdd(lhs,closureRelation);
            }
        }
    }

    for (var i = step6JIndex; i < step8Fds.length; i++) {
        lhs = step8Fds[i];
        rhs = step8Fds[i];

        if (step8Fds[i].length != 0) {
            lhs = lhs[0].lhs;
            rhs = rhs[0].rhs;
            if( containsInClosure(lhs,closureRelation)) {
                closureRelation = uniqueAdd(rhs, closureRelation);
            } else {
                for(var k = 0; k < lhs.length; k++) {
                    tempLhsKey = uniqueAdd(lhs[k],lhsKey);
                    finalKey.push(tempLhsKey);
                    closureRelation = uniqueAdd(rhs, closureRelation);
                    closureRelation = uniqueAdd(lhs[k],closureRelation);
                }
            }
        }
        flatten(keyResult);
    }

    for (var j = 0; j < finalKey.length; j++){
        for (var i = 0; i < keyResult.length; i++){
            tempKR = keyResult[i];

            if (isSubset(finalKey[j],tempKR[0])) {
                tempKey = difference(tempKR[0], finalKey[j]);
            }

            if (tempKey.length!=0) {
                j = 0;
                for(var l = 0; l < keyResult.length; l++) {
                    temp = keyResult[l];
                    temptemp = temp[0];
                    for(var o = 0; o < temptemp.length; o++) {
                        var p = temptemp[o].indexOf(tempKey);
                        if (p != -1) {
                            temp[0].splice(o, 1);
                        }
                    }
                }
                tempKey.length = 0;
            }
        }
    }

    for (var j = 0; j < finalKey.length; j++) {
        for (var i =0; i < keyResult.length; i++) {
            tempKR = keyResult[i];

            if (arrayEqual(tempKR[0],finalKey[j])) {
                keyResult.splice(i,1);
                i = 0;
            }
        }
    }
    for (var j = 0;j < keyResult.length; j++) {
        print_message("Possible Missing Key : "+ keyResult[j]);
    }

    return groupfds;
}
