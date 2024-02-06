import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express()


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySql123##",
    database: "test",
    // port: 3306
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Kinda the best")
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })    
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES (?)"
    const values = ["Titled", "described", "cover.jpg"]
    db.query(q,[values], (err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })    
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const q = "DELETE FROM books WHERE id = ?"
    
    db.query(q,[bookId], (err,data) => {
        if(err) return res.json(err)
        return res.json("Delete successfully")
    })    
})


app.listen(8800, () => {
    console.log("Listening")
})