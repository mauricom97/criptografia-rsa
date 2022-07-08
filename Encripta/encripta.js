const fs = require('fs')
const { program } = require('commander')
const encript = async () => {
  try {
    
    program
    .description('A sample application to parse options')
    .option('-encripta, --encripta <VALUE>', 'Specify a VALUE', 'Foo')
    
    program.parse()
    const options = program.opts()
    
    
    let contentText = getContentFile(options.encripta)
    console.log(contentText)
    const contentEncoder = encoder(contentText)
    setCripto(options.encripta, contentEncoder)

    
    const numbersPrime = getNumbersPrime()
    
    const publicKey = numbersPrime[0] * numbersPrime[1]
    const phiPublicKey = (numbersPrime[0] - 1) * (numbersPrime[1] - 1)
    let primeBetweenOneAndPhi = await isPrimePhiPublicKey(phiPublicKey)
    createFilePublicsKeys('./files/publicKey.txt', publicKey, primeBetweenOneAndPhi)
    
  } catch (error) {
    console.log(error)
  }
}
encript()

function getContentFile(path) {
  return fs.readFileSync(path, 'utf-8')
}

function setCripto(path, content) {
  console.log(content)
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

function encoder(contentText) {
  let content = btoa(contentText)
  return content
}

async function isPrimePhiPublicKey(key) {
  let prime = getNumbersPrime()
  prime = prime[0]
  while(prime >= key){
    prime = getNumbersPrime()
    prime = prime[0]
  }
  console.log(prime)
  return prime
}

function createFilePublicsKeys(path, key1, key2) {
  const publicKey = `${key1}\n${key2}`
  fs.writeFile(path, publicKey.toString(), function (erro) {
    if (erro) {
      throw erro;
    }
    console.log("Arquivo criptografado com sucesso!")
  })
}