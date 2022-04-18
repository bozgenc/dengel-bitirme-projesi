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
        let sqlQuery = "INSERT INTO public.sessions (expert_id, clink, session_title, re_interval, session_time, isprivate, price, patient_ids) " +
            "VALUES ('" + saveObj.expertId + "'," + "'" + saveObj.sessionLink + "'," + "'" + saveObj.title + "'," + "'" + saveObj.recurring + "', '" +
         saveObj.timeDate.toString() + "','" + saveObj.isPrivateType  + "', '"+ saveObj.price + "' , '0')";

        await pool.query(sqlQuery)
    } catch (error) {
        console.log(error.message)
    }
})

app.get("/getFreeSessions", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.sessions WHERE isprivate = 'false' ");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getPrivateSessions", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.sessions WHERE isprivate = 'true' ");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getSessionById/:id", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.sessions WHERE session_id = " + req.params.id + "");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getRequestById/:id", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.requests WHERE patient_id = " + req.params.id + "");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getRequestByExpertId/:id", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.requests WHERE expert_id = " + req.params.id + "");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})


app.post("/saveUser", async(req, res) => {
    try {
        let user = req.body.userCredentials;
        let sqlQuery = "INSERT INTO public.users (first_name, last_name, password, email, age, user_type, sex, tckn) VALUES ("
            + "'" + user.name + "'" +  "," + "'" + user.surname + "'" + "," + "'" + user.password + "'" + "," + "'" +
            user.email + "'"+ ","   + "'" + user.age + "'" + ","  + "'" + user.userType + "'"+   ",'X'"  + ",'" + user.tckn + "' )";
        //console.log(sqlQuery)
        await pool.query(sqlQuery);
    } catch (e) {
        console.log(e.message);
    }
})

app.post("/savePatient", async (req,res) => {
    try {
        let saveObj = req.body;
        let sqlQuery = "INSERT INTO public.user_patients (tckn, patient_id) VALUES ('" + saveObj.tckn + "' , '" + saveObj.id+ "')"
        console.log(sqlQuery)

        await pool.query(sqlQuery)
    } catch (error) {
        console.log(error.message)
    }
})


app.post("/saveExpert", async(req, res) => {
    try {
        let user = req.body;
        //console.log(user.expert_id, " ", user.religion, " ", user.graduateSchool, " ", user.specialties, " ",user.tckn);
        let sqlQuery = "INSERT INTO public.user_experts (expert_id, religion, totalrating, description, specialties, graduate_school, tckn, numofvotes) VALUES ('"
            + user.expert_id + "','" + user.religion + "'" +  "," + 0 + "," + "'" + user.description + "'" + "," + "'" +
            user.specialties + "', '" +  user.graduateSchool + "'"+ ","   + "'" + user.tckn + "'" + "," + 0 +" )";
        
        await pool.query(sqlQuery)
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/saveRequest", async(req, res) => {
    try {
        let user = req.body;
        let sqlQuery = "INSERT INTO public.requests (patient_id, expert_id, isapproved, session_id) VALUES ('"
            + user.patientId + "','" + user.expertId + "'" +  "," + "'" + user.isApproved + "'" + "," + "'" +
            user.sessionId + "' )";
        await pool.query(sqlQuery)
    } catch (error) {
        console.log(error.message)
    }
})


app.get("/getUser/:tckn", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.users WHERE tckn = '" +  req.params.tckn + "'");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getUserById/:id", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.users WHERE id = '" +  req.params.id + "'");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getExpertById/:id", async(req,res) => {
    try{
        const userDetails = await pool.query("SELECT * FROM public.user_experts WHERE expert_id = '" +  req.params.id + "'");
        res.json(userDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getPatientScores/:id", async(req,res) => {
    try{
        const patientDetails = await pool.query("SELECT * FROM public.user_patients WHERE patient_id = " + req.params.id)
        res.json(patientDetails.rows)
    } catch(e) {
        console.log(e.message);
    }
})

app.get("/getUserForLogin/:email", async(req,res) => {
    try{
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
*/

//////////////////////////////////////Rating Page////////////////////////////////////////
app.get("/getOldScore/:id", async(req,res) => {
    try{
        const old_score = await pool.query("SELECT totalrating FROM public.user_experts WHERE expert_id = " + req.params.id);
        res.json(old_score.rows[0])
    } catch(e) {
        console.log("getOldScore error: ", e.message);
    }
})

app.get("/getNOV/:id", async(req,res) => {
    try{
        const oln_num = await pool.query("SELECT numOfVotes FROM public.user_experts WHERE expert_id = " + req.params.id);
        res.json(oln_num.rows[0])
    } catch(e) {
        console.log("getNOV error: ", e.message);
    }
})

app.put("/uNOV", async (req,res) => {
    try {
        const { expertID, num_of_votes } = req.body;
        const updateVoteNum = await pool.query(
          "UPDATE public.user_experts SET numOfVotes = $1 WHERE expert_id = $2",
          [num_of_votes, expertID]
        );
    
        console.log("vote num updated to ", num_of_votes, "\n");
    } 
    catch (err) {
        console.error(err.message);
    }
})

app.put("/uScore", async (req,res) => {
    try {
        const { expertID, score } = req.body;
        const updateScore = await pool.query(
          "UPDATE public.user_experts SET totalrating = $1 WHERE expert_id = $2",
          [score, expertID]
        );
    
        console.log("score updated to ", score, "\n");
    } 
    catch (err) {
        console.error(err.message);
    }
})
///////////////////////////////////////////////Rating Page End/////////////////////////////////
///////////////////////////////////////////////Beck Tests//////////////////////////////////////
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
    console.log("ANX");
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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
    try {
        const { userID, score } = req.body;
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

///////////////////////////////////////////////Beck Tests End/////////////////////////////////

app.listen(5000, () => {
    console.log("server started on port 5000");
})
