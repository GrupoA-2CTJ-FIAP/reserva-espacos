const express = require('express')
const router = express.Router()
const spaceController = require('../controllers/spaceController')

router.post('/spaces', spaceController.createSpace)
router.get('/spaces', spaceController.getSpaces)
router.put('/spaces/:id', spaceController.updateSpace)
router.delete('/spaces/:id', spaceController.deleteSpace)

module.exports = router
