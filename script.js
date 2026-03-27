const wordBankEasy = ['nike', 'Adidas', 'Gap', 'Puma', 'Zara', 'H&M', 'Crocs', 'Vans', 'Uniqlo', 'Levis'];
const wordBankMedium = ['Converse', 'Lululemon', 'Abercrombie', 'Hollister', 'Urban-Outfitters', 'Champion', 'Patagonia', 'North-Face', 'Calvin-Klein', 'Tommy-Hilfiger'];
const wordBankHard = ['balenciaga', 'Givenchy', 'Bottega-Veneta', 'Comme-des-Garçons', 'Maison-Margiela', 'Yves-Saint-Laurent', 'Christian-Louboutin', 'Alexander-McQueen', 'Salvatore-Ferragamo', 'Dolce-&-Gabbana'];

const wordBank = [];
let guessedLetters = [];
let secretWord = "";
let attempts = 6;

document.addEventListener("DOMContentLoaded", function () {
  startGame();

  document.getElementById('guess-btn').addEventListener('click', handleGuess);

  document.getElementById('letter-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      handleGuess();
    }
  });

  document.getElementById('reset-btn').addEventListener('click', function () {
    startGame();
  });
});

function resetGame() {
  guessedLetters = [];
  attempts = 6;
  document.getElementById('attempts').textContent = attempts;
}

function startGame() {


  resetGame();
  displayGame();

  document.getElementById('easy-btn').onclick = function () {
    let randomIndex = Math.floor(Math.random() * wordBankEasy.length);
     secretWord = wordBankEasy[randomIndex].toUpperCase();
    console.log(secretWord);
    resetGame();
    displayGame();
  };

  document.getElementById('medium-btn').onclick = function () {
    let randomIndex = Math.floor(Math.random() * wordBankMedium.length);
    secretWord = wordBankMedium[randomIndex].toUpperCase();
    console.log(secretWord);
    resetGame();
    displayGame();
  };

  document.getElementById('hard-btn').onclick = function () {
    let randomIndex = Math.floor(Math.random() * wordBankHard.length);
    secretWord = wordBankHard[randomIndex].toUpperCase();
    console.log(secretWord);
    resetGame();
    displayGame();
  };
}

function displayGame() {
  let display = "";

  for (let i = 0; i < secretWord.length; i++) {
    let letter = secretWord.charAt(i);

    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }

  document.getElementById('word-display').textContent = display;
  document.getElementById('guessed-letters').textContent = guessedLetters.join(" ");
}

function handleGuess() {
  let input = document.getElementById('letter-input').value.toUpperCase();
  document.getElementById('letter-input').value = '';

  if (!input) return;

  if (guessedLetters.includes(input)) {
    document.getElementById('message').textContent = "You've already used that letter!";
    return;
  }

  guessedLetters.push(input);

  if (!secretWord.includes(input)) {
    attempts--;
    document.getElementById('attempts').textContent = attempts;
  }

  displayGame();
}