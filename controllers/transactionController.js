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
			User.findOneAndUpdate({_id:updatedUser._id},{ $set:updatedUser},{new:true})
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
		let currentUser= {...req.user._doc}
		let {_id} = req.user
		Transaction.find({author:_id})
		.then(transactions=> {
			if(transactions.length==0) {
				res.status(200).json({
					messege:'No Transaction found'
				})
			}
			else {
				res.status(200).json({
					transactions:transactions,
					user:currentUser
				})
			}
		})
		.catch(err=> res.status(400).json(err))
	},
	getSingleTransaction(req,res) {
		let {transactionId} = req.params
		Transaction.findOne({_id:transactionId})
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
		let {transactionID} = req.params;
		Transaction.findOne({_id:transactionID})
		.then(previousTransaction => {
			let previousType =previousTransaction.type;
			let previousAmount = previousTransaction.amount;

			Transaction.findOneAndUpdate({_id:transactionID},{$set:req.body},{new:true})
			.then(result => {
				let updatedUser= {...req.user._doc}
				if(previousType === 'income') {
					updatedUser.balance = updatedUser.balance - parseInt(previousAmount);
					updatedUser.income = updatedUser.income - parseInt(previousAmount);
				}
				else if(previousType ==='expense') {
					updatedUser.balance = updatedUser.balance + parseInt(previousAmount);
					updatedUser.expense = updatedUser.expense - parseInt(previousAmount)
				}
				if(result.type === 'income') {
					updatedUser.balance = updatedUser.balance + parseInt(result.amount);
					updatedUser.income = updatedUser.income + parseInt(result.amount)
				}
				else if(result.type === 'expense') {
					updatedUser.balance = updatedUser.balance - parseInt(result.amount);
					updatedUser.expense = updatedUser.expense + parseInt(result.amount)
				}
				User.findOneAndUpdate({_id:updatedUser._id},{$set:updatedUser},{new:true})
				.then(updateResult => {
					res.status(200).json({
						messege:'Updated Successfully',
						transaction:result,
						user:updateResult
					})
				})
				.catch(err=> console.log(err))
			})
			.catch(err=> console.log(err))
		})
		.catch(err=> console.log(err))
	},
	remove(req,res) {

		let {transactionID}= req.params
		Transaction.findOneAndDelete({_id:transactionID})
		.then(result=> {
			let {amount,type,note} = result
			let updatedUser= {...req.user._doc}
			updatedUser.transactions.splice (updatedUser.transactions.indexOf(transactionID), 1);
			//remove transaction from user array
			if(type==='income') {
				updatedUser.balance = updatedUser.balance - parseInt(amount);
				updatedUser.income = updatedUser.income - parseInt(amount);
			}
			else if(type === 'expense') {
				updatedUser.balance=updatedUser.balance + parseInt(amount);
				updatedUser.expense=updatedUser.expense - parseInt(amount);
			}
			User.findOneAndUpdate({_id:updatedUser._id},{ $set:updatedUser},{new:true})
			.then(responseUser => {
				res.status(200).json({
					messege:'Deleted Transaction and Updated User',
					user:responseUser,
					transaction:result
				})
			})
			.catch(err => res.json(err))
		})
		.catch(err=> res.status(200).json(err))
	}
}