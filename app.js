/* TODO
    create letters.js
    create word.js


*/
const inquirer = require('inquirer');
const letters = require('./letters.js');
const word = require('./word.js');

const intro = [
    {
        type: 'input',
        name: 'answer',
        message: 'Are you ready to start the game? (y / n)'
    },
    {
        type: 'input',
        name: 'help',
        message: 'Do you need help? (y / n)'
    }
]


inquirer.prompt([
    // first word . . .
    {
        name: "apple",
        message: "Known to keep doctors away"
    }
]);
