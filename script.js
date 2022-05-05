const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const btn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
const selectedWord = getRandomWord();


window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
        }
    }
})

btn.addEventListener('click', function() {
    window.location.reload();
})
displayWord();

function getRandomWord() {
    const words = ["javascript", "java", "python"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ""} 
            </div>
        `).join('')}
    `;

    const w = wordEl.innerText.replace(/\n/g, "");
    if (w === selectedWord) {
        popup.style.display = 'flex';
        document.querySelector('.popup').style.backgroundColor = 'green';
        messageEl.innerText = "You Win!"
    }
}

function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Wrong Letters</h3>' : ''}
        ${wrongLetters.map(letter => `<span> ${letter} </span>`)}
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        document.querySelector('.popup').style.backgroundColor = 'red';
        messageEl.innerText = "You Lost!"
    }
}