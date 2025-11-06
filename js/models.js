import { GEOCODE_API, WEATHER_API } from "./config";

export const state = {
  query: {
    queryValue: "",
    geoCodeRes: [],
    weatherRes: {},
  },
};

export function resultFormat(data) {
  const result = [];

  const unformattedResult = data.results.slice(0, 5);

  unformattedResult.forEach((obj) => {
    result.push({
      id: obj.id,
      city: obj.name,
      latitude: obj.latitude,
      longitude: obj.longitude,
      timezone: obj.timezone,
    });
  });

  state.query.geoCodeRes = result;
}

export async function getGeoResults(query) {
  try {
    state.query.queryValue = query;

    const res = await fetch(`${GEOCODE_API}?name=${query}`);
    if (!res.ok) throw new Error("Request error " + res.status);

    const data = await res.json();
    if (!data.results) throw new Error(`City not found status 404`);

    resultFormat(data);
  } catch (err) {
    throw err;
  }
}

export function getSelectedCityObj(id) {
  if (!id) return;

  const [cityObj] = state.query.geoCodeRes.filter((obj) => obj.id === +id);

  console.log(cityObj);
}
