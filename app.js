require('dotenv').config()
require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express()

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.use('/', authRoutes)

// view engine
app.set('view engine', 'ejs')

// database connection
const dbURI = process.env.MONGODB_URI

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(result => console.log('connected to MongoDB'))
	.catch(err => console.log(err))

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))

app.get('/set-cookies', (req, res) => {
	//res.setHeader('Set-Cookie', 'newUser=true')

	res.cookie('newUser', false)
	res.cookie('isEmployee', true, {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,
	})
	res.send('you got the cookies')
})

app.get('/get-cookies', (req, res) => {
	const cookies = req.cookies
	res.json(cookies)
})

app.use(middleware.unknownEnpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
