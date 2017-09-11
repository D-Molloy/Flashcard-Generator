var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
var jsonfile = require('jsonfile');
var file = 'data.json'
var fs = require("fs");
var inquirer = require('inquirer');

// "The Minnesota Vikings are the best team in football".replace("The Minnesota Vikings", "...")
function appStart(){
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome to Flashcard-Generator!  Please choose from these options to begin:",
            choices: ["Study existing cards", "Create a new basic flashcard", "Create a new cloze flashcard"],
            name: "mainOptions"
        }
    ]).then(function(inquirerResponse){
        if (inquirerResponse.mainOptions == "Study existing cards"){
            fs.readFile(file, "utf8", function(err, obj) {
                // var oneCard = obj[0].frontOfCard;
                console.log(obj);
              });
        } else if (inquirerResponse.mainOptions == "Create a new basic flashcard") {
            function basicPrompt(){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "****Basic Flashcard Generator****\nPlease enter the question that will appear on the front of the card:",
                        name: "cardFront"
                    },
                    {
                        type: "input",
                        message: "Please enter the answer to the question you just inputted:",
                        name: "cardBack"
                    }
                ]).then(function(inquirerResponse){
                    if (inquirerResponse.cardFront != "" && inquirerResponse.cardBack != "" ) {
                        var newCard = new BasicCard(inquirerResponse.cardFront, inquirerResponse.cardBack);
                        newCard.createBasic();
                        console.log("Basic Card Created!");
                        inquirer.prompt([
                            {
                                type: "list",
                                message: "Would you like to create another basic flashcard?",
                                choices: ["Yes", "No"],
                                name: "basicRestart"
                            }
                        ]).then(function(inquirerResponse){
                            if (inquirerResponse.basicRestart == "Yes") {
                                basicPrompt();
                            } else if (inquirerResponse.basicRestart == "No"){
                                appStart();
                            }
                        })
                    } else {
                        console.log("Please input an answer for both sides of the flash card.");
                        basicPrompt();
                    }
    
                })
            }
            basicPrompt();
        } else if (inquirerResponse.mainOptions == "Create a new cloze flashcard") {
            console.log("creating a new cloze flashcard")
        }
    })
};


appStart();

module.exports = appStart;