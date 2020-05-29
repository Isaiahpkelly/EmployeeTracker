var mysql = require("mysql");
const inquirer = require('inquirer');
const addEmployee = require('./userRequest.js');
const addtoDb = require('./addToDatabase');
const viewDb = require('./viewDatabase');
const express = require('express');
const app = express()

 
app.set('port', (process.env.PORT || 8080));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});


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




        