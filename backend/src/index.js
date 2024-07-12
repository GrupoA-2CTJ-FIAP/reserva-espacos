const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const sequelize = require('./config/database');
const spaceRoutes = require('./routes/spaceRoutes');
const clientRoutes = require('./routes/clientRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors()); // Add the cors middleware
app.use(bodyParser.json());

app.use('/api', spaceRoutes);
app.use('/api', clientRoutes);
app.use('/api', reservationRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => console.log(error));