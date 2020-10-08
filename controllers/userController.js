const registerValidator = require('../validators/registerValidator')
const loginValidator = require('../validators/loginValidator')

module.exports = {
	login(req,res){
			const {email,password}= req.body;
			const validate= loginValidator({email,password})
			if(!validate.isValid) {
				res.status(400).json(validate.error)
			}else {
				res.json({ messege:`Wellcome, Your new email is ${email}` })
			}
			
	},
	register(req,res) {
		const {name,email,password,confirmpassword} = req.body;
		const validate= registerValidator({name,email,password,confirmpassword})

		if(!validate.isValid) {
			res.status(400).json(validate.error)
		}
		else {
			res.status(200).json({
				messege:"FIne everything"
			})
		}
	}
}