const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// ROUTES //

// CREATE

// READ
app.get("/records", async (req,res) => {
    try{
        const allRecords = await pool.query('SELECT * FROM public."Personel"')
        res.json(allRecords.rows)
    } catch(err) {
        console.log(err.message)
    }
})

// UPDATE

// DELETE

app.listen(5000, () => {
    console.log("server started on port 5000");
})
