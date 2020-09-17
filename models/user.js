const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
	user: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
})

userSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id
		delete ret._id
		delete ret.__v
	},
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
