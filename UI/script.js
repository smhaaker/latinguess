let currentWords = []
let usedWords = []
let score = 0
let unusedWords = []


function selectLevel() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest()
    // let level = 0
    let level = document.getElementById('level').value  
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `http://localhost:3000/get_words/${level}`, true)

    request.onload = function() {
        currentWords = []
        // console.log(currentWords)
        let data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
        data.words.forEach(words => {
            // console.log(words)
            currentWords.push(words)
            unusedWords.push(words)
        })
        } else {
        console.log('error')
        }
        options()

        // console.log(currentWords)
    }

    // Send request
    request.send()
    
}

function options() {
    let word = document.getElementById('wordToGuess')
    let options = document.getElementById('options')
    let questionLeft = document.getElementById('questionsLeft')
    let nextButton = document.getElementById('nextButton');
    nextButton.style.display = 'none';
    questionLeft.innerHTML = unusedWords.length
    console.log(unusedWords.length)
    console.log(unusedWords)

    
    if (unusedWords.length <= 0){
        console.log('game over')
        questionLeft.innerHTML = `No more words to guess, total score ${score}`
    }
    else {
        let shuffledOptions = shuffledWords()
        // shuffledOptions.push(shuffleCorrectWord())
        
        let randomNumber = getRandomInt(4)
        word.innerHTML = shuffledOptions[randomNumber].latin
        // correct word ID
        let wordId = shuffledOptions[randomNumber].id 

        // if (usedWords.includes(unusedWords[randomNumber].id)){
        //     console.log('already used')
        //     console.log('word is at array spot:' + unusedWords.indexOf(shuffledOptions[randomNumber]))
        //     console.log(unusedWords[randomNumber].latin)
        //     // usedWords.splice()
        // }
        // else {
        //     console.log('can be used')
        //     console.log('word is at array spot:' + unusedWords.indexOf(shuffledOptions[randomNumber]))
        //     console.log(unusedWords[randomNumber].latin)
        // }

        options.innerHTML = `
            <button class="guesses" id="button1" onclick="guess(this.id, ${wordId}, ${shuffledOptions[0].id})">${shuffledOptions[0].english}</button>
            <button class="guesses" id="button2" onclick="guess(this.id, ${wordId}, ${shuffledOptions[1].id})">${shuffledOptions[1].english}</button><br>
            <button class="guesses" id="button3" onclick="guess(this.id, ${wordId}, ${shuffledOptions[2].id})">${shuffledOptions[2].english}</button>
            <button class="guesses" id="button4" onclick="guess(this.id, ${wordId}, ${shuffledOptions[3].id})">${shuffledOptions[3].english}</button>
            `
        // adds id of correct word to usedWords

        usedWords.push(shuffledOptions[randomNumber])
        unusedWords.splice(unusedWords.indexOf(shuffledOptions[randomNumber]), 1)
        console.log(usedWords)
    }
}

function shuffledWords() {
    // Shuffle array
    const shuffled = currentWords.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    let words = shuffled.slice(0, 4);
    console.log(words)
    return words
}

function shuffleCorrectWord() {
    const shuffled = unusedWords.sort(() => 0.5 - Math.random());
    let words = shuffled.slice(0, 1)
    return words
}


function guess(id, wordId, option){
    // disables all buttons
    let y = document.getElementsByClassName("guesses");
    for (let i = 0; i < y.length; i++) {
        y[i].disabled = true;
    }

    if (wordId === option) {
        // console.log(wordId + " matches: " +  option)
        score++
        let buttonCorrect = document.getElementById(id)
        buttonCorrect.style.backgroundColor = 'green'
        buttonCorrect.style.color = 'white'
    }
    else {
        // console.log('wrong')
        let buttonCorrect = document.getElementById(id)
        buttonCorrect.style.backgroundColor = 'red'
    }

    let nextButton = document.getElementById('nextButton');
    nextButton.style.display = 'block';
    // need to remove correctly guessed word from possiblity of being correct again... 
}

function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}


