import { GEOCODE_API, weatherAPI } from "./config";
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

//used to format the data gotten frm the api
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

export function weatherResultFormat(weatherData) {
  if (!weatherData) return;

  const weatherResult = {
    daily: {
      tempMax: weatherData.daily.temperature_2m_max,
      tempMin: weatherData.daily.temperature_2m_min,
      time: weatherData.daily.time,
      units: {
        temp: weatherData.daily_units.temperature_2m_max,
      },
      weatherCode: weatherData.daily.weathercode,
    },

    hourly: {
      precipation: weatherData.hourly.precipitation,
      humidity: weatherData.hourly.relative_humidity_2m,
      temperature: weatherData.hourly.temperature_2m,
      time: weatherData.hourly.time,
      wind: weatherData.hourly.wind_speed_10m,
      units: {
        temp: weatherData.hourly_units.temperature_2m,
        humidity: weatherData.hourly_units.relative_humidity_2m,
        precipation: weatherData.hourly_units.precipation,
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

export async function getWeatherResults(object) {
  try {
    if (!object) return;

    const obj = object;
    console.log(obj);

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

export function getMainWeatherCardData() {
  const curDate = `T${new Date()
    .toISOString()
    .split(":")[0]
    .replace()}:00`.slice(1);

  const timeIndex = state.weatherRes.hourly?.time.findIndex(
    (time) => time === curDate
  );

  const temp = state.weatherRes.hourly?.temperature.at(timeIndex);
  const weatherCode = state.weatherRes.hourly?.weatherCode.at(timeIndex);
  console.log(weatherCode);

  const weatherType = weatherCodes
    .find((obj) => obj?.code.includes(weatherCode))
    .value.trim();

  const data = {
    temp,
    weatherType,
    date: state.curDate,
    city: `${Models.state.query.selectedCity?.city}, ${Models.state.query.selectedCity?.country}`,
    units: state.weatherRes.hourly.units?.temp,
  };

  return data;
}
