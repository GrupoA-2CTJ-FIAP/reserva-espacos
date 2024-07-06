const Reservation = require('../models/reservation')
const { Op } = require('sequelize')

exports.createReservation = async (req, res) => {
  try {
    const { spaceId, clientId, startDate, endDate } = req.body
    const totalHours = (new Date(endDate) - new Date(startDate)) / 36e5

    if (totalHours < 1 || totalHours > 8) {
      throw new Error('Reservation must be between 1 and 8 hours')
    }

    const conflictingReservations = await Reservation.findAll({
      where: {
        spaceId,
        status: true,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: startDate } },
              { endDate: { [Op.gte]: endDate } }
            ]
          }
        ]
      }
    })

    if (conflictingReservations.length > 0) {
      throw new Error('Conflicting reservation exists')
    }

    const reservation = await Reservation.create({ ...req.body, totalHours })
    res.status(201).json(reservation)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll()
    res.status(200).json(reservations)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params
    const { startDate, endDate } = req.body
    const totalHours = (new Date(endDate) - new Date(startDate)) / 36e5

    if (totalHours < 1 || totalHours > 8) {
      throw new Error('Reservation must be between 1 and 8 hours')
    }

    const [updated] = await Reservation.update(
      { ...req.body, totalHours },
      { where: { id } }
    )
    if (updated) {
      const updatedReservation = await Reservation.findOne({ where: { id } })
      res.status(200).json(updatedReservation)
    } else {
      throw new Error('Reservation not found')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await Reservation.update(
      { status: false },
      { where: { id } }
    )
    if (updated) {
      res.status(204).send()
    } else {
      throw new Error('Reservation not found')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
