const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'node_deskripsi'
})

connection.connect();

app.get('/', (req,res) => {
    res.send(`<html>
        <body>
            <form action="/todo" method="post">
                <input name="deskripsi" />
                <button>Add</button>
            </form>
        </body>
    </html>`)
})

app.post('/todo', (req,res) => {
    var params = req.body.deskripsi
        connection.query("insert into list_deskripsi values('', ?)", params, (err, rows, fields) =>{
            if(err) throw err
                res.end()
        })
})

app.get('/todo', (req, res) => {
        connection.query('SELECT * from list_deskripsi', (err, result) =>{
            if(err) throw err
            res.json(result)
            res.end()
        })
})

app.delete('/todo/:id',(req,res) =>{
    connection.query('DELETE from list_deskripsi where id = ?', [req.params.id] ,(err, result) =>{
            if(err) throw err
            res.json(result)
            res.end()
    })
})


app.listen(3000, function(err){
    console.log("Server started");
})