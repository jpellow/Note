//server requirements
//--------------------------------------------------
var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes
//-----------------------------------------------
//GET
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/api/notes", function (req, res) {
    // res.sendFile(path.join(__dirname, "tables.html"))
    var notes;
    fs.readFile('./db/db.json', function (err, data) {
        if (err) {
            throw err;
        }
        notes = data;
    })
    return res.json(notes);
});
//POST

app.post("/api/notes", function (req, res) {

    var newNote = req.body;

    fs.readFile('./db/db.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(newNote)
        fs.writeFileSync("./db/db.json", JSON.stringify(json), 'utf-8')
        console.log('Saved!');
    })


    // fs.appendFile('./db/db.json', newNote, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
    // return res.send(newNote);
});

app.delete("/api/notes/:id", function (req, res) {

})
//start server
//-----------------------------------------------
app.listen(PORT, function () {
    console.log("App is listening on PORT: " + PORT);
})