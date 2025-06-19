let express = require("express");
let ejsLayouts = require("express-ejs-layouts");
let app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(ejsLayouts);

app.get("/new", (req, res) => {
    res.render("new");
});
app.get("/", (req, res) => {
    res.render("landingpage");
});



app.listen(4000, ()=>{
console.log("server started at localhost:4000")
});