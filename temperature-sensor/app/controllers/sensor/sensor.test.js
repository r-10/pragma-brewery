const expect = require('chai').expect;
const SensorController = require('./sensor');

const mockSensors = [
  {
    id: 1,
    minIdealTemperature: 3,
    maxIdealTemperature: 5,
    varianceLikelihood: 0.8,
    varianceRange: 0.1,
  }
];

const sensorController = new SensorController(mockSensors);

describe('Sensor Controller', function() {
  it('should return error when retrieving information on a given invalid sensor id', function() {
    const nonExistingId = -1;
    try {
      sensorController.getSensorTemperature(nonExistingId);
      throw new Error('TEST ERROR - Should not return sensor');
    } catch (err) {
      expect(err).to.have.property('message').equal('Invalid id');
    }
  });

  it('should return error when retrieving information on a given non-existing sensor', function() {
    const nonExistingId = 34534234;
    try {
      sensorController.getSensorTemperature(nonExistingId);
      throw new Error('TEST ERROR - Should not return sensor');
    } catch (err) {
      expect(err).to.have.property('message').equal('Sensor not found');
    }
  });

  it('should successfully return the temperature of a given existing sensor', function() {
    const existingId = 1;
    const temperature = sensorController.getSensorTemperature(existingId);

    expect(Number(temperature)).to.be.a('number');
  });

  it('should successfully return the temperature of all sensors connected to controller', function() {
    const temperatures = sensorController.getAllSensorTemperatures();

    expect(temperatures).to.be.an('array').of.length(1);
    expect(temperatures[0]).to.have.property('id');
    expect(temperatures[0]).to.have.property('temperature');
  });
});
