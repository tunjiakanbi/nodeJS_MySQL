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
    optionsMenu();
    // purchaseItem();
});

function optionsMenu() {
    inquirer
        .prompt({
            name: "menu",
            type: "rawlist",
            message: "Pick one of the options from the menu list by typing in the number, ",
            choices: ["1: view products for sale", "2: view low Inventory", "3: add to inventory", "4: add to product"]
        })
        .then(function (answer) {
            var menuAnswer = answer.menu

            switch (menuAnswer.charAt(0)) {
                case "1":
                    console.log("first choice selected");
                    viewProd();
                    break;

                case "2":
                    console.log("second choice selected");
                    viewInv()
                    break;

                case "3":
                    console.log("third choice selected");
                    addInv()
                    break;

                case "4":
                    console.log("fourth choice selected");
                    addProd()
                    break;

            }



        });
}


function viewProd() {
    var query = connection.query(
        "SELECT * FROM products;",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            connection.end();
        });
}

function viewInv() {
    var query = connection.query(
        "SELECT * FROM products WHERE (stock_quantity < 5);",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.table(res);
            connection.end();
        });

}

function addInv(res) {//to be competed
    viewProd(); 
    inquirer.prompt([
        {
            name: "whichProduct",
            type: "input",
            message: "Which product would you like to update?"
        },
        {
            name: "addStock",
            type: "input",
            message: "What is the quantity you would like to add?"
        }


    ]).then(function(answer){
        for(var i=0; i<res.length; i++){
            if(+answers.whichProduct === res[i].item_id){

            }
        }
        var query = connection.query(
            "INSERT INTO PRODUCTS ? WHERE item_id = ?", {
                stock_quantity: answer.addStock 
            },
            function (err) {
                if (err) throw err;
                console.table(answer);
                console.log(query.sql);
                connection.end();
            }
        );
    });
};

    function addProd() { 
        inquirer.prompt([
            {
                name: "product",
                type: "input",
                message: "What is the product you would like to add?"
            },
            {
                name: "deptName",
                type: "input",
                message: "What is the department name you would like to add?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price you would like to add?"
            },
            {
                name: "stock",
                type: "input",
                message: "What is the stock quantity you would like to add?"
            }
        ]).then(function (answer) {
            var query = connection.query(

                "INSERT INTO products SET ?", {
                    product_name: answer.product,
                    department_name: answer.deptName,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (err) {
                    if (err) throw err;
                    console.table(answer);
                    console.log(query.sql);
                    connection.end();
                }
            );
        });
    };