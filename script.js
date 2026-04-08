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

const hangmanImg = document.querySelector(".hangman-box img");

function setDifficulty(level) {
  attempts = level;
  startGame();
}


function startGame() {
  secretWord = getRandomWord();

  guessedLetters = [];
  wrongGuesses = [];

  attempts = 6;

  updateAttemptsDisplay();

  displayWord();

  document.getElementById("wrong-letters").textContent = "";

   if (hangmanImg) {
    hangmanImg.src = "1.png";
  }
}

function decreaseAttempts() {
  attempts--;
  updateAttemptsDisplay();
  if (hangmanImg) {
    hangmanImg.src = `${8 - attempts}.png`;
  }
}
/* the seven is the total amount of pics i had including the base img in the ${7 - attempts}*/


function pressLetter(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
  }

  if (!secretWord.includes(letter) && !wrongGuesses.includes(letter)) {
    wrongGuesses.push(letter);
    decreaseAttempts();
     document.getElementById("wrong-letters").textContent =
      wrongGuesses.join(" ");
  }
  displayWord();

  const winCondition = secretWord.split("").every(letter =>
    guessedLetters.includes(letter)
  );

  const loseCondition = attempts <= 0;

  if (winCondition) {
    gameOver(true);
  } else if (loseCondition) {
    gameOver(false);
  }
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