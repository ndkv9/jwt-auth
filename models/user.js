const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Please enter a username'],
		unique: true,
		minlength: [6, 'minimum username length is 6 characters'],
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, 'Please enter password'],
		minlength: [6, 'minimum password length is 6 characters'],
	},
})

userSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id
		delete ret._id
		delete ret.__v
		delete ret.password
	},
})

userSchema.plugin(uniqueValidator, { message: 'expected {PATH} to be unique' })
userSchema.pre('save', async function () {
	const saltRound = 10
	this.password = await bcrypt.hash(this.password, saltRound)
})
module.exports = mongoose.model('User', userSchema)
