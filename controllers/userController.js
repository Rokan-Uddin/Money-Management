const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const registerValidator = require('../validators/registerValidator')
const loginValidator = require('../validators/loginValidator')
const User = require('../model/User')
module.exports = {
	login(req,res){
			const {email,password}= req.body;
			const validate= loginValidator({email,password})
			if(!validate.isValid) {
				res.status(400).json(validate.error)
			}else {
				User.findOne({email})
				.then(user=> {
					if(!user) {
						res.status(400).json({
							messege:"User not found"
						})
					}
					bcrypt.compare( password,user.password, (err,result)=> {
						if(err) {
							res.status(400).json({messege:"something is wrong"})
						}
						if(!result) {
							res.json({messege:"password wrong"})
						}						
						if(result) {
							const token=jwt.sign({
								_id:user._id,
								name:user.name,
								email:user.email,
								amount:user.amount,
								balance:user.balance,
								expense:user.expense,
								transactions:user.transactions
							},'SECRET',{expiresIn:'2h'})

							res.json({
								messege:"Successfully Login",
								token:`Bearer ${token}`
							})
						}
					})
				})
				.catch(error=> {
					res.status(400).json(error)
				})
			}
			
	},
	register(req,res) {
		const {name,email,password,confirmPassword} = req.body;
		const validate= registerValidator({name,email,password,confirmPassword})

		if(!validate.isValid) {
			res.status(400).json(validate.error)
		}
		else {
			User.findOne({email})
			.then(user=> {
				if(user){
					res.json({
						messege:'Email already exists'
					})
				}
				else {
					bcrypt.hash(password,11,(err,hash)=> {
						if(err) {
							return res.status(500).json({ messege:'Server problem' })
						}
						const user = new User({
							name,
							email,
							password:hash,
							balance:0,
							income:0,
							expense:0,
							transactions:[]
						})
						user.save()
						.then(user=> {
							res.status(200).json({
								messege:"User created Successfully",
								user
							})
						})
					})
				}
			})
			.catch(error=> {
				res.status(500).json({
					messege:'Server problem'
				})
			})
		}
	},
	getuser(req,res) {
		User.find()
		.then(user => {
			res.status(200).json(user)
		})
		.catch(err=> res.status(200).json(err))
	}
}