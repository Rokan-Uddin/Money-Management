var validator = require('validator');
const validate = user => {
	const error = {}
	if(!user.name) {
		error.name="Please provide your name"
	}
	if(!user.email) {
		error.email="Please provide your email"
	}
	else if(!validator.isEmail(user.email)){
		error.email="Email isn\'t valid"
	}
	if(!user.password){
		error.password="Please provide your password"
	}
	else if(user.password.length <6) {
		error.password =" Password must be largh than 6"
	} 
	else if(user.password != user.confirmPassword) {
		error.password ="Password does\'t match"
	}

	return {
		error,
		isValid:Object.keys(error).length==0
	}
}
module.exports = validate 