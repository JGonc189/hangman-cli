// modules
const inquirer = require('inquirer');
const letters = require('./letters.js');
const word = require('./word.js');
const game = require('./game.js');

// this function starts the whole hangman game, it checks if a user types in anything other than a letter and marks them incorrect.  Also has handling for winning and losing.

function userGuess() {
    console.log(newWord.print());
    inquirer.prompt([{
        name: 'letter',
        type: 'text',
        message: 'Pick a letter!',
        validate: (string) => {
            let regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
            if (regEx.test(string)) {
                return true;
            } else {
                return false;
                console.log('Please enter only one letter at a time!');
            }
        }
    }]).then(function(user) {
        console.log('================================================================');
        let letter = user.letter;
        newWord.checkLetter(letter);
        if (newWord.correct) {
            console.log('Sorry, but you already guessed that letter!');
            userGuess();
        } else {
            if (newWord.isComplete()) {
                console.log(`Correct!  You Win!! ${newWord.chosenWord} was the hidden word.`);
                playAgain();
            } else if (newWord.guessesLeft === 0) {
                console.log(`Sorry but you are all out of guesses!  The answer was ' ${newWord.chosenWord} '`);
                playAgain();
            } else {
                console.log(`You have ${newWord.guessesLeft} guesses left!`);
                console.log('================================================================');
                userGuess();
            }
        }
    });
}

// this function handles if the user wants to play again
function playAgain() {
    inquirer.prompt([{
        type: 'input',
        message: 'Would you like to play again? (y/n)',
        name: 'playAgain'
    }]).then((user) => {
        let answer = user.playAgain;
        if (answer === 'y') {
            game.userInput(() => {
                newWord = new word.Word(game.chosenWord);
                userGuess();
            });
        } else if (answer === 'n') {
            console.log('Thank you for playing!');
            return;
        }
    });
}

game.userInput(() => {
    newWord = new word.Word(game.chosenWord);
    userGuess();
});
