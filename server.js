//Declaring Dependencies
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors')

app.use(express.json());
app.use(cors());
dotenv.config();

//Creating database connection

  const db = mysql.createConnection (
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
  );

// Testing Connection

  db.connect((err) => {
    if (err) {
      // If there's an error during connection, log the error message
      console.error('Error connecting to the database:', err);
      return;
    }
    
    // If no error, connection is successful
    console.log('Connected to the database as id', db.threadId);
 
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);

    // Send message to the browser
    console.log('Sending message to browser...');
    app.get('/', (req,res)=> {
        res.send('Server started successfully')
    })
    });  
});

// Answer to Question 1 goes here

app.get('/patients', (req, res) => {
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(sql, (err, results) => {
        if (err) {
          console.error('Error fetching patients:', err);
          return res.status(500).send({ error: 'Database query error' });
        }
        res.send(results);
      });
    })
  
// Answer to Question 2 goes here

    app.get('/providers', (req, res) => {
        const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
        db.query(sql, (err, results) => {
            if (err) {
              console.error('Error fetching providers:', err);
              return res.status(500).json({ error: 'Database query error' });
            }
            res.json(results);
          });
        })
      

// Answer to Question 3 goes here

app.get('/patient', (req, res) => {
    const { firstName } = req.query; // Get the firstName query parameter from the request
  
    if (!firstName) {
      return res.status(400).json({ error: 'Please provide a first name.' });
    }
  
    const sql = 'SELECT * FROM patients WHERE first_name = ?'; // SQL query to search for patients by first name
  
    // Query the database, passing in the first name as a parameter to prevent SQL injection
    db.query(sql, [firstName], (err, results) => {
      if (err) {
        console.error('Error fetching patients:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: `No patients found with first name: ${firstName}` });
      }
      
      res.json(results); // Send the results as a JSON response
    });
  });
  
// Answer to Question 4 goes here

app.get('/provider', (req, res) => {
    const { specialty } = req.query; // Get the specialty query parameter from the request
  
    if (!specialty) {
      return res.status(400).json({ error: 'Please provide a specialty.' });
    }
  
    const sql = 'SELECT * FROM providers WHERE specialty = ?'; // SQL query to search for providers by specialty
  
    // Query the database, passing in the specialty as a parameter to prevent SQL injection
    db.query(sql, [specialty], (err, results) => {
      if (err) {
        console.error('Error fetching providers:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: `No providers found with specialty: ${specialty}` });
      }
  
      res.json(results); // Send the results as a JSON response
    });
  });
  
  