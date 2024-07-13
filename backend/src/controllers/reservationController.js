const Reservation = require('../models/reservation')
const Space = require('../models/space')
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
    const reservations = await Reservation.findAll({
      where: { status: true },
      include: [{ model: Space, attributes: ['name'] }]
    })

    const result = reservations.map(reservation => {
      return {
        id: reservation.id,
        spaceId: reservation.spaceId,
        clientId: reservation.clientId,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        status: reservation.status,
        totalHours: reservation.totalHours,
        spaceName: reservation.Space.name
      }
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params

    const reservation = await Reservation.findOne({
      where: { id, status: true },
      include: [{ model: Space, attributes: ['name'] }]
    })

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' })
    }

    const result = {
      id: reservation.id,
      spaceId: reservation.spaceId,
      clientId: reservation.clientId,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      status: reservation.status,
      totalHours: reservation.totalHours,
      spaceName: reservation.Space.name
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params
    const { spaceId, startDate, endDate } = req.body
    const totalHours = (new Date(endDate) - new Date(startDate)) / 36e5

    if (totalHours < 1 || totalHours > 8) {
      throw new Error('Reservation must be between 1 and 8 hours')
    }

    const currentReservation = await Reservation.findOne({ where: { id } })
    if (!currentReservation) {
      throw new Error('Reservation not found')
    }

    const conflictingReservations = await Reservation.findAll({
      where: {
        spaceId: spaceId || currentReservation.spaceId,
        id: { [Op.ne]: id },
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
