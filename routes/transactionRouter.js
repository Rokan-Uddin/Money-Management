const router = require('express').Router()
const {getAll,remove,update,getSingleTransaction,create} = require('../controllers/transactionController')

router.get('/',getAll)
router.post('/',create)
router.put('/:transactionID',update)
router.get('/:transactionID',getSingleTransaction)
router.delete('/:transactionID',remove)

module.exports = router