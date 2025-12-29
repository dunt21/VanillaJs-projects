import * as Models from "./models";

export function calcFeelsLikeMetric(temp, humidity, wind) {
  if (temp >= 27)
    return (
      -8.784695 +
      1.61139411 * temp +
      2.338549 * humidity -
      0.14611605 * temp * humidity -
      0.012308094 * temp * temp -
      0.016424828 * humidity * humidity +
      0.002211732 * temp * temp * humidity +
      0.00072546 * temp * humidity * humidity -
      0.000003582 * temp * temp * humidity * humidity
    );

  if (temp <= 10 && wind > 4.8)
    return (
      13.12 +
      0.6215 * temp -
      11.37 * (wind / 3.6) ** 0.16 +
      0.3965 * temp * (wind / 3.6) ** 0.16
    );

  return Math.round(temp);
}

export function calcFeelsLikeImperial(t, h, w) {
  if (t >= 80) {
    return (
      -42.379 +
      2.04901523 * t +
      10.14333127 * h -
      0.22475541 * t * h -
      0.00683783 * t * t -
      0.05481717 * h * h +
      0.00122874 * t * t * h +
      0.00085282 * t * h * h -
      0.00000199 * t * t * h * h
    );
  }

  if (t <= 50 && w > 3) {
    return 35.74 + 0.6215 * t - 35.75 * w ** 0.16 + 0.4275 * t * w ** 0.16;
  }

  return t;
}

export default function calcToImperialMetric(unitType, t, p, w, h) {
  let results = {};

  if (unitType === "imperial") {
    const temp = Math.round(t * (9 / 5) + 32);
    const wind = Math.round(w / 1.609);
    const precipitation = Math.round(p / 25.4);
    const feelsLike = calcFeelsLikeImperial(temp, h, wind);

    results = {
      temp,
      wind,
      precipitation,
      humidity: h,
      feelsLike: Math.round(feelsLike),
      units: {
        humidity: Models.state.weatherRes.hourly.units.humidity,
        feelsLike: Models.state.weatherRes.hourly.units.temp,
        wind: "mph",
        precipitation: "in",
      },
    };

    return results;
  }

  const feelsLike = calcFeelsLikeMetric(t, h, w);

  results = {
    humidity: h,
    precipitation: p,
    wind: Math.round(w),
    feelsLike: Math.round(feelsLike),
    units: {
      humidity: Models.state.weatherRes.hourly.units.humidity,
      precipitation: Models.state.weatherRes.hourly.units.precipitation,
      wind: Models.state.weatherRes.hourly.units.wind,
      feelsLike: Models.state.weatherRes.hourly.units.temp,
    },
  };

  return results;
}
