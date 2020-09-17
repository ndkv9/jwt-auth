const User = require('../models/user')
const bcrypt = require('bcrypt')

const getSignup = (req, res) => {
	res.render('signup')
}

const postSignup = async (req, res) => {
	let { username, password } = req.body
	const saltRound = 10
	password = await bcrypt.hash(password, saltRound)
	const user = new User({ username, password })

	await user.save()
	res.status(201).json(user.toJSON())
}

const getLogin = (req, res) => {
	res.render('login')
}

const postLogin = (req, res) => {
	const { username, password } = req.body

	res.send('user authenticated')
}

module.exports = { getLogin, postLogin, getSignup, postSignup }
