const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// ROUTES //

// CREATE
app.post("/postSession", async (req,res) => {
    try {
        let saveObj = req.body;
        console.log(saveObj)
        let sqlQuery = "INSERT INTO public.sessions VALUES ('" + saveObj.session_id + "'," + "'" + saveObj.expert_id + "'," + "'" + saveObj.session_date + "'," + "'" + saveObj.clink + "')"
        console.log(sqlQuery)


        await pool.query(sqlQuery)
        console.log(req.body)
    } catch (error) {
        console.log(error.message)
    }
})

// READ
app.get("/Users", async (req,res) => {
    try{
        const allRecords = await pool.query('SELECT * FROM public.users')
        res.json(allRecords.rows)
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/User_experts", async (req,res) => {
    try{ //SELECT * FROM public.user_patients, public.users WHERE public.user_patients.patient_id == public.users.patient_id
        const allRecords = await pool.query('SELECT * FROM public.users, public.user_experts WHERE id = expert_id')
        res.json(allRecords.rows)
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/Get_session", async (req,res) => {
    try{ //SELECT * FROM public.user_patients, public.users WHERE public.user_patients.patient_id == public.users.patient_id
        const allRecords = await pool.query('SELECT * FROM public.sessions')
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
