export function calcFeelsLike(temp, humidity, wind) {
  if (temp >= 27)
    return (
      -8.784695 +
      1.61139411 * temp +
      2.338549 * humidity -
      0.14611605 * temp * humidity -
      0.01230809
    );

  if (temp <= 10 && wind > 4.8)
    return (
      13.12 +
      0.6215 * temp -
      11.37 * (wind ^ 0.16) +
      0.3965 * temp * (wind ^ 0.16)
    );

  return Math.round(temp);
}
