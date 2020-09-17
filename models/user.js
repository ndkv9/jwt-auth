const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Please enter a username'],
		unique: true,
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

module.exports = mongoose.model('User', userSchema)
