// console.log('\u0113') // unicode

const fs = require('fs');

let rawdata = fs.readFileSync('data.json');
let myObj = JSON.parse(rawdata);
// console.log(myObj);
let correctAnswers = 0;
let wrongAnswers = 0;

let questionsToAsk = 10; // variable to see how many questions 
let usedQuestions = []


function guessWord(listNumber) {
    if (usedQuestions.includes(myObj.words[listNumber].id)){
        console.log('used already')
    }

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
          })
        readline.question(`What does this word mean? ${myObj.words[listNumber].latin}: `, (guess) => {
        // console.log(myObj.cars[1].models.includes(name))
        // if (myObj.words[listNumber].english.includes(guess)) {
        if (myObj.words[listNumber].english.toUpperCase() === guess.toUpperCase()) {
            console.log(`Correct, ${myObj.words[listNumber].latin} means ${myObj.words[listNumber].english} and is a ${myObj.words[listNumber].type}`)
            correctAnswers++
            usedQuestions.push(myObj.words[listNumber].id)
            console.log(usedQuestions)
        }
        else {
            console.log(`${guess} is wrong`)
            wrongAnswers++
        }
        readline.close()
        console.log(`you currently have ${correctAnswers} correct answers`)
        console.log(`you currently have ${wrongAnswers} wrong answers`)
        guessWord(getRandomInt(4))
  })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

guessWord(getRandomInt(4))
