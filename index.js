var mysql = require("mysql");
const inquirer = require('inquirer');
const addEmployee = require('./userRequest.js');
const addtoDb = require('./addToDatabase');
const viewDb = require('./viewDatabase');


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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    addEmployee.userRequestWithDatabase();
});


function createDepartment() {
    console.log("Inserting a new department...\n");
    var query = connection.query(
      "INSERT INTO department SET ?",
      {
        name: "Rocky Road"
        
      }, function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " department created!\n");
        // Call updateProduct AFTER the INSERT completes
        // updateProduct();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }


function updateProduct() {
    console.log("Updating all Rocky Road quantities...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                quantity: 100
            },
            {
                flavor: "Rocky Road"
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            deleteProduct();
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}

// function createProduct() {
//     console.log("Inserting a new product...\n");
//     var query = connection.query(
//         "INSERT INTO products SET ?",
//         {
//             flavor: "Rocky Road",
//             price: 3.0,
//             quantity: 50
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " product inserted!\n");
//             // Call updateProduct AFTER the INSERT completes
//             updateProduct();
//         }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
// }


        // function departmentName(){
        //     inquirer.prompt([
        //         {
        //             type: "input",
        //             message: "What would you like to name the new department?",
        //             name: "deptName"
                   
        //         }
        //     ])
        //         .then(answer => {
        //             console.log(answer.dept);
        //             })
                
        //     }
        
        // function createdepartment() {
        //     console.log("Inserting a new department...\n");
        //     var query = connection.query(
        //         "INSERT INTO department SET ?",
        //         {
        //             name: "Rocky Road",
                    
        //         },
        //         function (err, res) {
        //             if (err) throw err;
        //             console.log(res.affectedRows + " product inserted!\n");
        //             // Call updateProduct AFTER the INSERT completes
        //             updateProduct();
        //         }
        //     );
        
        //     // logs the actual query being run
        //     console.log(query.sql);
        // }

        