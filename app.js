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
app.get('*', middleware.checkUser)
app.get('/', middleware.requiredAuth, (req, res) => res.render('home'))
app.get('/smoothies', middleware.requiredAuth, (req, res) =>
	res.render('smoothies')
)
app.use('/', authRoutes)

app.use(middleware.unknownEnpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
