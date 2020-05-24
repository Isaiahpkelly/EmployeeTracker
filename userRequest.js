const inquirer = require('inquirer');
const addtoDb = require('./addToDatabase');
const viewDb = require('./viewDatabase');
const deleteDb = require('./deleteFromDatabase');

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

                        break;

                    case "Delete from the database":
                        deleteDb.deleteFromDatabase();
                        break;

                    case "Exit the database":

                        break;


                    default:

                }
            })
    }
   
}

module.exports = addQuestions;
