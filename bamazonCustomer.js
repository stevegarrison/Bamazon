var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

var userChoice = "";

function readProducts() {
    console.log("Here are all of our products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} | ${res[i].product_name} | Quanity: ${res[i].price}`);
        }
        start();
    });
}

// On start prompt which item customer would like to purchase
function start() {

    //Inquire which ID they would like to purchase
    inquirer
        .prompt({
            name: "customer",
            type: "input",
            message: "Please enter the ID of the item you would like to purchase...",
        })
        .then(function (answer) {
            //Switch case for each ID
            switch (answer.customer) {
                case "1":
                    console.log("You selected id: 1 | Shampoo");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "2":
                    console.log("You selected id: 2");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "3":
                    console.log("You selected id: 3");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "4":
                    console.log("You selected id: 4");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "5":
                    console.log("You selected id: 5");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "6":
                    console.log("You selected id: 6");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "7":
                    console.log("You selected id: 7");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "8":
                    console.log("You selected id: 8");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "9":
                    console.log("You selected id: 9");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                case "10":
                    console.log("You selected id: 10");
                    userChoice = parseFloat(answer.customer);
                    userID();
                    break;

                default:
                    console.log("Please enter a valid ID");
                    start();
            }
        });
}

var idConcat = ("SELECT * FROM products WHERE id = " + userChoice)

// One function for all IDs
function userID() {
    inquirer
        .prompt([
            {
                name: "quanity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function (answer) {
            connection.query(
                "SELECT * FROM products WHERE id = 1",
                {
                    quanity: answer.quanity
                }, 
                function (err, res) {
                    if (err) throw err;   

                    console.log(`You wish to buy ${answer.quanity} shampoos`)
                });
        })
}