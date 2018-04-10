// this prototpye prints the letter if it's correctly guessed.

Letter.prototype.printLetter = () => {
	if(this.show) {
		return this.letter;
	} else {
		return '-';
	}
};

// compares letter 
function Letter(letter) {
	this.letter = letter;
	if(this.letter == ' ') {
		this.show = true;
	} else {
		this.show = false;
	}
}

// export the Letter() function

module.exports = {
	Letter
};