const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    /* Displaying each character in a span element inside quoteDisplayElement */
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quoteDisplayElement.appendChild(charSpan)
    });
    /* Clearing the input element when a new quote is displayed */
    quoteInputElement.value = null
}

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayInput = quoteInputElement.value.split('')
    
    /* Comparing each character of the displayed quote with the input */
    arrayQuote.forEach((charSpan, index) => {
        const charInput = arrayInput[index]
        if (charInput == null) {
            /* If the character hasn't been typed yet */
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
        } else if (charInput === charSpan.innerText) {
            /* If the typed character matches */
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        } else {
            /* If the typed character doesn't match */
            charSpan.classList.add('incorrect')
            charSpan.classList.remove('correct')
        }
    })
})

renderNewQuote()