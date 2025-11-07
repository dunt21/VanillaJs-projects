import { GEOCODE_API, weatherAPI } from "./config";
import { units } from "./icons";

export const state = {
  query: {
    queryValue: "",
    geoCodeRes: [],
    weatherRes: {},
  },
};

//used to format the data gotten frm the api
export function geoResultFormat(geodata) {
  const geoResult = [];

  const unformattedResult = geodata.results.slice(0, 5);

  unformattedResult.forEach((obj) => {
    geoResult.push({
      id: obj.id,
      city: obj.name,
      latitude: obj.latitude,
      longitude: obj.longitude,
      timezone: obj.timezone,
    });
  });

  state.query.geoCodeRes = geoResult;
}

export function weatherResultFormat(weatherData) {
  // console.log(weatherData);

  const unformattedResult = {
    daily: {
      tempMax: weatherData.daily.temperature_2m_max,
      tempMin: weatherData.daily.temperature_2m_min,
      time: weatherData.daily.time,
      units: {
        temp: weatherData.daily_units.temperature_2m_max,
      },
    },

    hourly: {
      precipation: weatherData.hourly.precipitation.slice(0, 8),
      humidity: weatherData.hourly.relative_humidity_2m.slice(0, 8),
      temperature: weatherData.hourly.temperature_2m.slice(0, 8),
      time: weatherData.hourly.time.slice(0, 8),
      wind: weatherData.hourly.wind_speed_10m.slice(0, 8),
      units: {
        temp: weatherData.hourly_units.precipitation,
        humidity: weatherData.hourly_units.relative_humidity_2m,
        precipation: weatherData.hourly_units.temperature_2m,
        wind: weatherData.hourly_units.wind_speed_10m,
      },
    },
  };

  console.log(unformattedResult);
  console.log("hi");

  const weatherResult = {
    daily: {
      tempMax: weatherData,
      tempMin: [],
      time: [],
      units: { temp: "" },
    },

    hourly: {
      precipation: [],
      humidity: [],
      temperature: [],
      time: [],
      wind: [],
      units: {
        temp: "",
        humidity: "",
        precipation: "",
        wind: "",
      },
    },
  };
}

//provides query results from the api
export async function getGeoResults(query) {
  try {
    state.query.queryValue = query;

    const res = await fetch(`${GEOCODE_API}?name=${query}`);
    if (!res.ok) throw new Error("Request error " + res.status);

    const data = await res.json();
    if (!data.results) throw new Error(`City not found status 404`);
    console.log(data);

    geoResultFormat(data);
  } catch (err) {
    throw err;
  }
}

//used to get the obj of the selected city's id
export function getSelectedCityObj(id) {
  if (!id) return;

  const [cityObj] = state.query.geoCodeRes.filter((obj) => obj.id === +id);

  getWeatherResults(cityObj);
}

export async function getWeatherResults(obj) {
  try {
    const res = await fetch(
      weatherAPI(obj.latitude, obj.longitude, obj.timezone)
    );

    const data = await res.json();
    // console.log(data);

    weatherResultFormat(data);
  } catch (err) {
    console.error();
  }
}
