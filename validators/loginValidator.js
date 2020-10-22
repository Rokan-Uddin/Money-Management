var validator = require('validator');
const validate = user => {
	const error = {}
	if(!user.email) {
		error.email="Please provide your email"
	}
	else if(!validator.isEmail(user.email)){
		error.email="Email isn\'t valid"
	}
	if(!user.password){
		error.password="Please provide your password"
	}

	return {
		error,
		isValid:Object.keys(error).length==0
	}
}
module.exports = validate 