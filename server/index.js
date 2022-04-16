const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

// ROUTES //

// CREATE

app.post("/saveUser", async(req, res) => {
    try {
        let user = req.body.userCredentials;
        let sqlQuery = "INSERT INTO public.users (first_name, last_name, password, email, age, user_type, sex) VALUES ("
            + "'" + user.name + "'" +  "," + "'" + user.surname + "'" + "," + "'" + user.password + "'" + "," + "'" +
            user.email + "'"+ ","   + "'" + user.age + "'" + ","  + "'" + user.userType + "'"+   ", 'X')";
        console.log(sqlQuery)
        await pool.query(sqlQuery);
    } catch (e) {
        console.log(e.message);
    }
})

app.get("/getUser/:id", async(req,res) => {
    try{
        console.log(req.params);
        const userDetails = await pool.query("SELECT * FROM public.users WHERE id = " + req.params.id)
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getPatientScores/:id", async(req,res) => {
    try{
        console.log(req.params);
        const patientDetails = await pool.query("SELECT * FROM public.user_patients WHERE patient_id = " + req.params.id)
        res.json(patientDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.put("/updateUser/:id", async(req,res) => {
    let id = req.params.id;
    try {
        let newUser =  req.body;
        let sqlQuery = "UPDATE public.users SET first_name = '" + newUser.name + "', last_name = '" + newUser.surname
            + "', email = '" + newUser.email + "', password = '" + newUser.password + "' WHERE id = " + id;
        console.log(sqlQuery);
        await pool.query(sqlQuery);
    } catch (e) {
        console.log(e.message)
    }

})
// READ

// UPDATE

// DELETE

app.listen(5000, () => {
    console.log("server started on port 5000");
})
