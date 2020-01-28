const fs = require('fs')


//readFile is a function who return a promise
const getFile = file => new Promise((resolve, reject) => {
  fs.readFile(file, (err, contents) => {
    if(err) {
      reject(err)
    } else {
      resolve(contents)
    }
  })
})

//code grows vercticaly, better for maintence and legibility
const prom = getFile('./int1.txt')
  .then(contents => {
    console.log(String(contents))
    return getFile('./int2.txt')
  })
  .then(contents => {
    console.log(String(contents))
    return getFile('./int3.txt')
  })
  .then(contents => {
    console.log(String(contents))
  })

  const init = async() => {
    try {
      const contents = await getFile('int1.txt')
      const contents2 = await getFile('int2.txt')
      const contents3 = await getFile('int3.txt')
      return String(contents) + String(contents2)
    }
    catch (err) {
      console.log(err)
    }
  }

  init().then(contents => console.log(contents))


  console.log('execute first')

