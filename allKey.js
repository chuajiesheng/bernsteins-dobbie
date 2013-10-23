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
     if (b.length ==0)
        {
            res=false;
        }
    for (var j=0;j<a.length;j++){
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

    // check if all elements of a is in b
function contains(a, b) {
    var res = true;
    for (var i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) > -1) {
            // b contains a
            res = true;
        } else {
            // b don't have a
            res = false;
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




function step7(fds) {
    console.log("Find All key for relation");


        var fdsNew = fds;

       var lhs=[];

        var rhs=[];

        var keyno=1;



        var mvdsNew=mvds;

        for (var p=0; p<mvdsNew.length;p++)
        {
            fdsNew.push(mvdsNew[p]);
        }

        var attributesgroup= attributes;

        var tempLhs=[];

        var tempResult="";

        var tempRhs=[];

        var result=[];

        var closure=[];

        var tempClosure=[];

        for ( var i =0 ;i< fdsNew.length; i++){



            for( var j=i; j< fdsNew.length; j++){

            lhs=fds[j].lhs;
             rhs=fds[j].rhs;
            if( containsInClosure(lhs,closure)){
               tempClosure = uniqueAdd(rhs, closure);
               closure=tempClosure;
               if(arrayEqual(closure,attributesgroup)){
                break;
               }

            }
            else
            {
                tempLhs= uniqueAdd(lhs,tempLhs);
                closure = uniqueAdd(rhs, closure);
                closure=uniqueAdd(lhs,closure);
                if(arrayEqual(closure,attributesgroup)){
                break;
               }
            }


            }
             if(arrayEqual(closure,attributesgroup)) {
                closure=closure;

            }
            else{
                for( var j=0; j< i; j++){
                     lhs=fds[j].lhs;
             rhs=fds[j].rhs;
            if( containsInClosure(lhs,closure)){
               tempClosure = uniqueAdd(rhs, closure);
               closure=tempClosure;
               if(arrayEqual(closure,attributesgroup)){
                break;
               }

            }
            else
            {
                tempLhs= uniqueAdd(lhs,tempLhs);
                closure = uniqueAdd(rhs, closure);
                closure=uniqueAdd(lhs,closure);
                if(arrayEqual(closure,attributesgroup)){
                break;
               }
            }


                }

            }


            if(arrayEqual(closure,attributesgroup)) {
                closure=closure;

            }
            else
                {

                        tempLhs=addInLhs(tempLhs,attributesgroup,closure);

                         closure=uniqueAdd(tempLhs,closure);

                 }



            if(arrayEqual(closure,attributesgroup))
            {

                result.push(tempLhs);
            }
      //      for (var k=0;k<result.length;k++)
        //{
         //  tempResult=tempResult + result[k];

        //}
        //console.log("Key" + keyno + " : " + tempResult);

//keyno=keyno+1;
//tempResult="";


            keyResult.push(result);
            tempLhs=[];
            closure=[];
            result=[];

        }

keyResult=removeDuplicateKey(keyResult);


for (var k=0;k<keyResult.length;k++)
{
    var tempKeyResult=[];

    tempKeyResult=keyResult[k];

    tempKeyResult=tempKeyResult[0];

    for( var f=0; j<tempKeyResult.length;j++)
    {
        tempKeyResult=tempKeyResult + tempKeyResult[k];
    }
    console.log("Key" + (k+1) + " : " + tempKeyResult);
    tempKeyResult="";
}






    return result;
}



function step8(fds) {
    console.log("Find All key for relation");

}
