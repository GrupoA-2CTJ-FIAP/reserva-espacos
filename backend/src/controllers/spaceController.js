const Space = require('../models/space')

exports.createSpace = async (req, res) => {
  try {
    const { name, capacity, description } = req.body
    const space = await Space.create({ name, capacity, description })
    res.status(201).json(space)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getSpaces = async (req, res) => {
  try {
    const spaces = await Space.findAll()
    res.status(200).json(spaces)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.updateSpace = async (req, res) => {
  try {
    const { id } = req.params
    const { name, capacity, description } = req.body
    const [updated] = await Space.update(
      { name, capacity, description },
      { where: { id } }
    )
    if (updated) {
      const updatedSpace = await Space.findOne({ where: { id } })
      res.status(200).json(updatedSpace)
    } else {
      throw new Error('Space not found')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteSpace = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Space.destroy({ where: { id } })
    if (deleted) {
      res.status(204).send()
    } else {
      throw new Error('Space not found')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
