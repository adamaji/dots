var express = require("express");
var app = express();
var port = 5000;
 
app.get("/", function(req, res){
    res.send("It works!");
});
 
app.listen(port);
console.log("Listening on port " + port);

