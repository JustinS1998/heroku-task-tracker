/*
CREATE TABLE tasks_table (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    details TEXT NOT NULL
);
INSERT INTO tasks_table (title, details) VALUES ('', '');
SELECT * FROM tasks_table;
DELETE FROM tasks_table WHERE id=0;
UPDATE tasks_table
SET title = '',
    details = ''
WHERE id = 0;
*/

const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/tasks_table', (req, res) => {
    // Return them as json
    res.json(
        {
            results: [
                { 'id': '1', 'title': 'task1', 'details': 'task1 details' },
                { 'id': '2', 'title': 'task2', 'details': 'task2 details' }
            ]
        });

    console.log(`Sent tasks`);
});

// DATABASE
const { Pool } = require('pg');
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });
const dotenv = require('dotenv');
dotenv.config();
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
let pool = null;
// if on heroku
if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        // ssl: true,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    // if on local
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    pool = new Pool({
        user: process.env.D_user,
        password: process.env.D_password,
        port: process.env.D_pport,
        host: process.env.D_host,
        database: process.env.D_database,
        ssl: true
    });
}
const executeQuery = async (req, res, myQuery) => {
    try {
        const client = await pool.connect();
        const result = await client.query(myQuery);
        const results = { 'results': (result) ? result.rows : null };
        res.json(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
}
// SELECT * FROM tasks_table;
app.get('/db/tasks_table', async (req, res) => {
    const myQuery = 'SELECT * FROM tasks_table';
    executeQuery(req, res, myQuery)
        .catch(error=>console.error(error));
})
// DELETE FROM tasks_table WHERE id=0;
app.delete("/db/tasks_table", async (req, res) => {
    console.log(req.body);
    const myQuery = `DELETE FROM tasks_table WHERE id=${req.body.id}`;
    executeQuery(req, res, myQuery)
        .catch(error=>console.error(error));
});
// INSERT INTO tasks_table (title, details) VALUES ('', '');
app.post('/db/tasks_table', async (req, res) => {
    console.log(req.body);
    const myQuery = `INSERT INTO tasks_table (title, details) VALUES ('${req.body.title}', '${req.body.details}')`;
    executeQuery(req, res, myQuery)
        .catch(error=>console.error(error));
})
// DATABASE END

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);