var jsonfile = require('jsonfile');
jsonfile.spaces = 2;
var file = 'data.json'
var appStart = require('./main.js');
var fs = require("fs");
var cardArray = [];


var BasicCard = function(front, back) {
    this.front = front;
    this.back = back;
};

BasicCard.prototype.createBasic = function () {
    var obj = {
        frontOfCard: this.front,
        backOfCard: this.back
    };

    cardArray.push(obj);
    // , {flag: 'a'}
    jsonfile.writeFileSync(file, cardArray); 
}


module.exports = BasicCard;