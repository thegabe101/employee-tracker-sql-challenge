//TODO: Create file structure: server, scema, query and possible seeds, gitignore, node modules, readme, install npms 
//TODO: List dependencies. There are a couple we already know we need. 
//It appears we need something called console.table- don't know what it is yet but listed on uw bootcampspot website. 
const sql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//Not sure what else to do here yet other than set up server connect, so will build schema table for now for better idea of what data I will be trying to fill. 
//Will create the schema based off of the images from UW bootcampspot. It looks like we will have 3 primary tables we will be joining. 
//It looks like our department id will reference the departments role, and the role id will in turn hold reference to an employees given role. 
//TODO: Because this will be an inquirer-based input app, the next thing I can think of to do is to build the inquirer.prompt section. 
//There will be several sections of prompts based off user-choice because of many branching paths. 
//However, the first thing we can do is build a switch case that sends the user to the correct prompt chain based off of initial choice. 
function startUp() {
    //large wrapper function wraps inquirer prompt which will chain other prompt functions
    inquirer.prompt( {
        name: 'initialQuestions',
        type: 'List',
        message: 'Hello, what would you like to do today?',
        choices: ['View All Employees', 'Search DB for an Employee', 'Search Employee by Department', 'Search Employee by Role', 'Add Employee', 'Remove Employee', 'Add Department', 'Add Role', 'Exit']
    }).then (function (answers) {
        //uses switch to identify which instance of inquirer to run next based on user input
        switch (answers.initialQuestions) {
            //accepts answers as our response with initial questions property 
            //now we list all of our cases, which are equal to our choices
            case "View All Employees":
                //this is where we will eventually call our corresponding function.
                break;
            case "Search DB for an Employee":
                break;
            case "Search Employee by Department":
                break;
            case "Search Employee by Role":
                break;
            case "Add Employee":
                break;
            case "Remove Employee":
                break;
            case "Add Department":
                break;
            case "Add Role":
                break; 
            case "Exit":
                console.log("You may safely exit the terminal. Have a nice day.")
                break;
        };
    });
};