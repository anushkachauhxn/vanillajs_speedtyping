const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const winningMsgElement = document.getElementById('winningMsg')
const restartButton = document.getElementById('restartButton')
const timeTakenElement = document.getElementById('timeTaken')
const charTypedElement = document.getElementById('charTyped')
const wordsPerMinElement = document.getElementById('wordsPerMin')

let startTime
var myTimer

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
}

async function renderNewQuote() {
    /* In case of Restart */
    removeConfetti()
    winningMsgElement.classList.remove('show')

    const data = await getRandomQuote()

    const quote = data.content
    /* Displaying each character in a span element inside quoteDisplayElement */
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quoteDisplayElement.appendChild(charSpan)
    });

    /* Clearing the input element when a new quote is displayed */
    quoteInputElement.value = null

    /* Adding length data for the winning message */
    const length = data.length
    charTypedElement.innerText = length

    startTimer()
}

restartButton.addEventListener('click', renderNewQuote)

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayInput = quoteInputElement.value.split('')

    let correct = true  /* This variable is true if *all* characters have been typed *correctly* */

    /* Comparing each character of the displayed quote with the input */
    arrayQuote.forEach((charSpan, index) => {
        const charInput = arrayInput[index]
        if (charInput == null) {
            /* If the character hasn't been typed yet */
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct = false
        } else if (charInput === charSpan.innerText) {
            /* If the typed character matches */
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        } else {
            /* If the typed character doesn't match */
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
            correct = false
        }
    })

    if (correct) endGame() /* In case everything has been typed correctly, call endGame function */
})

function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    myTimer = setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    /* setInterval is not accurate; so we use startTime and Math.floor() */
    return Math.floor((new Date() - startTime) / 1000)
}

function stopTimer(myTimer) {
    clearInterval(myTimer);
}

function endGame() {
    stopTimer(myTimer)
    winningMsgElement.classList.add('show')
    startConfetti()

    /* Adding time data for the winning message */
    timeTakenElement.innerText = timerElement.innerText
    wordsPerMinElement.innerText = Math.floor(Number(charTypedElement.innerText) / Number(timeTakenElement.innerText))
}

renderNewQuote()