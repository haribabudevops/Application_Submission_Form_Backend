"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express"); // Use import = require for express
var fs = require("fs");
var path = require("path");
var app = express();
var port = 3000;
var dbPath = path.join(__dirname, 'db.json');
app.use(express.json());
app.get('/ping', function (req, res) {
    res.send(true);
});
app.post('/submit', function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, phone = _a.phone, github_link = _a.github_link, stopwatch_time = _a.stopwatch_time;
    console.log('Received submission:', req.body);
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        console.error('Validation failed');
        return res.status(400).send('All fields are required');
    }
    var newSubmission = {
        name: name,
        email: email,
        phone: phone,
        github_link: github_link,
        stopwatch_time: stopwatch_time
    };
    var db = [];
    try {
        if (fs.existsSync(dbPath)) {
            var data = fs.readFileSync(dbPath, 'utf-8');
            if (data) {
                db = JSON.parse(data);
                if (!Array.isArray(db)) {
                    db = [];
                }
            }
        }
    }
    catch (error) {
        console.error('Error reading database file:', error);
        return res.status(500).send('Internal server error');
    }
    db.push(newSubmission);
    try {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    }
    catch (error) {
        console.error('Error writing to database file:', error);
        return res.status(500).send('Internal server error');
    }
    res.status(201).send('Submission saved');
});
app.get('/read', function (req, res) {
    var index = parseInt(req.query.index, 10);
    if (isNaN(index) || index < 0) {
        return res.status(400).send('Invalid index');
    }
    if (!fs.existsSync(dbPath)) {
        return res.status(404).send('No submissions found');
    }
    var db = [];
    try {
        var data = fs.readFileSync(dbPath, 'utf-8');
        db = JSON.parse(data);
        if (!Array.isArray(db)) {
            return res.status(500).send('Internal server error');
        }
    }
    catch (error) {
        console.error('Error reading database file:', error);
        return res.status(500).send('Internal server error');
    }
    if (index >= db.length) {
        return res.status(404).send('Submission not found');
    }
    res.send(db[index]);
});
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
