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
            console.log(`ID: ${res[i].id} | ${res[i].product_name} | Price: $${res[i].price}`);
        }
        console.log("\n");
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
            userChoice = answer.customer;
            var idConcat = ("SELECT * FROM products WHERE id = " + userChoice)
            //Switch case for each ID
            switch (answer.customer) {
                case "1":
                    console.log("\n");
                    console.log("You selected id: 1 | Shampoo");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "2":
                    console.log("\n");
                    console.log("You selected id: 2 | Soap");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "3":
                    console.log("\n");
                    console.log("You selected id: 3 | Conditioner");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "4":
                    console.log("\n");
                    console.log("You selected id: 4 | Cards");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "5":
                    console.log("\n");
                    console.log("You selected id: 5 | Monopoly");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "6":
                    console.log("\n");
                    console.log("You selected id: 6 | Call of Duty");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "7":
                    console.log("\n");
                    console.log("You selected id: 7 | Almonds");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "8":
                    console.log("\n");
                    console.log("You selected id: 8 | Walnuts");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "9":
                    console.log("\n");
                    console.log("You selected id: 9 | Coffee");
                    console.log("\n");
                    userID(idConcat);
                    break;

                case "10":
                    console.log("\n");
                    console.log("You selected id: 10 | Eggs");
                    console.log("\n");
                    userID(idConcat);
                    break;

                default:
                    console.log("Please enter a valid ID");
                    start();
            }
        });
}
// One function for all IDs
function userID(idConcat) {
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
                idConcat,
                {
                    quanity: answer.quanity
                },
                function (err, res) {
                    //Creating a new variable with updated stock quantity
                    var response = res;
                    var userQuanity = answer.quanity;
                    var stock_quantity = parseInt(res[0].stock_quanity)
                    var newStock = (stock_quantity - userQuanity);

                    quantityQuery = ("UPDATE products SET stock_quanity = " + newStock + " WHERE id = " + userChoice);

                    if (err) throw err;
                    console.log("\n");
                    console.log(`You wish to buy ${answer.quanity} ${res[0].product_name}(s)`)


                    //Update MYSQL database
                    // IF case for quantities that are too large
                    if (userQuanity < stock_quantity) {
                        connection.query(
                            quantityQuery,
                            {
                                stock_quanity: newStock
                            },
                            function (err, res) {
                                if (err) throw err;
                                console.log(`Your oder of ${userQuanity} ${response[0].product_name}(s) has been placed!`);
                                console.log(`Youre total is $${userQuanity * response[0].price}`);
                                console.log("\n");

                                start();
                            }
                        )
                    } else {
                        console.log("\n");
                        console.log(`There is not enough ${response[0].product_name}'s available | remaining stock: ${stock_quantity}`);
                        console.log("\n");
                        start();
                    }
                });
        })
}