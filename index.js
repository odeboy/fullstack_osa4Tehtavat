const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose
	.connect(config.mongoUrl)
	.then( () => {
		console.log('connected to database', config.mongoUrl)
	})
	.catch(error => {
		console.log(error)
	})

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogRouter)

const PORT = config.port || 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})