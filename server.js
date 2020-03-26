let express = require('express')
let lowdb = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let bodyParser = require('body-parser')
let cors = require('cors')
let adapter = new FileSync('db.json')
let db = lowdb(adapter)

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Returns all users, just here to ensure the db is working well
app.get('/users', (req, res) => {
    let posts = db.get('users').value()
    return res.json(posts)
})


//User connexion
app.post('/login', (req, res) => {
    console.log(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'mot de passe et identifiants requis'
        });
    }
    let user = db.get('users').find({ email: req.body.email, password: req.body.password }).value()
    if (!user) {
        return res.status(200).json({
            return : false
        });
    }
    return res.status(201).json(user)
});

// User inscription, write users informations in db
app.post('/signin', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.birthday || !req.body.gender) {
        return res.status(400).json({
            message: 'informations incomplètes'
        })
    }

    let newUser = {
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        gender: req.body.gender
    }

    if (db.get('users').find({ email: req.body.email }).value()) {
        return res.status(400).json({
            message: 'email already exists'
        })
    }
    db.get('users')
        .push(newUser)
        .write()
    console.log(newUser)
    return res.json({ message: 'Inscription réussie' });
})

app.listen(8001, () => {
    console.log('Server running on http://localhost:8001')
})
