const express = require('express');

const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//1. Be Polite, Greet the User
app.get('/greetings/:name', (req, res) => {
    //Accessing query parameters from the request
     const name = req.params.name;
    
    res.send(`What a delight it is to see you once more, ${name}!`);
})


//2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    if (isNaN(number)) { //w3 schools isNan means is not-a-number, this is a boolean so "if the inputted value is not a number."
        res.send(`You must specify a number.`);
    }
    else {
        //Math.random() returns a random number between 0 and 1, Math.floor() returns an integer(rounds down)
        const num = Math.floor((Math.random() * number) + 1);
        res.send(`You rolled a ${num}`);
    }
})

//3. I Want THAT One!
app.get('/collectibles/:index',(req, res) => {
    const ind = req.params.index
    if (ind <= collectibles.length - 1) {
        res.send(`So, you want this ${collectibles[ind].name}? For ${collectibles[ind].price}, it can be yours!`);
    } 
    else {
        res.send(`This item is not yet in stock. Check back soon!`)
    }
})

//4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
    const minPrice = req.query.minprice;
    const maxPrice = req.query.maxprice;
    const shoeType = req.query.type;
    shoes.filterShoes = [];
    for(i = 0; i < shoes.length; i++){
        if(shoeType == shoes[i].type && maxPrice >= shoes[i].price && minPrice <= shoes[i].price){
            shoes.filterShoes.push(shoes[i]);
            res.send(`Here are the shoes after the filter: ` + shoes.filterShoes);
        }
        else {
            res.send(`No parameters?`);
        }

    }


})


app.listen(3000, () => {
    console.log('listening on port 3000!')
})