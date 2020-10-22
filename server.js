require('dotenv').config();
const express =require('express')
const morgan =require('morgan')
const cors =require('cors')
const bodyParser = require('body-parser')
const mongoose =require('mongoose')

const PORT = 4000
const uri = process.env.MONGO_URL

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api/users/',require('./routes/userRouter'));
app.use('/api/transactions/',require('./routes/transactionRouter'))

app.get('/', (req,res)=> {
	res.json({
		messege:"Wellcome to Our Tutorial"
	})
})

app.listen(4000,()=> {
	console.log(`Server is running on ${PORT}`)
	mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology: true},  ()=> {
		console.log('Databae Connected ...')
	})
})