"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(body_parser_1.default.json());
// Ping endpoint
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
// Submit endpoint
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Read existing submissions from db.json
    const submissions = JSON.parse(fs_1.default.readFileSync('db.json', 'utf8'));
    // Add new submission
    const newSubmission = {
        name,
        email,
        phone,
        github_link,
        stopwatch_time
    };
    submissions.push(newSubmission);
    // Write updated submissions back to db.json
    fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
    res.json({ success: true, message: 'Submission added successfully.' });
});
app.get('/read', (req, res) => {
    const { index } = req.query;
    const idx = Number(index);
    // Read existing submissions from db.json
    const submissions = JSON.parse(fs_1.default.readFileSync('db.json', 'utf8'));
    // Return submission at specified index (0-indexed)
    if (idx >= 0 && idx < submissions.length) {
        res.json(submissions[idx]);
    }
    else {
        res.status(404).json({ message: 'Submission not found.' });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
