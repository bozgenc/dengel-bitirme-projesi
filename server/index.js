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

app.get("/getUserForLogin/:email", async(req,res) => {
    try{
        console.log(req.params);
        const userDetails = await pool.query("SELECT * FROM public.users WHERE email = '" +  req.params.email + "'")
        res.json(userDetails.rows)
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

/*app.get("/gANX/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " anxiety");
        const dataa = await pool.query("SELECT anx FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/gPHOB/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :phob");
        const dataa = await pool.query("SELECT phob FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/gOKB/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :okb");
        const dataa = await pool.query("SELECT okb FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/gDEP/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :dep");
        const dataa = await pool.query("SELECT dep FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})
app.get("/gHOS/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :hos");
        const dataa = await pool.query("SELECT hos FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/gSOM/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :som");
        const dataa = await pool.query("SELECT som FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
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

app.get("/gPSY/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :psy");
        const dataa = await pool.query("SELECT psy FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/gPAR/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :par");
        const dataa = await pool.query("SELECT par FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})

app.get("/gINT/:id", async (req,res) => {
    try{
        const idm = parseInt(req.params.id);
        console.log(idm, " :int");
        const dataa = await pool.query("SELECT anx FROM user_patients WHERE patient_id = $1", [
          idm
        ]);
        console.log(dataa.rows[0]);
        //res = dataa.rows[0];
        res.json(dataa.rows[0]);
    } catch(err) {
        console.log(err.message)
    }
})
*/

app.get("/Get_session", async (req,res) => {
    try{ //SELECT * FROM public.user_patients, public.users WHERE public.user_patients.patient_id == public.users.patient_id
        const allRecords = await pool.query('SELECT * FROM public.sessions')
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

app.put("/uANX", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET anx = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("ANX UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uDEP", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET dep = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("DEP UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uOKB", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET okb = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("OKB UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uINT", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET int = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("INT UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uPAR", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log("score: ", score);
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET par = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("PAR UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uPHOB", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET phob = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("PHOB UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uPSY", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET PSY = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("PSY UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uSOM", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET som = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("SOM UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uHOS", async (req,res) => {
    console.log("*******");
    try {
        const { userID, score } = req.body;
        console.log(userID, score);
        const updateHOS = await pool.query(
          "UPDATE public.user_patients SET HOS = $1 WHERE patient_id = $2",
          [score, userID]
        );
    
        console.log("HOS UPDATED");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server started on port 5000");
})
