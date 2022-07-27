//TODO: Create file structure: server, scema, query and possible seeds, gitignore, node modules, readme, install npms 
//TODO: List dependencies. There are a couple we already know we need. 
//It appears we need something called console.table- don't know what it is yet but listed on uw bootcampspot website. 
const sql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
//Not sure what else to do here yet other than set up server connect, so will build schema table for now for better idea of what data I will be trying to fill. 
//Will create the schema based off of the images from UW bootcampspot. It looks like we will have 3 primary tables we will be joining. 
//It looks like our department id will reference the departments role, and the role id will in turn hold reference to an employees given role. 
