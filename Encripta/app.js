const fs = require('fs')
const { program } = require('commander')
const caracteres = require('./caracteres.json')
const encript = async () => {
  try {
    
    program
    .description('A sample application to parse options')
    .option('-encripta, --encripta <VALUE>', 'Specify a VALUE', 'Foo')
    
    program.parse()
    const options = program.opts()
    
    
    let contentText = getContentFile(options.encripta)
    
    const numbersPrime = getNumbersPrime()
    
    let publicKey = numbersPrime[0] * numbersPrime[1]
    let phiPublicKey = (numbersPrime[0] - 1) * (numbersPrime[1] - 1)
    let primeBetweenOneAndPhi = await isPrimePhiPublicKey(phiPublicKey) //e
    createFilePublicsKeys('./files/publicKey.txt', publicKey, primeBetweenOneAndPhi)
    let secretKey = (2 * phiPublicKey) + (1 / primeBetweenOneAndPhi)

    createFileSercretKey('./files/secretKey.txt', secretKey)
    const contentBase64 = to64(contentText)
    let contentCripto = encode(contentBase64, primeBetweenOneAndPhi, publicKey)

    setCripto(options.encripta, contentCripto)

  } catch (error) {
    console.log(error)
  }
}
encript()

function getContentFile(path) {
  return fs.readFileSync(path, 'utf-8')
}

function setCripto(path, content) {
  fs.writeFile(path, content.toString(), function (erro) {
    if (erro) {
      throw erro;
    }
    console.log("Arquivo criptografado com sucesso!")
  })
}

function getNumbersPrime() {
  let numbersPrimes = fs.readFileSync('./primeList.txt', 'utf-8')
  numbers = numbersPrimes.split('\n')
  numbersPrimes = new Array()
  for (let number of numbers) {
    number = number.replace(/[^0-9]/g, '');
    number = parseInt(number)
    numbersPrimes.push(number)
  }
  numbers = new Array()
  for (let i = 0; i < 2; i++) {
    numbers.push(numbersPrimes[Math.floor(Math.random() * numbersPrimes.length)])
  }
  return numbers
}

function encode(content, primePhi, publicKey) {
  let contentCripto = ''
  for(let letter of content){
    for(let caracter in caracteres){
      if(letter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") === caracter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")){
        contentCripto += (caracteres[caracter] ** primePhi) % (publicKey)
        break
      }
    }
  }
  
  let newMessage = ''
  let aux = ''
  for(let i = 0; i < contentCripto.length; i++){
    aux += contentCripto[i]
    if(aux.length === 20){
      newMessage += `${aux}\n`
      aux = ''
    }
  }

  return newMessage
}

function to64(contentText) {
  let content = btoa(contentText)
  return content
}

async function isPrimePhiPublicKey(key) {
  return 2
}

function createFilePublicsKeys(path, key1, key2) {
  const publicKey = `${key1}\n${key2}`
  fs.writeFile(path, publicKey.toString(), function (erro) {
    if (erro) {
      throw erro;
    }
  })
}

function createFileSercretKey(path, key) {
  fs.writeFile(path, key.toString(), function (erro) {
    if (erro) {
      throw erro;
    }
  })
}