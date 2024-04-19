// Assuming you have already set up your Express app and connected to your PostgreSQL database

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
const port = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
});

app.get('/todos', async (req, res) => {
  
  try {
    const query = ` 
    SELECT *
    FROM todo
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = ` 
    SELECT *
    FROM todo
    WHERE todo_id = $1
    `;
    const values = [id];
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add item route
app.post('/todos/:title', async (req, res) => {
    const { title } = req.params;
  
    try {
      const query = ` 
      INSERT INTO todo (todo_id, text)
      VALUES (
        (SELECT COALESCE(MAX(todo_id), 0) + 1 FROM todo),
        $1
    ) RETURNING todo_id`;
      const values = [title];
      const result = await pool.query(query, values);
  
      // Send the newly added item as the response
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Add item route
app.put('/todos/:id/:text', async (req, res) => {
    const { id ,text } = req.params;
  
    try {
      const query = ` 
      UPDATE todo
      SET text = $2
      WHERE todo_id = $1;`;
      const values = [ id, text];
      const result = await pool.query(query, values);
      res.status(200).json({message: 'Updated!'});
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/todos/:todo_id', async (req, res) => {
    const { todo_id } = req.params;
  
    try {
      const query = ` 
      DELETE FROM todo
      WHERE todo_id = $1;
      `;
      const values = [ todo_id ];
      const result = await pool.query(query, values);
      res.status(200).json({message: 'Deleted!'});
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
