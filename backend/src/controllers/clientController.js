const Client = require('../models/client')

exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body)
    res.status(201).json(client)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll()
    res.status(200).json(clients)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await Client.update(req.body, { where: { id } })
    if (updated) {
      const updatedClient = await Client.findOne({ where: { id } })
      res.status(200).json(updatedClient)
    } else {
      throw new Error('Client not found')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Client.destroy({ where: { id } })
    if (deleted) {
      res.status(204).send()
    } else {
      throw new Error('Client not found')
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
