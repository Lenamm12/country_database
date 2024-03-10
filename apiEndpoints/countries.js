const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace 'your_database_connection_string' with your actual database connection string
const sequelize = new Sequelize('your_database_connection_string');

// Define Country model
const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Define endpoint to get all countries
app.get('/countries', async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sync database and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connected to database successfully.');

    // Sync models with database
    await Country.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
