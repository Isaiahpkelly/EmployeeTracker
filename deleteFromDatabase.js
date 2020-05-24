const inquirer = require('inquirer');
var mysql = require("mysql");
const index = require('./index');

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

const deletingQuestions = {
    deleteFromDatabase: function(){
        
        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to delete from the Employee DataBase?",
                name: "deleteRequest",
                choices: [
                    "Departments",
                    "Roles",
                    "Employees"

                ]
            }
        ])
            .then(answer => {
                switch (answer.deleteRequest) {
                    case "Departments":
                        deletingQuestions.deleteFromDepartment();
                        break;
                    case "Roles":
                        deletingQuestions.deleteFromRole();
                        break;

                    case "Employees":
                        deletingQuestions.deleteFromEmployee();
                        break;


                    default:

                }
            })
    },
    deleteFromDepartment: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "What department would you like to delete?",
                name: "deleteDepartment"
               
            }
        ])
            .then(answer => {
                console.log("Your dept has been deleted:", answer.deleteDepartment );
                
    connection.query(
      "DELETE FROM department WHERE ?",
      {
        name: answer.deleteDepartment
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + ": Was deleted from the departments!\n");
        // Call readProducts AFTER the DELETE completes
        // readProducts();
      }
    );
          
            // logs the actual query being run
            // console.log(query.sql);
            
                
                })
            
    },
    deleteFromEmployee: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "Who would you like to delete from Employee's?",
                name: "deleteEmployee"
               
            }
        ])
            .then(answer => {
                console.log("This employee has been deleted:", answer.deleteEmployee );
                
    connection.query(
      "DELETE FROM employee WHERE ?",
      {
        first_name: answer.deleteEmployee
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " was deleted from the employee's!\n");
        // Call readProducts AFTER the DELETE completes
        // readProducts();
      }
    );
          
            // logs the actual query being run
            console.log(query.sql);
            
                
                })
            
    },
    deleteFromRole: function(){
        inquirer.prompt([
            {
                type: "input",
                message: "Which title would you like to delete from Roles?",
                name: "deleteRole"
               
            }
        ])
            .then(answer => {
                console.log("This role has been deleted:", answer.deleteRole );
                
    connection.query(
      "DELETE FROM role WHERE ?",
      {
        title: answer.deleteRole
      },
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " was deleted from the roles!\n");
        // Call readProducts AFTER the DELETE completes
        // readProducts();
      }
    );
          
            // logs the actual query being run
            // console.log(query.sql);
            
                
                })
            
    }


}

module.exports = deletingQuestions;


// function deleteProduct() {
//     console.log("Deleting all strawberry icecream...\n");
//     connection.query(
//       "DELETE FROM products WHERE ?",
//       {
//         flavor: "strawberry"
//       },
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " products deleted!\n");
//         // Call readProducts AFTER the DELETE completes
//         readProducts();
//       }
//     );
//   }