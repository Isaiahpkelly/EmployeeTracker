const inquirer = require('inquirer');
var mysql = require("mysql");
const index = require('./index');
const addToDb = require('./userRequest');

var connection;
if(process.env.NODE_ENV ==="production"){
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

const departmentQuestions = {
    AddtoDatabase: function(){
        
            inquirer.prompt([
                {
                    type: "list",
                    message: "What would you like to add to employeeDB?",
                    name: "addRequest",
                    choices: [
                        "Departments",
                        "Roles",
                        "Employees"
    
                    ]
                }
            ])
                .then(answer => {
                    switch (answer.addRequest) {
                        case "Departments":
                            departmentQuestions.addDepartment();
                            break;
                        case "Roles":
                            departmentQuestions.addRole();
                            break;
    
                        case "Employees":
                            departmentQuestions.addEmployee();
                            break;
    
    
                        default:
    
                    }
                })
        },
    
    addDepartment: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "What would you like to name the new department?",
                name: "deptName"
               
            }
        ])
            .then(answer => {
                console.log("Your dept has been named:", answer.deptName);
                console.log("Inserting a new department...\n");
    
                var query = connection.query("INSERT INTO department SET ?",
                {
                    name: answer.deptName
                }, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department created!\n");
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
              }
            );
          
            // logs the actual query being run
            console.log(query.sql);
            
                
                })
                // .then([
                
                // ])
            
    },
    addEmployee: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is employees first name?",
                name: "employeeFirstName"
               
            },
            {
                type: "input",
                message: "What is employees last name?",
                name: "employeeLastName"
               
            }

        ])
            .then(answer => {
                console.log("Employees Name:", answer.employeeFirstName, answer.employeeLastName);
                console.log("Creating a new Employee...\n");
    
                var query = connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.employeeFirstName,
                    last_name: answer.employeeLastName
                }, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " employee created!\n");
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
              }
            );
          
            // logs the actual query being run
            console.log(query.sql);
            
                
                })
            
    },
    addRole: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "What is your title?",
                name: "roleTitle"
               
            },
            {
                type: "input",
                message: "What is your salary?",
                name: "roleSalary"
               
            }
        ])
            .then(answer => {
                console.log("New created roles:", answer.roleTitle, answer.roleSalary);
                console.log("Inserting a new role...\n");
    
                var query = connection.query("INSERT INTO role SET ?",
                {
                    title: answer.roleTitle,
                    salary: answer.roleSalary

                }, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " role created!\n");
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
              }
            );
          
            // logs the actual query being run
            console.log(query.sql);
            
                
                })
            
    },


}

module.exports = departmentQuestions;
