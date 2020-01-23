const fs = require('fs')

//assincronus, execute last (callbacks, promisse, async/await)

fs.readFile('./int1.txt', (err, contents) => {
    //wait for fs read the file 'int1.txt'/'int2.txt...' then return the callback (errN, contentsN) => {...}
    fs.readFile('./int2.txt', (err2, contents2) => {
        fs.readFile('./int3.txt', (err3, contents3) => { //rising horizontaly, hadouken code >>> bad chain 
            console.log(err, String(contents))
            console.log(err2, String(contents2))
            console.log(err3, String(contents3))
            console.log("Hadouken code, bad practice")
        })
    })
})

//execute first
console.log(1)

console.log(2)

console.log(3)

