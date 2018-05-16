let add = function (a ,b){
    return a + b
}

let dosome = function (callingadd = function(x,y){return x*y}) {
    return callingadd(1,2)
}

console.log(dosome())