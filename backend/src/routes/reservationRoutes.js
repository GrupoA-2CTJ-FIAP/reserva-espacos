const express = require('express')
const router = express.Router()
const reservationController = require('../controllers/reservationController')

router.post('/reservations', reservationController.createReservation)
router.get('/reservations', reservationController.getReservations)
router.put('/reservations/:id', reservationController.updateReservation)
router.put('/reservations/:id/cancel', reservationController.cancelReservation)

module.exports = router
