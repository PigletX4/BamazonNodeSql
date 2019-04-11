var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Youreprettygood1!",
  database: "bamazon"
});


connection.connect(function (err) {
  if (err) throw err;
  showTable();
});

function showTable() {
    connection.query('SELECT * FROM bamazon.products;', function(err, res){
        if (err) throw err;
        console.table(res);
        startUp();
    });
};

function startUp() {
    connection.query("SELECT * FROM bamazon.products", function(err, results) {
       
        if (err) throw err;

    inquirer.prompt([{
        name: "purchaseItem",
        type: "input",
        message: "Please choose an item by id!"
    },
    {
        name: "amount",
        type: "input",
        messages: "How many would you like?"
    }
    ]).then(function (answer) {
        var itemChoice = parseInt(answer.purchaseItem);
        var itemAmount = answer.amount;
        var currentId;
        
        
        for(var e = 0; e < 10; e++){
            
            var currentId = results[e].item_id;
            var currentStock = results[e].stock_quantity;
            var itemPrice = results[e].price;
            var newStock = currentStock - itemAmount;
            var purchaseTotal = (itemPrice * itemAmount)


            if(itemChoice === currentId){

                if(currentStock < itemAmount){
                    console.log('Sorry, we currently do not have enough in stock!')
                    connection.end();
                    return

                    
                }
                else{
                    updateStock(newStock, itemChoice, purchaseTotal);
                    return
                }
                
            }
            else{
                continue
            }

        }
        console.log("No such product.")
        connection.end();



    });
  });
}

function updateStock(newStock, itemChoice, purchaseTotal){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newStock
          },
          {
            item_id: itemChoice
          }
        ],
        function(error) {
          if (error) throw err;
          console.log('Thank you for your purchase, your total is $' +purchaseTotal)
          connection.end();
          
        }
    );
}