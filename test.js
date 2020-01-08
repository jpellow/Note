function test(){
    var arr = [{test1:"1",test2:"2"},{test3:"3",test4:"4"}]
    arr[1].test5 = "5";

    console.log(arr[1]);
}

test();