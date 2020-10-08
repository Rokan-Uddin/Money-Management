module.exports = {
	login(req,res){
			const name = req.body.name;
			const email = req.body.email;
			res.json({ messege:`Well ${name}, Your new email is ${email}` })
	}
}