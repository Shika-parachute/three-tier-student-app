const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "mysql",
    port: 3306,
    user: "root",
    password: "root",
    database: "student_db"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Connected to MySQL database!");
});

app.get("/api", (req, res) => {
    res.json({
        message: "Backend is working!"
    });
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);
    });
});

app.post("/students", (req, res) => {
    const { name, email, course } = req.body;

    const sql =
        "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";

    db.query(sql, [name, email, course], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json({
            message: "Student added successfully!",
            id: result.insertId
        });
    });
});

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});