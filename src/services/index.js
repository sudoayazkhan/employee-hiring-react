import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

// const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Replace with your XAMPP MySQL username
    password: '',       // Replace with your XAMPP MySQL password
    database: 'hiring_app'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Routes
// Submit Application
app.post('/api/applications', (req, res) => {
    const { title, forename, surname, dob, nationalInsurance, mobile, address, nextOfKinAddress, terms, documentPath } = req.body;

    // Calculate age-based decision
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    let decision = '';
    if (age < 18) decision = "Your application is being considered.";
    else if (age <= 30) decision = "Your application has been accepted.";
    else decision = "Your application is unsuccessful.";

    const query = `INSERT INTO applications (title, forename, surname, dob, national_insurance, mobile, address, next_of_kin_address, terms_and_conditions, document_path, decision) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, forename, surname, dob, nationalInsurance, mobile, address, nextOfKinAddress, terms, documentPath, decision];

    db.query(query, values, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ message: 'Application submitted successfully', decision });
    });
});

// Get Applications
app.get('/api/applications', (req, res) => {
    const query = 'SELECT forename, surname, decision FROM applications';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});