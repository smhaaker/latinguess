// console.log('\u0113') // unicode

const fs = require('fs');

let rawdata = fs.readFileSync('data/data.json');
let myObj = JSON.parse(rawdata);
// console.log(myObj.level)
// console.log(myObj[1]); // level 1
// console.log(myObj[2]); // level 0
let correctAnswers = 0;
let wrongAnswers = 0;

let questionsToAsk = 10; // variable to see how many questions 
let usedQuestions = []

let levelToPlay = 0
console.log(myObj[levelToPlay].words.length); // 
let levelLength = myObj[levelToPlay].words.length

function guessWord(listNumber, level) {
    if (usedQuestions.includes(myObj[level].words[listNumber].id)){
        console.log('used already')
    }

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
          })
        readline.question(`What does this word mean? ${myObj[level].words[listNumber].latin}: `, (guess) => {
        // console.log(myObj.cars[1].models.includes(name))
        // if (myObj.words[listNumber].english.includes(guess)) {
        if (myObj[level].words[listNumber].english.toUpperCase() === guess.toUpperCase()) {
            console.log(`Correct, ${myObj[level].words[listNumber].latin} means ${myObj[level].words[listNumber].english} and is a ${myObj[level].words[listNumber].type}`)
            correctAnswers++
            usedQuestions.push(myObj[level].words[listNumber].id)
            console.log(usedQuestions)
        }
        else {
            console.log(`${guess} is wrong`)
            wrongAnswers++
        }
        readline.close()
        console.log(`you currently have ${correctAnswers} correct answers`)
        console.log(`you currently have ${wrongAnswers} wrong answers`)
        guessWord(getRandomInt(levelLength), levelToPlay)
  })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

guessWord(getRandomInt(levelLength), levelToPlay)
