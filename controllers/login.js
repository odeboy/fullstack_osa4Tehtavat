const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
	const body = req.body
    
	const user = await User.findOne({ username: body.username })
	console.log(user)
	const passwordCorrect = user === null ? 
		false :
		await bcrypt.compare(body.passwordHash, user.passwordHash)
    
	if ( !(user && passwordCorrect)) {
		if (!passwordCorrect) {
			return res.status(401).send({ error: 'invalid password' })
		} else {
			return res.status(401).send({ error: 'invalid username' })	
		}
	}

	const userForToken = {
		username: user.username,
		id: user._id
	}

	const token = jwt.sign(userForToken, process.env.SECRET)

	res.status(200).send({ token, username: user.username, name: user.name, id: user._id })
})


module.exports = loginRouter