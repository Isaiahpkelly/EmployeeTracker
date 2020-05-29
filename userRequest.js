const inquirer = require('inquirer');
const addtoDb = require('./addToDatabase');
const viewDb = require('./viewDatabase');
const deleteDb = require('./deleteFromDatabase');
const updateDb = require('./updateDatabase');

var mysql = require("mysql");

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
const addQuestions = {
    userRequestWithDatabase: function () {
        inquirer.prompt([
            {
                type: "list",
                message: "What would you like to do with the Employee Database?",
                name: "userRequest",
                choices: [
                    "Add to the database",
                    "View the database",
                    "Update the database",
                    "Delete from the database",
                    "Exit the database"
                ]
            }
        ])
            .then(answer => {
                switch (answer.userRequest) {
                    case "Add to the database":
                        addtoDb.AddtoDatabase();

                        break;
                    case "View the database":
                        viewDb.viewEmployeeDatabase();
                        break;

                    case "Update the database":
                        updateDb.updateDatabase();
                        break;

                    case "Delete from the database":
                        deleteDb.deleteFromDatabase();
                        break;

                    case "Exit the database":

                        connection.close();
                        break;

                }
            })
    }

}

module.exports = addQuestions;
