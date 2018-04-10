// modules
const Letter = require('./letters.js');

// constructor function that handles guesses left and takes in the chosen word.

var Word = function(chosenWord) {
    this.guessesLeft = 10;
    this.chosenWord = chosenWord;
    this.letters = [];
    this.guesses = [];
    for (var i = 0; i < this.chosenWord.length; i++) {
        this.letters.push(new Letter.Letter(this.chosenWord[i]));
    }
};


// checks letters being passed through, updates guesses left if letter is correct.

Word.prototype.checkLetter = function(letter) {
    this.incorrect = true;
    this.correct = false;
    var letter = letter.toLowerCase();
    if (this.guesses.indexOf(letter) != -1) {
        this.correct = true;
    } else {
        this.guesses.push(letter);
        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i].letter.toLowerCase() == letter) {
                this.incorrect = false;
                this.letters[i].show = true;
            }
        }
        if (this.incorrect) {
            this.guessesLeft--;
        }
    }
};

// runs the function and checks if word is completed, then returns true or false.

Word.prototype.isComplete = function() {
    for (var i = 0; i < this.letters.length; i++) {
        if (!this.letters[i].show) {
            return false;;
        }
    }
    return true;
};

// prints the output
Word.prototype.print = function() {
    var output = "";
    for (var i = 0; i < this.letters.length; i++) {
        output += this.letters[i].printLetter();
    }
    return output;
};

module.exports = {
	Word
};