const expect = require('chai').expect;

const SensorController = require('./sensor');

describe('Sensor Controller', function() {
  let sensorController;

  before(function() {
    const sensors = [
      {
        id: 1,
        minIdealTemperature: 3,
        maxIdealTemperature: 5,
        varianceLikelihood: 0.8,
        varianceRange: 0.1,
      }
    ];

    sensorController = new SensorController(sensors);
  });

  it('should return error when retrieving information on a given non-existing sensor', async function () {
    const nonExistingId = -1;
    sensorController.getTemperature(nonExistingId)
      .then(() => { throw new Error('TEST ERROR - Should not return sensor'); })
      .catch(err => expect(err).to.have.property('message').equal('Sensor not found.'));
  });

  it('should successfully return the temperature of a given existing sensor', function () {
    const existingId = 1;
    sensorController.getTemperature(existingId)
      .then((temperature) => { expect(temperature).to.be.a('number'); })
  });

  it('should successfully return the temperature of all sensors connected to controller', function () {
    sensorController.getAllTemperatures()
      .then((temperatures) => {
        expect(temperatures).to.be.an('array').of.length(1);
        expect(temperatures[0]).to.have.property('id');
        expect(temperatures[0]).to.have.property('temperature');
      })
  });
});
