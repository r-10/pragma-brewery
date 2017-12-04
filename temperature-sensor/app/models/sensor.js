/**
 * Sensor Class
 * TODO: Create sensors that are proven to work in temperatures below 0 degrees.
 *
 * It will emulate a real sensor that has a ideal limits that are configured.
 * It's possible to create a sensor that will never vary by assigning a 0% variance likelihood
 *  and/or 0% variance range.
 * On the other hand will can create a hectic scenarion with a very wild sensor that will
 *  vary 100% of the times with up to 100% variance as well.
 */
class Sensor {
  /**
   * Sensor class constructor
   * @param id - Sensor Id
   * @param minIdealTemperature - The minimum temperature that is considered to be ideal
   * @param maxIdealTemperature - The maximium temperature that is considered to be ideal
   * @param varianceLikelihood = % of likelihood that the temperature will vary. Between 0 and 1
   * @param varianceRange
   */
  constructor({
    id,
    minIdealTemperature,
    maxIdealTemperature,
    varianceLikelihood,
    varianceRange,
  }) {
    // Number.isNan won't work in this cases
    if ((typeof id !== 'number') || id <= 0) {
      throw new Error('Invalid id');
    }

    if ((typeof varianceLikelihood !== 'number') || varianceLikelihood < 0 || varianceLikelihood > 1) {
      throw new Error('Invalid variance likelihood');
    }

    if ((typeof varianceRange !== 'number') || varianceRange < 0 || varianceRange > 1) {
      throw new Error('Invalid variance range');
    }

    if ((typeof minIdealTemperature !== 'number') || minIdealTemperature <= 0) {
      throw new Error('Invalid minimum temperature');
    }

    if ((typeof maxIdealTemperature !== 'number') || maxIdealTemperature <= 0) {
      throw new Error('Invalid max temperature');
    }

    if (maxIdealTemperature < minIdealTemperature) {
      throw new Error('Invalid combination of min and max temperature');
    }
    this.id = id;
    this.minIdealTemperature = minIdealTemperature;
    this.maxIdealTemperature = maxIdealTemperature;
    this.varianceLikelihood = varianceLikelihood;
    this.varianceRange = varianceRange;
    this.initTemperature();
  }

  /**
   * Sets the initial value of the temperature measured in the sensor.
   * The initial value will be between the min and max (exclusive) temperatures.
   * Example:
   *  Minimum ideal temperature -> 3 degrees
   *  Maximum ideal temperature -> 5 degrees
   *
   *  ==> Initial temperature in between 3 and 4.99...
   */
  initTemperature() {
    this.temperature =
      (Math.random() * (this.maxIdealTemperature - this.minIdealTemperature)) +
        this.minIdealTemperature;
  }

  /**
   * Sets the new measured temperature taking into consideration its current value,
   *  the variance likelihood and the variance range.
   *  Example:
   *    Current temperature: 3.5 degrees
   *    Variance Likelihood: 80%
   *    Variange Range: 10%
   *
   *    There is 80% chance that the current value will change.
   *    If that occurs, then the temperature will vary within the variance range.
   *    Following the example, the new value would be between 2.7 and 3.3 (10% variance)
   */
  setTemperature() {
    if (this.varianceLikelihood >= (1 - Math.random())) {
      // The temperature will change...
      const minNewValue = this.temperature * (1 - this.varianceRange);
      const maxNewValue = this.temperature * (1 + this.varianceRange);

      this.temperature = (Math.random() * (maxNewValue - minNewValue)) + minNewValue;
    }
  }

  /**
   * In order to emulate a sensor, all the time the temperature is retrieved
   *  it will have a possibility to change the current value.
   * After calculating the new value, it will round up to 2 digits after the decimal place.
   * @returns {string}
   */
  getTemperature() {
    this.setTemperature();
    return Number(this.temperature).toFixed(2);
  }
}

module.exports = Sensor;
