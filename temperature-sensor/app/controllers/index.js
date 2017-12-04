const sensors = require('../data/mock/temperature-sensors');
const SensorController = require('./sensor/sensor');

const sensorController = new SensorController(sensors);

module.exports = sensorController;
