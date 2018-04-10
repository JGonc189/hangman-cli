// this file randomly selects a word 

// modules
const movieKey = ('./keys.js');
const MovieDB = require('moviedb')('6733df4b76abb7884b0195f630afb642');
const inquirer = require('inquirer');

// takes in user input and asks for favorite actor
const userInput = (input) => {
	inquirer.prompt([{
		type: 'input',
		message: 'Please type in your favorite actor/actress first name!',
		name: 'actor'
	}]).then((user) => {
		let actor = user.actor;
		getActor(actor, (actorID) =>{
			getMovies(actorID, () => {
				input();
			});
		});
	});
}

// call to the movie database and return the needed movie information

const getMovies = (actorID, input) => {
	let moviesArray = [];
	MovieDB.discoverMovie({with_cast: actorID}, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		let results = res.results;
		for (let i = 0; i < results.length; i++) {
			let title = results[i].title;
			if (/^[a-zA-Z ]*$/g.test(title)) {
				moviesArray.push(title);
			}
		}
		let randomNum = Math.floor(Math.random() * moviesArray.length);
		randomNum -= 1;
		let chosenWord = moviesArray[randomNum];
		module.exports.chosenWord = chosenWord;
		input();
	});
}

// call to the movie db and return the needed actor info
const getActor = (actor, input) => {
	MovieDB.searchPerson({query:actor}, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		if (res.results.length > 0) {
			let actorID = res.results[0].id;
			input(actorID);
		} else {
			console.log('Actor cannot be found in the database...');
		}
	});
}

module.exports = {
	userInput
}