import { IP_KEY, METHODS, WEATHER_KEY, WEATHER_LANG, WEATHER_UNIT } from "../const/weather";
import Vue from 'vue'

const selected_cities = JSON.parse(localStorage.getItem('selected_cities'));
const state = {
  current_location: {
    city: null,
  },
  is_loaded: false,
  selected_cities: selected_cities || [],
  loaded_cities: [],
};

const getters = {
  currentLocation: state => state.current_location,
  getSelectedCities: state => state.selected_cities,
  getLoadedCities: state => state.loaded_cities,
  isLoadedCities: state => state.is_loaded,
};
const actions = {
  /**
   * Определение текущего местоположения
   * @param dispatch
   * @returns {Promise<*>}
   */
  async getCurrentLocation({ dispatch }) {
    return await dispatch('get_request', {
      method: METHODS.GET_CURRENT_LOCATION,
      name: 'setCurrentLocation',
      params: {
        access_key: IP_KEY,
        format: 1,
      },
    });
  },
  /**
   * Загрузка погоды для города
   * @param dispatch
   * @param city
   * @returns {Promise<*>}
   */
  async loadCityWeather({ dispatch }, { city }) {
    return await dispatch('get_request', {
      method: METHODS.GET_WEATHER,
      name: 'setLoadedCity',
      params: {
        q: city,
        units: WEATHER_UNIT,
        lang: WEATHER_LANG,
        APPID : WEATHER_KEY,
      },
    });
  },
  /**
   * Поиск города
   * @param dispatch
   * @param city
   * @returns {Promise<*>}
   */
  async findCity({ dispatch }, city) {
    return await dispatch('get_request', {
      method: METHODS.FIND_CITY,
      no_commit: true,
      params: {
        q: city,
        lang: WEATHER_LANG,
        APPID : WEATHER_KEY,
      },
    });
  },
};

const mutations = {
  setCurrentLocation(state, { data }) {
    Vue.set(state, 'current_location', data);
  },
  setSelectedCity(state, { city }) {
    Vue.set(state.selected_cities,  state.selected_cities.length, city);
    localStorage.setItem('selected_cities', JSON.stringify(state.selected_cities))
  },
  clearLoadedCity(state) {
    Vue.set(state, 'loaded_cities', []);
  },
  setLoadedCity(state, { data }) {
    Vue.set(state.loaded_cities, state.loaded_cities.length, data);
  },
  deleteLoadedCity(state, { name }) {
    const index = state.loaded_cities.findIndex(item => {
      return item.name === name;
    });
    if(index >= 0){
      Vue.delete(state.loaded_cities, index);
      Vue.delete(state.selected_cities, index);
      localStorage.setItem('selected_cities', JSON.stringify(state.selected_cities))
    }
  },
  setLoaded(state, bool) {
    Vue.set(state, 'is_loaded', bool);
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
