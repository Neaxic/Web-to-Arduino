let name = "Andreas"
const age = 19

for (let i = 0; i < 5; i++) {
    console.log(name+" "+ age)
}

function sayName(n){
    console.log(n)
}

sayName("Andre")

const sayName2 = function(a){
    console.log(a)
}

sayName2("Lort")

const myAdd = (x) => x + 2
const result = myAdd(31)
console.log(result)