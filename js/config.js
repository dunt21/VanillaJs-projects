export const GEOCODE_API =
  "https://corsproxy.io/?https://geocoding-api.open-meteo.com/v1/search";

export function weatherAPI(lat, long, timezone) {
  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,weathercode,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,wind_speed_10m_max&timezone=${timezone}&forecast_days=7
`;
}
