const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var items = ["Eat Food","Cook Food","Buy Food"];
var worksItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

    var today = new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {listPageTitle: day, newListItems: items});
})

app.post("/", function(req, res){
    
    var item = req.body.newItem;
    
    if(req.body.list === "Work"){
        worksItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
})


app.get("/work", function(req, res){
    res.render("list", {listPageTitle: "Work List", newListItems: worksItems});
})

app.listen("4000", function(){
    console.log("Port running on 3000");
})