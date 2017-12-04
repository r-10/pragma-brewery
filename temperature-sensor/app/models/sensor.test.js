const expect = require('chai').expect;

const Sensor = require('./sensor');

describe('Sensor Model', function() {
  let sensor;

  beforeEach(function() {
    sensor = new Sensor({
      id: 1,
      minIdealTemperature: 3,
      maxIdealTemperature: 5,
      varianceLikelihood: 0.8,
      varianceRange: 0.1,
    });
  });

  it('should create the sensor properly', async function() {
    expect(sensor).to.have.property('id').equal(1);
    expect(sensor).to.have.property('temperature').at.least(3);
    expect(sensor).to.have.property('temperature').at.most(5);
  });

  it('should throw an error if Id is not a number', function () {
    try {
      const sensor = new Sensor({
        id: 'invalid',
        minIdealTemperature: 3,
        maxIdealTemperature: 5,
        varianceLikelihood: 0.8,
        varianceRange: 0.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid Id');
    } catch (err) {
      expect(err.message).equal('Invalid id');
    }
  });

  it('should throw an error if Id is 0', function () {
    try {
      const sensor = new Sensor({
        id: 0,
        minIdealTemperature: 3,
        maxIdealTemperature: 5,
        varianceLikelihood: 0.8,
        varianceRange: 0.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid Id');
    } catch (err) {
      expect(err.message).equal('Invalid id');
    }
  });

  it('should throw an error if Id is negative', function () {
    try {
      const sensor = new Sensor({
        id: -10,
        minIdealTemperature: 3,
        maxIdealTemperature: 5,
        varianceLikelihood: 0.8,
        varianceRange: 0.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid Id');
    } catch (err) {
      expect(err.message).equal('Invalid id');
    }
  });

  it('should throw an error if variance likelihood is not between 0% and 100%', function () {
    try {
      const sensor = new Sensor({
        id: 1,
        minIdealTemperature: 3,
        maxIdealTemperature: 5,
        varianceLikelihood: 1.1,
        varianceRange: 0.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid variance likelihood');
    } catch (err) {
      expect(err.message).equal('Invalid variance likelihood');
    }
  });

  it('should throw an error if variance range is not between 0% and 100%', function () {
    try {
      const sensor = new Sensor({
        id: 1,
        minIdealTemperature: 3,
        maxIdealTemperature: 5,
        varianceLikelihood: 0.8,
        varianceRange: 1.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid variance range');
    } catch (err) {
      expect(err.message).equal('Invalid variance range');
    }
  });

  it('should throw an error if minimum temperature is not greater than 0', function () {
    try {
      const sensor = new Sensor({
        id: 1,
        minIdealTemperature: 0,
        maxIdealTemperature: 5,
        varianceLikelihood: 0.8,
        varianceRange: 0.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid min temperature');
    } catch (err) {
      expect(err.message).equal('Invalid minimum temperature');
    }
  });

  it('should throw an error if maximum temperature is not greater than 0', function () {
    try {
      const sensor = new Sensor({
        id: 1,
        minIdealTemperature: 3,
        maxIdealTemperature: 0,
        varianceLikelihood: 0.8,
        varianceRange: 0.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid max temperature');
    } catch (err) {
      expect(err.message).equal('Invalid max temperature');
    }
  });

  it('should throw an error if min/max temperature range is invalid', function () {
    try {
      const sensor = new Sensor({
        id: 1,
        minIdealTemperature: 10,
        maxIdealTemperature: 3,
        varianceLikelihood: 0.8,
        varianceRange: 0.1,
      });

      throw new Error('TEST ERROR - Should not create sensor with invalid min/max temperature range');
    } catch (err) {
      expect(err.message).equal('Invalid combination of min and max temperature');
    }
  });
});
