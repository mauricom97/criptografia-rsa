const fs = require('fs')
const { program } = require('commander')
const bigInt = require("big-integer");
const TextChunk = require('./TextChunk')
const caracteres = require('./caracteres.json')

const decript = async () => {
    try {
        program
        .description('A sample application to parse options')
        .option('-decripta, --decripta <VALUE>', 'Specify a VALUE', null)
        .option('-secretKey, --secretKey <VALUE>', 'Specify a VALUE', null)

        program.parse()
        const options = program.opts()
        
        if(!options.secretKey)
            throw new Error('Secret key is required')
        
        const secretKey = getsecretKey(options.secretKey)
        let message = getMessage(options.decripta)
        decifre(message, secretKey)

    } catch (error) {
        console.log(error.message)
    }
}
decript()

function getMessage(path){
    return fs.readFileSync(path, 'utf-8')
}

function getsecretKey(path){
    return fs.readFileSync(path, 'utf-8')
}

function decifre(contentMsgEncript, _secretKey) {
    contentMsg = contentMsgEncript.toString()
    let secretKey = (_secretKey).split('\n')
    secretKey[0] = BigInt(secretKey[0])
    secretKey[1] = BigInt(secretKey[1])

    let messageOriginal = ''
    for(let letter of contentMsg){
        let originLetter = (BigInt(letter) ** secretKey[0]) % (secretKey[1])
        messageOriginal += originLetter
    }
    console.log(messageOriginal)
    // let contentText = ''
    // for(let letter of messageOriginal) {
    //     for(let caracter in caracteres) {
    //         if(letter == caracteres[caracter]) {
    //             contentText += caracter
    //         }
    //     }
    // }
}