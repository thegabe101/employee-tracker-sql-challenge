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

//function to prompt the user for any additional commands they'd like to run once they finish one. 
function whatElse() {
    inquirer.prompt( {
        name: 'doSomethingElse',
        type: `list`,
        message: `Is there anything else you'd like to do today?`,
        choices: [`Yes`, `No`]
    }).then (function (yourAnswer) {
        switch (yourAnswer.doSomethingElse) {
            case "Yes":
                startUp();
                break;
            case "No":
                console.log("You may safely exit the terminal. Have a nice day.");
                appConnection.end();
                break;
        }
    })
}
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
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Add Department', 'Add Role', 'Update Role', 'Delete Employee', 'Exit']
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
            case "Delete Employee":
                deleteEmployee();
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

//will start off with an experimental function trying to access sql DB. However, in order to populate a table wondering if I need seeds first.

//This command is my first successful one. Realized I don't need const query and can simply write the function as a const and call it from prompt above. 
const findAllEmployees = () => {
    appConnection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.dept_name AS department, roles.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees manager ON employees.manager_id = manager.id`, (err, results) => {
        console.log('\n');
        console.table(results);
        console.log('-------------------------------------------------------\n');
        whatElse();
        console.log('-------------------------------------------------------\n');
    });
};

//Similar to findAllEmployees. Pulls all departments from department table and displays them with their registered id.
const findAllDepartments = () => {
    appConnection.query(`SELECT * FROM department`, (err, results) => {
        console.log('\n');
        console.table(results);
        console.log('-------------------------------------------------------\n');
        whatElse();
        console.log('-------------------------------------------------------\n')
    })
}

//Decided to make this one show salary. Not sure what I will do with it. 
const findAllRoles = () => {
    appConnection.query(`SELECT * FROM roles`, (err, results) => {
        console.log('\n')
        console.table(results);
        console.log('-------------------------------------------------------\n')
        whatElse();
        console.log('-------------------------------------------------------\n')
    })
}

//TODO: Determine how to build ADD functions.

//start by selecting all roles
const addEmployee = () => {
    appConnection.query(`SELECT * FROM roles`, function (err, results) {
        if (err) throw err;

        //run prompt asking for new employee information
        inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the employees first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the employees last name?'
            },
            {
                //Must create an empty role array to allow for addition of any role.
                //for loop iterates over all possibilities of role titles and then we return the data with the employees role
                name: 'employeeRole',
                type: 'list',
                message: 'What is the employees role?',
                choices: function () {
                    let possibleRoles = [];

                    for (var i = 0; i < results.length; i++) {
                        possibleRoles.push(results[i].title);
                    }

                    return possibleRoles;
                }
            }
        ]).then(function (answer) {
            //we select the employee with their input name and insert into the set with the returned employeeRole data from before
            appConnection.query("SELECT * FROM roles WHERE ?", { title: answer.employeeRole}, function (err, results) {
                if (err) throw err;
                appConnection.query("INSERT INTO employees SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    //unsure how to generate a unique role id for an added employee. seems it will default to the first item of the array from the roleset the employee is coming from. 
                    role_id: results[0].id,
                    manager_id: results[0].id 
                });
                //employee should now be in database if the user selects view all employees again. 
                console.log('\n You have successfully added this employee to the database.');
            });
            whatElse();
        });
    });
};

//We can follow a very similar pattern for adding departments and roles, but they will be significantly simpler because there is no need to role match

const addDepartment = () => {
    inquirer.prompt({
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the department you would like to add?'
    }).then(function(answer) {
        //inserts into department set whatever the users answer was for their newDepartment name
        appConnection.query('INSERT INTO department SET ?', { dept_name: answer.newDepartment }, function (err) {
            if(err) throw err;
            else {
        console.log('\n You have successfully added this department to the database.');  
        }}
        );
    whatElse();
    });
};

//add role function will be similar but will require addition of properties salary and dept id 
const addRole = () => {
    appConnection.query(`SELECT * FROM department`, function (err, results) {
        if (err) throw err;
        //run prompt asking for new role information 
        inquirer.prompt([
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the title of the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the new role?'
            },
            {
                //Must create an empty role array to allow for addition of any role.
                //for loop iterates over all possibilities of department ids and then we return the data with the the department ids
                name: 'department',
                type: 'list',
                message: 'What department does the new role belong to?',
                choices: function () {
                    let possibleDepartments = [];

                    for (var i = 0; i < results.length; i++) {
                        possibleDepartments.push(results[i].dept_name);
                    }

                    return possibleDepartments;
                }
            }
        ]).then(function (answer) {
            //we select the department table and insert the new role into the set with the updated rolename
            appConnection.query("SELECT * FROM department WHERE ?", { dept_name: answer.department}, function (err, results) {
                if (err) throw err;
                appConnection.query("INSERT INTO roles SET ?", {
                    title: answer.newRole,
                    //must use parseInt here to accept the salary input
                    salary: parseInt(answer.salary), 
                    //accepts the 0 point of the array just like add employee did 
                    department_id: results[0].id
                });
                //role should now be in database if the user selects view all roles again. 
                console.log('\n You have successfully added this role type to the database.');
            });
            whatElse();
        })
    });
};

// const updateRole = () => {
//     appConnection.query('SELECT roles.id, roles.title FROM roles ORDER BY roles.id', function (err, results) {
//         if(err) throw err;
//         inquirer.prompt([
//             {
//                 name: 'updatedRole',
//                 type: 'input',
//                 message: "How would you describe the new role?",
//                 choices: function () {
//                     let possibleRoles = []
                    
//                     for (var i = 0; i < results.length; i++) {
//                         possibleRoles.push(results[i].title);
//                     }
//                     return possibleRoles;
//                 }
//             }
//         ]).then(function (answer) {
//             appConnection.query("UPDATE employees SET employees.role_id = ? WHERE employees.id = ?", {title: answer.updatedRole}, function (err, results) {
//                 if(err) throw err;
//                 console.log('Employee role has been updated.')
//             });
//             whatElse();
//         })
//     })
// }

//TODO: NUMEROUS ATTEMPTS AT UPDATE ROLE but couldn't figure it out
//!! This is something to work with tutor on. Butting my head against the wall at this point.

const updateRole = () => {
    let managerArray = [];
    let roleArray = [];
    appConnection.query('SELECT employees.id, employees.first_name, employees.last_name FROM employees', (err, employeeData) => {
        if(err) throw err;
        employeeData.forEach((employees) => {
            managerArray.push(`${employees.first_name} ${employees.last_name}`)
        });
        appConnection.query(`SELECT roles.id, roles.title FROM roles`, (err, data) => {
            if(err) throw err;
            data.forEach((roles) => {
                roleArray.push(roles.title)
                console.log(roleArray);
            });
            inquirer.prompt([
                {
                    name: 'employeeName',
                    type: 'list',
                    message: 'Whos role would you like to update?',
                    choices: managerArray
                },
                {
                    name: 'updateEmployeeRole',
                    type: 'list',
                    message: 'What role would you like the employee to have?',
                    choices: roleArray
                }
            ]).then(response => {
                // managerArray.push(response.employeeName);
                // roleArray.push()
                // let newTitle;
                let employeeNameArray = response.employeeName.split(" ")
                appConnection.query(`UPDATE employees SET role_id = '${roleArray.indexOf(response.updateEmployeeRole) + 1}' WHERE employees.first_name = '${employeeNameArray[0]}' AND employees.last_name = '${employeeNameArray[1]}';`)
            })
        });
        console.log('\n You have successfully removed ${answer.firstName} ${answer.lastName} from the database.');
        whatElse();
    });
};

//to delete employee, we can simply start an inquirer prompt that will allow the user to choose from a case of an employee and query delete from the employee database  
// const deleteEmployee = () => {
//     let currentEmployees = appConnection.query("SELECT * FROM employees", [id]);
//     inquirer.prompt ({
//         name: "deleteEmp",
//         type: "list",
//         message: "Which employee would you like to delete from the database?",
//         choices: currentEmployees
//     }).then(function (answer) {
//         appConnection.query("DELETE FROM employees WHERE id = ?", {answer}, function (err) {
//             if (err) throw err;
//             console.log('\n ${answer.id} has been deleted from the employee list');
//         })
//         whatElse();
//     })
// }

//scratch that. didn't work. seems theres no way to pull the employee list from id that way. going to try simply using first/last name from inquirer inputs instead

const deleteEmployee = () => {
    inquirer.prompt ([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the first name of the employee you would like to delete?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the last name of the employee you would like to delete?'
        }
    ]).then(function (answer) {
        appConnection.query('DELETE FROM employees WHERE first_name = ? and last_name = ?', [answer.firstName, answer.lastName], function (err) {
            console.log('\n You have successfully removed ${answer.firstName} ${answer.lastName} from the database.');
            whatElse();
        }
        );
    });
};



