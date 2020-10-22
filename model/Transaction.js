const mongoose= require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
	amount: {
		type:String,
		required:true
	},

	type: {
		type:String,
		required:true
	},
	note:String,
	author:{
		type:Schema.Types.ObjectId,
		ref:'User'
	}
},{timestamps:true})

const Transaction = mongoose.model('User',TransactionSchema)
module.exports = Transaction