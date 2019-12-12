export const WEATHER_URL = process.env.VUE_APP_WEATHER_API;
export const WEATHER_KEY = process.env.VUE_APP_WEATHER_KEY;
export const WEATHER_LANG = process.env.VUE_APP_WEATHER_LANG;
export const WEATHER_UNIT = process.env.VUE_APP_WEATHER_UNIT;
export const IP_URL = process.env.VUE_APP_IP_CHECK;
export const IP_KEY = process.env.VUE_APP_IP_KEY;

export const METHODS = {
  GET_WEATHER: WEATHER_URL + 'weather',
  GET_CURRENT_LOCATION: IP_URL + 'check',
  FIND_CITY: WEATHER_URL + 'find',
};
