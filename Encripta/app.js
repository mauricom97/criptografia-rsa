const fs = require('fs')
const { program } = require('commander')
const JSBI = require('jsbi')
const TextChunk = require('../Encripta/TextChunk')

const originalChunk = new TextChunk('ab')
// console.log(originalChunk.bigIntValue)
// console.log(new TextChunk().bigIntToText(BigInt(originalChunk.bigIntValue)))


const encript = async () => {
  try {

    program
      .description('A sample application to parse options')
      .option('-encripta, --encripta <VALUE>', 'Specify a VALUE', 'Foo')

    program.parse()
    const options = program.opts()


    let contentText = getContentFile(options.encripta)
    
    const numbersPrime = getNumbersPrime()
    
    let firstPublicKey = BigInt(numbersPrime[0]) * BigInt(numbersPrime[1])
    let phiFirstPublicKey = (BigInt(numbersPrime[0]) - BigInt(1)) * (BigInt(numbersPrime[1]) - BigInt(1))
    let secondPublicKey = BigInt(await getSecondPublicKey(phiFirstPublicKey))

    createFilePublicsKeys('./files/publicKey.txt', firstPublicKey, secondPublicKey)
    let secretKey = (BigInt(2) * BigInt(phiFirstPublicKey) + BigInt(1)) / BigInt(secondPublicKey)

    createFileSercretKey('./files/secretKey.txt', secretKey, firstPublicKey)
    const contentBase64 = to64(contentText)
    let contentCripto = encode(contentBase64, secondPublicKey, firstPublicKey)

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
  numbersPrimes = numbersPrimes.split('\n')
  let numbers = new Array()
  for(let i = 0; i < 2; i++) {
    numbers.push(numbersPrimes[Math.floor(Math.random() * numbersPrimes.length)])
  }
  numbersPrimes = new Array()
  for(let number of numbers) {
    number = number.replace(/\D/g, "")
    numbersPrimes.push(BigInt(number))
  }
  return numbersPrimes
}

function encode(content, primePhi, publicKey) {
  let contentCripto = ''
  let partString = ''
  for (let letter of content) {
    if(partString.length < 4) {
      partString += letter
    } else {
      partString = new TextChunk(partString).bigIntValue
      partString = (partString ** primePhi) % publicKey
      contentCripto += partString
    }
  }
  return contentCripto
}

function to64(contentText) {
  let content = btoa(contentText)
  return content
}

async function getSecondPublicKey() {
  return 17
}

function createFilePublicsKeys(path, key1, key2) {
  const publicKey = `${key1}\n${key2}`
  fs.writeFile(path, publicKey.toString(), function (erro) {
    if (erro) {
      throw erro;
    }
  })
}

function createFileSercretKey(path, secretKey, publicKey) {
  const secretKeyFile = `${secretKey}\n${publicKey}`
  fs.writeFile(path, secretKeyFile, function (erro) {
    if (erro) {
      throw erro;
    }
  })
}