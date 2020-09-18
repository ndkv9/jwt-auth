const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = id => {
	return jwt.sign({ id }, process.env.SECRET, { expiresIn: 3600 * 24 })
}

const getSignup = (req, res) => {
	res.render('signup')
}

const postSignup = async (req, res) => {
	let { username, password } = req.body

	const user = new User({ username, password })

	const savedUser = await user.save()
	const token = createToken(savedUser._id)
	res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 3600 * 24 })
	res.status(201).json(savedUser.toJSON())
}

const getLogin = (req, res) => {
	res.render('login')
}

const postLogin = (req, res) => {
	const { username, password } = req.body

	res.send('user authenticated')
}

module.exports = { getLogin, postLogin, getSignup, postSignup }
