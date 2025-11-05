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

  data.results.forEach((obj) => {
    result.push({
      id: obj.id,
      city: obj.name,
      latitude: obj.latitude,
      longitude: obj.longitude,
    });
  });

  state.query.geoCodeRes = result;
}

export async function getGeoResults(query) {
  try {
    state.query.queryValue = query;

    const res = await fetch(`${GEOCODE_API}?name=${query}`);

    console.log("search ongoing");

    const data = await res.json();

    resultFormat(data);
  } catch (err) {
    console.error(err);
  }
}
