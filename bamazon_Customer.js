var inquirer = require('inquirer');
var mysql = require("mysql");
var consoleTable = require('console.table');
var quantity = 0;
var avail_quantity = 0;


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "P@$$w0rd",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    fetchproducts(userInput);
    // purchaseItem();
});

function fetchproducts(cb) { //cb is a callback
    var query = connection.query(
        "SELECT * FROM products;",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            // console.log(res[0]);
            console.table(res);

            // console.table(res[0]);
            // console.table(res[0].item_id + " is item ID");

            cb(res)
            // connection.end();
        });
}

function userInput(res) {
    inquirer.prompt([{
            type: "input",
            message: "What is the id of the product you want to buy?",
            name: "userinput1"
        },
        {
            type: "input",
            message: "How many units of this item do you want to buy?",
            name: "userinput2"
        }

    ]).then(function (answers) {
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            if (+answers.userinput1 === res[i].item_id) { //+ converts answer.userinput1 from a string into a number
                console.table("Okay you choose the item ID " + res[i].item_id);
                console.log("item name: " + res[i].product_name);
                console.log("department: " + res[i].department_name);
                console.log("unit price: $ " + res[i].price);
                console.table("And you would like to purchase " + answers.userinput2 + " units");
                var item = res[i].item_id;
                quantity = parseInt(answers.userinput2);
                avail_quantity = parseInt(res[i].stock_quantity);
                price = parseFloat(res[i].price);
                total = quantity * price;
                //console.log(typeof quantity);
                // console.log(quantity);
                // console.log(avail_quantity);

                function purchaseItem() {
                    inquirer.prompt([{
                        type: "input",
                        message: "Would you like to place your order? Type yes or no",
                        name: "userinput3"
                    }]).then(function (ans) {
                        // console.log("whatever")
                        // if ((ans.userinput3 === 'yes') ) {
                        if (ans.userinput3 === 'yes') {

                            console.log("Okay, checking to see if we have " + quantity + " of these items available");
                            //console.log("Insufficient Quantity!");
                            if (avail_quantity >= quantity) {
                                console.log("Sufficient Quantity is available!");
                                var newQuantity = avail_quantity - quantity;
                                updateQuantity(newQuantity, item, function (res) {
                                    console.log("Purchase Succesful");
                                    console.log("Your order total is: $ " + total);
                                    connection.end();
                                });

                            } else {
                                console.log("Insufficient Quantity!");
                                console.log("We are unable to place your order until Sufficient Quantities are available!");
                                connection.end();
                            }

                        }

                    });
                }
                purchaseItem();
            }
        }
    });
}

function updateQuantity(newQuantity, item, cb) { //cb is a callback
    var query = connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?;", [newQuantity, item],
        function (err, res) {
            if (err) throw err;
            // console.log(newQuantity);
            cb(res)

        })
};