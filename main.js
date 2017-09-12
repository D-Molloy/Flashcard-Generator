var BasicCard = require('./BasicCard');
var ClozeCard = require('./ClozeCard');
var jsonfile = require('jsonfile');
var file = 'data.json'
var fs = require("fs");
var inquirer = require('inquirer');
// var objCopy;
var objIter = 0;

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
          
        console.log("****Study Flashcards****");

        function readCards () {
            

            jsonfile.readFile(file, function(err, obj) {
                if (objIter != obj.length){
                    if (obj != undefined) {
                       
                        console.log("~~~~~~~  Front  ~~~~~~~");
                        console.log(obj[objIter].frontOfCard);
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~")

                        inquirer.prompt([
                            {
                                type: "list",
                                message: "Make a selection:",
                                choices: ["Show Solution", "Next Card", "Main Menu"],
                                name: "readOptions"
                            }
                        ]).then(function(inquirerResponse){               
                            if (inquirerResponse.readOptions == "Show Solution") {
                                console.log("~~~~~~~  Back  ~~~~~~~");                               
                                console.log(obj[objIter].backOfCard)
                                console.log("~~~~~~~~~~~~~~~~~~~~~~\n");
                                console.log("+++++  New Card!  +++++");
                                objIter++;
                                readCards();
                            } else if (inquirerResponse.readOptions == "Next Card") {
                                console.log("~~~~~~~Card Skipped!~~~~~~~");
                                console.log("+++++    New Card!    +++++\n")
                                objIter++;
                                readCards();
                            } else if (inquirerResponse.readOptions == "Main Menu") {
                                
                                objIter = 0;
                                readCards();
                            }
                        })

                        } else {
                            console.log("No cards saved! Please create at least one card first.");
                            appstart();
                        }
                    } else {
                        console.log("*********************************************")
                        console.log("*  No cards left!  Returning to Main Menu.  *")
                        console.log("*********************************************")
                        appStart();
                    }
                    });

                }

            readCards ();

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
                            var newBasic = new BasicCard(inquirerResponse.cardFront, inquirerResponse.cardBack);
                            newBasic.createBasic();
                            console.log("Basic Flashcard Created!");
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
            function clozePrompt(){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "****Cloze Flashcard Generator****\nPlease enter the full text of the statment you want to study:",
                        name: "cardFront"
                    },
                    {
                        type: "input",
                        message: "Please enter cloze keyword(s):",
                        name: "cardBack"
                    }
                ]).then(function(inquirerResponse){

                    var checkString = inquirerResponse.cardFront;

                    if (inquirerResponse.cardFront != "" && inquirerResponse.cardBack != "" ) {
                        if (checkString.includes(inquirerResponse.cardBack)){
                            var newCloze = new ClozeCard(inquirerResponse.cardFront, inquirerResponse.cardBack);
                            newCloze.createCloze();
                            console.log("Cloze Flashcard Created!");
                            inquirer.prompt([
                                {
                                    type: "list",
                                    message: "Would you like to create another cloze flashcard?",
                                    choices: ["Yes", "No"],
                                    name: "clozeRestart"
                                }
                            ]).then(function(inquirerResponse){
                                if (inquirerResponse.clozeRestart == "Yes") {
                                    clozePrompt();
                                } else if (inquirerResponse.clozeRestart == "No"){
                                    appStart();
                                }
                            })
                        } else {
                            console.log("Cloze keyword not found in text!  Please input the cloze keyword as it appears in the full text you submit.")
                            clozePrompt();
                        }
                    } else {
                        console.log("Please input an answer for both sides of the flash card.");
                        clozePrompt();
                    }
    
                })
            }
            clozePrompt();
        }
    })
};


appStart();

// module.exports = appStart;