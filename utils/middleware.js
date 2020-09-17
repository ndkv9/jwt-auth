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

		return res.status(400).json(errors)
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' })
	}

	console.error(err.message)
	next(err)
}

module.exports = { unknownEnpoint, errorHandler }
