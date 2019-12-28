const express = require("express");

const app = express();
const bodyparser = require("body-parser");

const port = process.env.PORT || 3000;

const fs = require('fs');

let rawdata = fs.readFileSync('../data/data.json');
let myObj = JSON.parse(rawdata);

// console.log(myObj)

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


// this allows for local cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    next();
  });


// get all words fromone level
app.get("/get_words/:level", (req, res) => {
    res.status(200).send(myObj[req.params.level]);
  });

app.listen(port, () => {
  console.log(`running at port ${port}`);
});


