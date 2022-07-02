const fs = require('fs')
const { program } = require('commander')

try {

  program
    .description('A sample application to parse options')
    .option('-encripta, --encripta <VALUE>', 'Specify a VALUE', 'Foo')

  program.parse()
  const options = program.opts()


  let contentText = getContentFile(options.encripta)

  const numbersPrime = getNumbersPrime()
  
  const secretKey = numbersPrime[0] * numbersPrime[1]
  const z = (numbersPrime[0] - 1) * (numbersPrime[1] - 1)

  setCripto(options.encripta, 'contentText')

} catch (error) {
  console.log(error)
}


function getContentFile(path) {
  return fs.readFileSync(path, 'utf-8')
}

function setCripto(path, content) {
  fs.writeFile(path, content, function (erro) {
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
  for(let number of numbers){
    number = number.replace(/[^0-9]/g,'');
    number = parseInt(number)
    numbersPrimes.push(number)
  }
  numbers = new Array()
  for(let i = 0; i < 2; i++){
    numbers.push(numbersPrimes[Math.floor(Math.random() * numbersPrimes.length)])
  }
  return numbers
}
