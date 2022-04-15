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

// READ

// UPDATE

// DELETE

app.listen(5000, () => {
    console.log("server started on port 5000");
})
