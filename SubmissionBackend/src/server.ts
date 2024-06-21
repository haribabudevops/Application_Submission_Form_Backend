import express = require('express'); // Use import = require for express
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const port = 3000;
const dbPath = path.join(__dirname, 'db.json');

app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
    res.send(true);
});

app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    console.log('Received submission:', req.body);

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        console.error('Validation failed');
        return res.status(400).send('All fields are required');
    }

    const newSubmission = {
        name,
        email,
        phone,
        github_link,
        stopwatch_time
    };

    let db: any[] = [];
    try {
        if (fs.existsSync(dbPath)) {
            const data = fs.readFileSync(dbPath, 'utf-8');
            if (data) {
                db = JSON.parse(data);
                if (!Array.isArray(db)) {
                    db = [];
                }
            }
        }
    } catch (error) {
        console.error('Error reading database file:', error);
        return res.status(500).send('Internal server error');
    }

    db.push(newSubmission);

    try {
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    } catch (error) {
        console.error('Error writing to database file:', error);
        return res.status(500).send('Internal server error');
    }

    res.status(201).send('Submission saved');
});

app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);

    if (isNaN(index) || index < 0) {
        return res.status(400).send('Invalid index');
    }

    if (!fs.existsSync(dbPath)) {
        return res.status(404).send('No submissions found');
    }

    let db: any[] = [];
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        db = JSON.parse(data);
        if (!Array.isArray(db)) {
            return res.status(500).send('Internal server error');
        }
    } catch (error) {
        console.error('Error reading database file:', error);
        return res.status(500).send('Internal server error');
    }

    if (index >= db.length) {
        return res.status(404).send('Submission not found');
    }

    res.send(db[index]);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});