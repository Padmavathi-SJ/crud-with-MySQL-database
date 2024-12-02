import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(express.json()); // Correctly use express.json()

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud" // Ensure this database exists
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1); // Exit the application if the connection fails
    } else {
        console.log("Connected to the MySQL database.");
    }
});

// Endpoint to fetch data from the `student` table
app.get('/', (req, res) => {
    const sql = "SELECT * FROM students"; // Query to fetch all students
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ Message: "Error", Error: err.message });
        }
        return res.json(result);
    });
});


app.post('/create', (req, res) => {
    const { id, name, email, password, dept } = req.body;
    const sql = 'INSERT INTO students (id, name, email, password, dept) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [id, name, email, password, dept], (err, result) => {
        if (err) {
            console.error('Error inserting student:', err.message);
            return res.status(500).json({ Message: 'Failed to add student', Error: err.message });
        }
        res.status(200).json({ Message: 'Student added successfully' });
    });
});


// Update student
app.put('/update/:id', (req, res) => {
    const { name, email, password, dept } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE students SET name = ?, email = ?, password = ?, dept = ? WHERE id = ?';
    db.query(sql, [name, email, password, dept, id], (err, result) => {
      if (err) {
        console.error('Error updating student:', err.message);
        return res.status(500).json({ Message: 'Failed to update student', Error: err.message });
      }
      res.status(200).json({ Message: 'Student updated successfully' });
    });
  });
  

  // Delete student
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting student:', err.message);
        return res.status(500).json({ Message: 'Failed to delete student', Error: err.message });
      }
      res.status(200).json({ Message: 'Student deleted successfully' });
    });
  });

  


// Start the server and listen on port 5000
app.listen(8081, () => {
    console.log("Server is running");
});
