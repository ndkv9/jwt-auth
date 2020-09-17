const unknownEnpoint = (req, res) => {
	res.status(404).json({ error: 'unsupported enpoint' })
}

const errorHandler = (err, req, res, next) => {
	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' })
	}

	console.error(err.message)
	next(err)
}

module.exports = { unknownEnpoint, errorHandler }
