const router = require('express').Router()
const {getAll,remove,update,getSingleTransaction,create} = require('../controllers/transactionController')
const authenticate = require('../authenticate')

router.get('/',authenticate,getAll)
router.post('/',authenticate,create)
router.put('/:transactionID',authenticate,update)
router.get('/:transactionID',authenticate,getSingleTransaction)
router.delete('/:transactionID',authenticate,remove)

module.exports = router