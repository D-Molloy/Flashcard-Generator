var jsonfile = require('jsonfile');
jsonfile.spaces = 2;
var file = 'data.json'
var cardArray = [];

var ClozeCard = function(text, cloze){
    this.text = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, '...');
};

ClozeCard.prototype.createCloze = function () {
    var obj = {
        frontOfCard: this.partial,
        backOfCard: this.cloze
    };
    cardArray.push(obj);
    // , {flag: 'a'}
    jsonfile.writeFileSync(file, cardArray);
};

module.exports = ClozeCard;