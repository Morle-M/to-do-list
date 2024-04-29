const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

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
    const texts = result.rows.map(todo => todo.text);
    res.status(200).json(texts);
  } catch (error) {
    console.error('Error retrieving todos:', error);
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
  
      res.status(201).send(`Todo with ${title} `);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.delete('/todos/:todo_name', async (req, res) => {
    const { todo_name } = req.params;
  
    try {
      const query = ` 
      DELETE FROM todo
      WHERE text = $1;
      `;
      const values = [ todo_name ];
      const result = await pool.query(query, values);
      res.status(200).send(`${todo_name} deleted!`);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
