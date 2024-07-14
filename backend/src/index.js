const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./config/database')
const spaceRoutes = require('./routes/spaceRoutes')
const clientRoutes = require('./routes/clientRoutes')
const reservationRoutes = require('./routes/reservationRoutes')
const initializeDatabase = require('./scripts/initializeDatabase')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', spaceRoutes)
app.use('/api', clientRoutes)
app.use('/api', reservationRoutes)

sequelize
  .sync()
  .then(async () => {
    console.log('Database & tables created!')

    // Inicializa o banco de dados e popula com dados padrão
    await initializeDatabase()

    app.listen(3000, () => {
      console.log('Server is running on port 3000')
    })
  })
  .catch(error => console.log(error))
