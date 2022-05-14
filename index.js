const express = require('express')
const mysql = require('mysql')

const app = express()
app.use(express.json())


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'node-mysql-crud'
})

connection.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to database')
    }
})



// CREATE DATABASE node-mysql-crud

// app.get('/create-database', (req, res) => {
//     const sql = "CREATE DATABASE IF NOT EXISTS `node-mysql-crud`"
//     connection.query(sql, (err, result) => {
//         if (err) throw err
//         console.log(result)
//         res.send('Database created')
//     })
// })


// CREATE TABLE POSTS

app.get('/create-table', (req, res) => {
    const sql = "CREATE TABLE IF NOT EXISTS `posts` (`id` int(11) NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `body` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1"

    connection.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Table created')
    })
})



// INSERT data to POSTs TABLE

app.get('/insert-data', (req, res) => {

    const postdata = {
        title: req.body.title,
        body: req.body.body
    }

    const sql = "INSERT INTO posts SET ?"
    connection.query(sql, postdata, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Data inserted successfully')
    })
})



// Read data from POSTs TABLE

app.get('/read-data', (req, res) => {
    const sql = "SELECT * FROM posts"
    connection.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})



// Read data from POSTs TABLE by ID

app.get('/read-data-by-id', (req, res) => {
    const dataID = req.body.id
    const sql = "SELECT * FROM posts WHERE id = ?"
    connection.query(sql, dataID, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send(result)
    })
})


// Update data in POSTs TABLE

app.get('/update-data', (req, res) => {
    const dataID = req.body.id
    const dataTitle = req.body.title
    const dataBody = req.body.body
    const sql = "UPDATE posts SET title = ?, body = ? WHERE id = ?"
    connection.query(sql, [dataTitle, dataBody, dataID], (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Data updated successfully')
    })
})



// Delete data from POSTs TABLE

app.get('/delete-data', (req, res) => {
    const dataID = req.body.id
    const sql = "DELETE FROM posts WHERE id = ?"
    connection.query(sql, dataID, (err, result) => {
        if (err) throw err
        console.log(result)
        res.send('Data deleted successfully')
    })
})






    const PORT = process.env.PORT || 3001

    app.listen(PORT, () => {

        console.log(`Server started on PORT: ${PORT}`)

    })