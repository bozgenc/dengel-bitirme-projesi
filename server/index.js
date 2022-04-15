const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// ROUTES //

// CREATE

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

/**
 *  SELECT foods.tem_name,foods.item_unit,
    company.company_name, company.company_city
    FROM foods ,company
    WHERE  foods.company_id =company.company_id
    AND company.company_city='London';
 */
// UPDATE

// DELETE

app.listen(5000, () => {
    console.log("server started on port 5000");
})
