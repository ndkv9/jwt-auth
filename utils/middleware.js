const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEnpoint = (req, res) => {
	res.status(404).json({ error: 'unsupported enpoint' })
}

const errorHandler = (err, req, res, next) => {
	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (err.name === 'ValidationError') {
		let errors = { username: '', password: '' }

		// validation errors
		Object.values(err.errors).map(({ properties }) => {
			errors[properties.path] = properties.message
		})

		return res.status(400).json({ error: errors })
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).redirect('/login')
	} else if (err.message === 'incorrect username') {
		const error = { username: 'incorrect username' }
		return res.status(401).json({ error })
	} else if (err.message === 'incorrect password') {
		const error = { password: 'incorrect password' }
		return res.status(401).json({ error })
	}

	console.error(err.message)
	next(err)
}

const requiredAuth = (req, res, next) => {
	const token = req.cookies.token
	jwt.verify(token, process.env.SECRET)
	next()
}

// check users
const checkUser = (req, res, next) => {
	const token = req.cookies.token

	if (token) {
		jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null
				next()
			} else {
				let user = await User.findById(decodedToken.id)
				res.locals.user = user
				next()
			}
		})
	} else {
		res.locals.user = null
		next()
	}
}

module.exports = { unknownEnpoint, errorHandler, requiredAuth, checkUser }
