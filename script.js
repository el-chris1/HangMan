 const wordBank = ['Horizon', 'Whisper', 'Lantern', 'Journey', 'Ember', 'Meadow', 'Echo', 'Crystal', 'Summit', 'Orbit'];
let guessedLetters = [];
let secretWord = "";
document.addEventListener("DOMContentLoaded", function () {
 // Any code inside this function will run
 // as soon as the page is fully loaded
 startGame();
 
 // Set up event listeners for the guess button and input
 document.getElementById('guess-btn').addEventListener('click', handleGuess);
 document.getElementById('letter-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
   handleGuess();
  }
 });
});
// This is an example function structure
// You will place your game setup logic inside it
function startGame() {
let randomIndex=  Math.floor(Math.random() * wordBank.length);
secretWord = wordBank[randomIndex];
console.log(secretWord);
displayGame();




 // Example things your game might do here:
 // • pick the random word


 
 // • reset variables
 // • build the starting display
 // • update elements on the page

}
function displayGame() {
    let display = "";   // This variable will hold the string we build for the screen

// Loop through every letter in the secret word
// i starts at 0 because strings use zero-based indexing
// The loop will run once for each character in the word
for (let i = 0; i < secretWord.length; i++) {

 // Get the letter at the current position in the word
 // charAt(i) returns the character located at index i
 let letter = secretWord.charAt(i);

 // Check if this letter exists in the guessedLetters array
 // includes() returns true if the letter exists in the array
 if (guessedLetters.includes(letter)) {

   // If the letter has been guessed,
   // add the letter to the display string
   // A space is added so the letters appear spaced out
   display += letter + " ";

 } else {

   // If the letter has NOT been guessed,
   // add an underscore instead
   display += "_ ";
 }

}

// Update the word display on the page
document.getElementById('word-display').textContent = display;
}

function handleGuess() {
 // Get the input value and convert to uppercase
 let input = document.getElementById('letter-input').value.toUpperCase();
 
 // Clear the input field for the next guess
 document.getElementById('letter-input').value = '';
 
 // Validate that input is a single letter
 if (input.length !== 1 || !/[A-Z]/.test(input)) {
  alert('Please enter a single letter');
  return;
 }
 
 // Check if the letter has already been guessed
 if (guessedLetters.includes(input)) {
  alert('You already guessed that letter!');
  return;
 }
 
 // Add the letter to the guessed letters array
 guessedLetters.push(input);
 
 // Update the display
 displayGame();
}