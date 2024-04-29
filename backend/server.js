const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  port: process.env.DBPORT,
});

app.get('/todos', async (req, res) => {
  
  try {
    const query = ` 
    SELECT *
    FROM todo
    `;
    const result = await pool.query(query);
    const texts = result.rows.map(todo => todo.text);
    res.status(200).json(texts);
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
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Todo with ID not found' });
    } else {
      res.status(200).json(result.rows);
    }
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.put('/todos/:id/:text', async (req, res) => {
    const { id ,text } = req.params;
    try {
      const query = ` 
      SELECT *
      FROM todo
      WHERE todo_id = $1
      `;
      const values = [ id ];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Todo with ID not found' });
      } else {
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
      }
    } catch (error) {
      console.error('Error editing item:', error);
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
