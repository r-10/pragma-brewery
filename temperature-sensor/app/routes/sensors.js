const express = require('express');

const sensorController = require('../controllers');

const router = express.Router();

/* GET sensor temperature given its ID. */
router.get('/:id/temperature', (req, res, next) => {
  const sensorId = req.params.id;

  res.json(sensorController.getSensorTemperature(sensorId));
});

/* GET users listing. */
router.get('/temperatures', (req, res, next) => {
  res.json(sensorController.getAllSensorTemperatures());
});

module.exports = router;
