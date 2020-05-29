const inquirer = require('inquirer');
var mysql = require("mysql");
const index = require('./index');
const addToDb = require('./userRequest');
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

const updateQuestions = {
    updateDatabase: function(){
        
            inquirer.prompt([
                {
                    type: "list",
                    message: "What would you like to update in the employeeDB?",
                    name: "updateRequest",
                    choices: [
                        "Departments",
                        "Roles",
                        "Employees"
    
                    ]
                }
            ])
                .then(answer => {
                    switch (answer.updateRequest) {
                        case "Departments":
                            updateQuestions.updateDepartment();
                            break;
                        case "Roles":
                            updateQuestions.updateRole();
                            break;
    
                        case "Employees":
                            updateQuestions.updateRole();
                            break;
    
    
                        default:
    
                    }
                })
        },
    
    updateDepartment: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "What would you like to update in the department?",
                name: "updateDept"
               
            },
            {
                type: "input",
                message: "What is the new department name?",
                name: "updateDept2"
               
            }
        ])
            .then(answer => {
                console.log("Your dept has been updated to:", answer.updateDept);
                console.log("Updating new departments\n");
    var query = connection.query(
        "UPDATE department SET ? WHERE ?",
        [
            {
                name: answer.updateDept2
            },
            {
               name: answer.updateDept
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            
        }
    );

    // logs the actual query being run
    console.log(query.sql);
                
                })            
    },
    updateRole: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "What would you like to update in role?",
                name: "updateRole"
               
            },
            {
                type: "input",
                message: "What is the new role name?",
                name: "updateRole2"
               
            }
        ])
            .then(answer => {
                console.log("Your role has been updated to:", answer.updateRole);
                console.log("Updating new roles\n");
    var query = connection.query(
        "UPDATE role SET ? WHERE ?",
        [
            {
                title: answer.updateRole2
            },
            {
               title: answer.updateRole
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            
        }
    );

    // logs the actual query being run
    console.log(query.sql);
                
                })            
    },
    // updateEmployee: function(){
    //     inquirer.prompt([
    //         {
    //             type: "input",
    //             message: "What is employees first name?",
    //             name: "updateEmployee"
               
    //         },
    //         {
    //             type: "input",
    //             message: "What is employees last name?",
    //             name: "updateEmployee2"
               
    //         },
    //         {
    //             type: "input",
    //             message: "What is the new first name?",
    //             name: "updateEmployee3"
               
    //         },
    //         {
    //             type: "input",
    //             message: "What is the new last name?",
    //             name: "updateEmployee4"
               
    //         }
    //     ])
    //         .then(answer => {
    //             console.log("Your employee has been updated to:", answer.updateEmployee3 + answer.updateEmployee4);
    //             console.log("Updating new employee\n");
    // var query = connection.query(
    //     "UPDATE employee SET ?  WHERE ?",
    //     [
    //         {
    //             first_name: answer.updateEmployee3,
    //             last_name: answer.updateEmployee4
    //         },
    //         {
    //            first_name: answer.updateEmployee,
    //            last_name: answer.updateEmployee2
    //         }
    //     ],
    //     function (err, res) {
    //         if (err) throw err;
    //         console.log(res.affectedRows + " employees updated!\n");
    //         // Call deleteProduct AFTER the UPDATE completes
            
    //     }
    // );

    // // logs the actual query being run
    // console.log(query.sql);
                
    //             })            
    // }


}

module.exports = updateQuestions;

