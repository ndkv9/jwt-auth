const getSignup = (req, res) => {
	res.render('signup')
}

const postSignup = (req, res) => {
	const { username, password } = req.body

	res.send(' user created')
}

const getLogin = (req, res) => {
	res.render('login')
}

const postLogin = (req, res) => {
	const { username, password } = req.body

	res.send('user authenticated')
}

module.exports = { getLogin, postLogin, getSignup, postSignup }
