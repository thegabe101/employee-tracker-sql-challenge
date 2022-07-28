//TODO: Create file structure: server, scema, query and possible seeds, gitignore, node modules, readme, install npms 
//TODO: List dependencies. There are a couple we already know we need. 
//It appears we need something called console.table- don't know what it is yet but listed on uw bootcampspot website. 
const mysql = require('mysql2');
const inquirer = require("inquirer");
require("console.table");
//Not sure what else to do here yet other than set up server connect, so will build schema table for now for better idea of what data I will be trying to fill. 
//Our server here will be different because we need to connect to mysql database. Haven't learned this in class yet so looking it up. 
const appConnection = mysql.createConnection ({
    //determines host and port number
    host: "localhost",
    port: "3306",
    //determines sql root user (me)
    user: "root",
    //still have a password for mysql set up in .bashrc but its just password
    password: "password",
    //employees db is name of our created database in schema.sql
    database: "ouremployees_db"
});

//Begins prompts after successful connection is established. 
appConnection.connect(function(err) {
    if (err) throw err;
    else {
        console.log("You have connected as id " + appConnection.threadId);
        startUp();
    };
});
//Will create the schema based off of the images from UW bootcampspot. It looks like we will have 3 primary tables we will be joining. 
//It looks like our department id will reference the departments role, and the role id will in turn hold reference to an employees given role. 
//TODO: Because this will be an inquirer-based input app, the next thing I can think of to do is to build the inquirer.prompt section. 
//There will be several sections of prompts based off user-choice because of many branching paths. 
//However, the first thing we can do is build a switch case that sends the user to the correct prompt chain based off of initial choice. 
function startUp() {
    //large wrapper function wraps inquirer prompt which will chain other prompt functions
    inquirer.prompt( {
        name: 'initialQuestions',
        type: 'list',
        message: 'Hello, what would you like to do today?',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Roll', 'Exit']
    }).then (function (answers) {
        //uses switch to identify which instance of inquirer to run next based on user input
        switch (answers.initialQuestions) {
            //accepts answers as our response with initial questions property 
            //now we list all of our cases, which are equal to our choices
            case "View All Employees":
                //this is where we will eventually call our corresponding function.
                findAllEmployees();
                break;
            case "View All Departments":
                //function
                findAllDepartments();
                break;
            case "View All Roles":
                findAllRoles();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                    addRole();
                    break;
            case "Update Role":
                updateRole();
                break;  
            case "Exit":
                console.log("You may safely exit the terminal. Have a nice day.");
                appConnection.end();
                break;
        };
    });
};

//With our initial prompt set written, we can start trying to write the functions that will just return data and don't requirer additional inquirer prompts.
//TODO: Write view all employees to get an idea of how to perform rest of queries that will require inquirer. 
// function findAllEmployees() {
//     //This is where I create a variable for this specific query. Will need to make one to accord to each. Can't write it until my tables are solid, though. 
//     const allEmployeesQ = 
//     //We will have the connection request the parameters of the mysql request, and throw an error if it's nnot there or respond with the table if it is. 
//     appConnection.allEmployeesQ(query, (err, res) => {
//         if (err) throw err;
//         //\n is for eye formatting in the console.
//         console.log('\n');
//         console.log('View all employees');
//         console.log('\n');
//         console.table(res);
//         //Once function runs its course we return the user to initialize prompt. No need for input in this command. 
//         startUp();
//     });
// };

//This command is my first successful one. Realized I don't need const query and can simply write the function as a const and call it from prompt above. 
const findAllEmployees = () => {
    appConnection.query(`SELECT * FROM employees`, (err, results) => {
        console.log('\n')
        console.table(results);
        console.log('-------------------------------------------------------\n')
    })
}

const findAllDepartments = () => {
    appConnection.query(`SELECT * FROM department`, (err, results) => {
        console.log('\n')
        console.table(results);
        console.log('-------------------------------------------------------\n')
    })
}

const findAllRoles = () => {
    appConnection.query(`SELECT * FROM roles`, (err, results) => {
        console.log('\n')
        console.table(results);
        console.log('-------------------------------------------------------\n')
    })
}


//will start off with an experimental function trying to access sql DB. However, in order to populate a table wondering if I need seeds first.

