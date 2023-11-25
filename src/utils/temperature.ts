export function fahrenheitTemperatureConverter(
  temperatureInFahrenheit: number,
  decimalPlaces: number = 1
): number {
  const temperatureInCelsius = (5 / 9) * (temperatureInFahrenheit - 32);
  return parseFloat(temperatureInCelsius.toFixed(decimalPlaces));
}
