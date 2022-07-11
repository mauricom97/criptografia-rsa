const fs = require('fs')
const { program } = require('commander')
const caracteres = require('./caracteres.json')
const TextChunk = require('../Decripta/TextChunk')


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
  let numbersPrimes = [10000000121, 10000000141]
  return numbersPrimes
}

function encode(content, primePhi, publicKey) {
  let contentCripto = ''
  for (let letter of content) {
    for (let caracter in caracteres) {
      if (letter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "") === caracter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) {
        contentCripto += (BigInt(caracteres[caracter]) ** BigInt(primePhi)) % (BigInt(publicKey))
        break
      }
    }
  }

  let newMessage = ''
  let aux = ''
  for (let i = 0; i < contentCripto.length; i++) {
    aux += contentCripto[i]
    if (aux.length === 20) {
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