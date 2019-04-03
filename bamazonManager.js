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
    start();
});

function start() {

    //Inquire which ID they would like to purchase
    inquirer
        .prompt({
            name: "manager",
            type: "list",
            choices: ["View Products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        })
        .then(function (answer) {
            switch (answer.manager) {
                case "View Products for sale":
                    console.log("\n");
                    console.log("You selected to view products for sale");
                    console.log("\n");
                    break;

                case "View Low Inventory":
                    console.log("\n");
                    console.log("You selected to view low inventory items");
                    console.log("\n");
                    break;

                case "Add to Inventory":
                    console.log("\n");
                    console.log("You selected to add inventory to an item");
                    console.log("\n");
                    break;

                case "Add New Product":
                    console.log("\n");
                    console.log("You selected to add a new product");
                    console.log("\n");
                    break;
            }
        })
}