const inquirer = require('inquirer');
var mysql = require("mysql");
const addEmployee = require('./userRequest');
const cTable = require('console.table');



var connection;
if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else{
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "employeeDB"
    });
}
const viewQuestions = {
 
    viewEmployeeDatabase: function(){
        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to view in the employeeDB?",
                name: "viewRequest",
                choices: [
                    "Departments",
                    "Roles",
                    "Employees"
                   
                ]
            }
        ])
            .then(answer => {
                switch (answer.viewRequest) {
                    case "Departments":
        viewQuestions.viewDepartment();
       connection.end();
                        break;
                    case "Roles":
        viewQuestions.viewRole();
                        break;
        
                    case "Employees":
        viewQuestions.viewEmployee();
                        break;
        
        
                    default:
        
                }
            })
            
    },
    viewEmployee: function(){
        console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
    console.table(res);
    // addEmployee.userRequestWithDatabase();
    
    
  })
  
  
    },

    viewDepartment: function(){
        console.log("Selecting all departments...\n");
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.table(res);
    // connection.end();
  });
    },

    viewRole: function(){
        console.log("Selecting all roles...\n");
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.table(res);
    connection.end();
  });
}
        
    }

module.exports = viewQuestions;