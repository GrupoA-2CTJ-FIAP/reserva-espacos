const Client = require('../models/client')

const initializeDatabase = async () => {
  try {
    // Sincroniza os modelos com o banco de dados
    await Client.sync({ force: true }) // force: true recria o banco de dados, remova para produção

    // Verifica se o cliente "admin" já existe
    const adminClient = await Client.findOne({
      where: { email: 'admin@admin.com' }
    })

    // Se não existir, cria o cliente "admin"
    if (!adminClient) {
      await Client.create({
        id: 1,
        name: 'admin',
        email: 'admin@admin.com'
      })
      console.log('Admin client created')
    } else {
      console.log('Admin client already exists')
    }
  } catch (error) {
    console.error('Error initializing the database:', error)
  }
}

module.exports = initializeDatabase
