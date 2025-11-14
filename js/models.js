import { GEOCODE_API, weatherAPI } from "./config";
import { calcFeelsLike } from "./helper";
import { units } from "./icons";
import { weatherCodes } from "./weatherCode";

export const state = {
  geoCodeRes: [],
  weatherRes: {},
  curDate: "",
  curTime: "",

  query: {
    queryValue: "",
    selectedCity: {},
  },
};

const options = {
  weekday: "long",
  month: "long",
  year: "numeric",
  day: "numeric",
};

const curDate = new Intl.DateTimeFormat("en-UK", options).format().split(" ");
// const curTime = new Date().getHours().toString();
// state.curTime = curTime;
state.curDate = [curDate[0], curDate.slice(1, 3).join(" "), curDate[3]].join(
  ", "
);

//used to format the data gotten frm the geo-code api
export function geoResultFormat(geodata) {
  if (!geodata) return;

  const geoResult = [];

  const unformattedResult = geodata?.results.slice(0, 5);

  unformattedResult.forEach((obj) => {
    geoResult.push({
      id: obj.id,
      city: obj.name,
      latitude: obj.latitude,
      longitude: obj.longitude,
      timezone: obj.timezone,
      country: obj.country,
    });
  });

  state.geoCodeRes = geoResult;
}

//used to format the data gotten frm the weather Api
export function weatherResultFormat(weatherData) {
  if (!weatherData) return;

  const weatherResult = {
    daily: {
      tempMax: weatherData.daily.temperature_2m_max,
      tempMin: weatherData.daily.temperature_2m_min,
      time: weatherData.daily.time,
      units: {
        temp: weatherData.daily_units.temperature_2m_max.slice(0, 1),
      },
      weatherCode: weatherData.daily.weathercode,
    },

    hourly: {
      precipitation: weatherData.hourly.precipitation,
      humidity: weatherData.hourly.relative_humidity_2m,
      temperature: weatherData.hourly.temperature_2m,
      time: weatherData.hourly.time,
      wind: weatherData.hourly.wind_speed_10m,
      units: {
        temp: weatherData.hourly_units.temperature_2m.slice(0, 1),
        humidity: weatherData.hourly_units.relative_humidity_2m,
        precipitation: weatherData.hourly_units.precipitation,
        wind: weatherData.hourly_units.wind_speed_10m,
      },
      weatherCode: weatherData.hourly.weathercode,
    },
  };

  console.log(weatherResult);

  state.weatherRes = weatherResult;
}

//provides query results from the api
export async function getGeoResults(query) {
  try {
    state.query.queryValue = query;

    const res = await fetch(`${GEOCODE_API}?name=${query}`);
    if (!res.ok) throw new Error("Request error " + res.status);

    const data = await res.json();
    if (!data.results) throw new Error(`City not found status 404`);

    geoResultFormat(data);
  } catch (err) {
    throw err;
  }
}

//used to get the obj of the selected city's id
export async function getSelectedCityObj(id) {
  if (!id) return;

  const [cityObj] = state.geoCodeRes.filter((obj) => obj.id === +id);

  state.query.selectedCity = cityObj;

  await getWeatherResults(cityObj);
}

//to retrieve the weather data from the weather api by passing the lat,lng & timezone
export async function getWeatherResults(object) {
  try {
    if (!object) return;

    const obj = object;

    const res = await fetch(
      weatherAPI(obj?.latitude, obj?.longitude, obj?.timezone)
    );

    const data = await res.json();
    // console.log(data);

    weatherResultFormat(data);
  } catch (err) {
    throw err;
  }
}

const curDateTime = `T${new Date()
  .toISOString()
  .split(":")[0]
  .replace()}:00`.slice(1);

const timeIndex = state.weatherRes.hourly?.time.findIndex(
  (time) => time === curDateTime
);

//to format the kind of data we'll display on our mainWeatheCard-Ui
export function getMainWeatherCardData() {
  const temp = state.weatherRes.hourly?.temperature.at(timeIndex);
  const weatherCode = state.weatherRes.hourly?.weatherCode.at(timeIndex);

  const weatherType = weatherCodes
    .find((obj) => obj?.code.includes(weatherCode))
    .value.trim();

  const data = {
    temp: Math.round(temp),
    weatherType,
    date: state.curDate,
    city: `${state.query.selectedCity?.city}, ${state.query.selectedCity?.country}`,
    units: state.weatherRes.hourly.units?.temp,
  };
  getWeatherConditions();

  return data;
}

//used to group the data of the current hour weather condition
export function getWeatherConditions() {
  const humidity = state.weatherRes.hourly.humidity.at(timeIndex);
  const precipitation = state.weatherRes.hourly.precipitation.at(timeIndex);
  const wind = state.weatherRes.hourly.wind.at(timeIndex);
  const temp = state.weatherRes.hourly.temperature.at(timeIndex);

  const feelsLike = calcFeelsLike(temp, humidity, wind);

  const data = {
    humidity,
    precipitation,
    wind: Math.round(wind),
    feelsLike: Math.round(feelsLike),
    units: {
      humidity: state.weatherRes.hourly.units.humidity,
      precipitation: state.weatherRes.hourly.units.precipitation,
      wind: state.weatherRes.hourly.units.wind,
      feelsLike: state.weatherRes.hourly.units.temp,
    },
  };

  getDailyForecast();

  return data;
}

export function getDailyForecast() {
  const date = state.weatherRes.daily.time.map((date) => {
    const day = new Date(date);
    const weekday = day.toLocaleString("en-US", {
      weekday: "short",
    });

    return weekday;
  });

  const tempMin = state.weatherRes.daily.tempMin;
  const tempMax = state.weatherRes.daily.tempMax;

  const weatherType = state.weatherRes.daily.weatherCode.map((code) => {
    return weatherCodes.find((obj) => obj.code.includes(code)).value;
  });

  const data = {
    date,
    tempMin,
    tempMax,
    weatherType,
  };

  const groupedDate = data.date.map((day, i) => ({
    day,
    tempMin: data.tempMin[i],
    tempMax: data.tempMax[i],
    weatherType: data.weatherType[i],
    unit: state.weatherRes.daily.units.temp,
  }));

  return groupedDate;
}
