const Transaction= require('../model/Transaction')
const User = require('../model/User')

module.exports= {
	create(req,res)  {
		let {amount,type,note} = req.body;
		let userId= req.user._id;

		let transaction = new Transaction({
			amount,type,note,author:userId
		})

		transaction.save()
		.then(trans => {
			let updatedUser= {...req.user._doc}
			if(type==='income') {
				updatedUser.balance = updatedUser.balance + parseInt(amount);
				updatedUser.income = updatedUser.income + parseInt(amount);
			}
			else if(type === 'expense') {
				updatedUser.balance=updatedUser.balance - parseInt(amount);
				updatedUser.expense=updatedUser.expense + parseInt(amount);
			}
			updatedUser.transactions.unshift(trans._id)
			User.findByIdAndUpdate({_id:updatedUser._id},{ $set:updatedUser},{new:true})
			.then(result => {
				res.status(201).json({
				messege:'Transaction Created Successfully',
				...trans._doc,
				user:result 
			})
			})
			.catch(err => {
				res.status(201).json(err)
			})

		})
		.catch(err=>res.status(400).json(err))
	},
	getAll(req,res) {
		let {_id} = req.user
		Transaction.find({author:_id})
		.then(transactions=> {
			if(transactions.length==0) {
				res.status(200).json({
					messege:'No Transaction found'
				})
			}
			else {
				res.status(200).json(transactions)
			}
		})
		.catch(err=> res.status(400).json(err))
	},
	getSingleTransaction(req,res) {
		let {transactionId} = req.params
		Transaction.findById(transactionId)
		.then(single=> {
			if(single) {
				res.status(200).json(single)
			}
			else {
				res.status(200).json({
					messege:'No Transaction found'
				})
			}
		})
		.catch(err=> res.status(400).json(err))
	},
	update(req,res) {
		let {transactionId}= req.params
		Transaction.findByIdAndUpdate(transactionId,{$set:req.body},{new:true})
		.then(result => {
			res.status(200).json({
				messege:'Updated Successfully',
				...result._doc
			})
		})
		.catch(err=> res.status(200).json(err))
	},
	remove(req,res) {
		
		let {transactionId}= req.params
		Transaction.findOneAndDelete({type:'income'})
		.then(result=> {
			console.log(result);
			res.status(200).json({
				messege:'Deleted Successfully',
				...result._doc
			})
		})
		.catch(err=> res.status(200).json(err))
	}
}