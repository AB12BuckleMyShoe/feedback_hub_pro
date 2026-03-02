const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
app.use(express.json());
app.use(cors());


app.post("/api/users", async(req, res) => {
    const {name, feedback} = req.body;

    try {
        const result = await pool.query("INSERT INTO users (name, feedback) VALUES ($1, $2)", [name, feedback])
        res.status(201).json({message: "User successfully created"});
        console.log("User created", result);

    }

    catch(error) {
        res.status(500).json({message: "Could not create user"});
        console.error("User not created", error);
    }

})

app.get("/api/users", async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        res.json(result.rows);
        console.log("Users fetched");

    }

    catch(error) {
        res.status(500).json({message: "Could not find user"});
        console.log("User not added", error);

    }
})

app.delete("/api/users/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.status(200).json({message: "User successfully deleted"})
        console.log("User deleted", result);

    }
    catch(error) {
        res.status(500).json({message: "Failed to delete user"});
        console.log("User not deleted", error);

    }
    
})




app.listen(4000, () => {
    console.log("Server is running on port 4000");
})