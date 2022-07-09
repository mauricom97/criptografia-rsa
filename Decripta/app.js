const fs = require('fs')
const { program } = require('commander')

const decript = async () => {
    try {
        program
        .description('A sample application to parse options')
        .option('-decripta, --decripta <VALUE>', 'Specify a VALUE', 'Foo')
        .option('-publicKey, --publicKey <VALUE>', 'Specify a VALUE', 'Foo')
        .option('-secretKey, --secretKey <VALUE>', 'Specify a VALUE', 'Foo')

        
        program.parse()
        const options = program.opts()

        const publicKey = getPublicKey(options.publicKey)
        const secretKey = getsecretKey(options.secretKey)
        let message = getMessage(options.decripta)
        decifre(message, secretKey, publicKey)

    } catch (error) {
        console.log(error.message)
    }
}
decript()

function getMessage(path){
    return fs.readFileSync(path, 'utf-8')
}

function getPublicKey(path){
    return fs.readFileSync(path, 'utf-8')
}

function getsecretKey(path){
    return fs.readFileSync(path, 'utf-8')
}

function decifre(contentMsgEncript, _secretKey, _publicKey) {
    contentMsg = contentMsgEncript.toString()
    const secretKey = Number(_secretKey)
    const publicKey = Number(_publicKey.substr(0, _publicKey.indexOf('\n')))
    let messageOriginal = ''
    for(let letter of contentMsg){
        letter = Number(letter)
        console.log(letter ** secretKey)
        // let originLetter = (letter ** secretKey) % publicKey
        // messageOriginal += originLetter
    }
    console.log(messageOriginal)
}