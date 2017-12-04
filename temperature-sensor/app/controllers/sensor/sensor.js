const Sensor = require('../../models/sensor');

class SensorController {
  constructor(temperatureSensors) {
    this.temperatureSensors = temperatureSensors.map(sensor => new Sensor(sensor));
  }

  getSensorTemperature(sensorId) {
    if ((typeof sensorId !== 'number') || sensorId <= 0) {
      throw new Error('Invalid id');
    }

    const sensorFound = this.temperatureSensors.find(sensor => sensor.id === sensorId);
    if (!sensorFound) {
      throw new Error('Sensor not found');
    }

    return sensorFound.getTemperature();
  }

  getAllSensorTemperatures() {
    return this.temperatureSensors.map(sensor => ({
      id: sensor.id,
      temperature: sensor.getTemperature(),
    }));
  }
}

module.exports = SensorController;
