const router = require('express').Router()
const {login,register,getuser} = require('../controllers/userController')

router.post('/register',register)
router.post('/login',login)
router.get('/getuser',getuser)
module.exports = router