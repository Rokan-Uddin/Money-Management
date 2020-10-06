const express =require('express')
const PORT = process.env.PORT || 4000
const app = express()

app.get('/', (req,res)=> {
	res.json({
		messege:"Wellcome to Our Tutorial"
	})
})

app.listen(4000,()=> {
	console.log(`Server is running on ${PORT}`)
})