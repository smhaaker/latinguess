let currentWords = []


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
        // console.log(data)
        if (request.status >= 200 && request.status < 400) {
        data.words.forEach(words => {
            // console.log(words)
            currentWords.push(words)
        })
        } else {
        console.log('error')
        }
        guess()

        // console.log(currentWords)
    }

    // Send request
    request.send()
}

function guess() {
    let word = document.getElementById('wordToGuess')
    console.log(currentWords[0].latin)
    word.innerHTML = currentWords[0].latin
}


