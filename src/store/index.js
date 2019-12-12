import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import weather from './modules/weather';

Vue.use(Vuex);

const handleError = async (e, commit, method, error) => {
  commit('setLoading', {
    name: method,
    value: 'error',
  });
  let error_message = 'Что-то пошло не так, обратитесь в тех. поддержку';
  if (error) {
    error_message = error;
  }
  commit('setError', {
    name: method,
    value: error_message,
  })
};

export default new Vuex.Store({
  modules: {
    weather,
  },
  state: {
    loading: {},
    error: {},
  },
  getters: {
    loading: (state) => name => name ? state.loading[name] : state.loading,
    error: (state) => name => name ? state.error[name] : state.error,
  },
  actions: {
    /**
     * Отправка GET запроса
     * @param state
     * @param commit
     * @param dispatch
     * @param method - url на который будет идти запрос
     * @param name - имя мутации, что будет выполнена в случае успешного запроса
     * @param params - объект с параметрами, ключ -> значение, будет добавлен ?key=valye
     * @param error - какую ошибку вывести в случае неудачи? Если не задавать, то выведется ошибка с запроса
     * @param no_commit - не делать мутацию после запроса? По умолчанию мутация выполняется
     * @returns {Promise<*>}
     */
    async get_request({ state, commit, dispatch }, { method, name, params, error = '', no_commit = false }) {
      const config = {};
      if (params) {
        config.params = params;
      }
      commit('setLoading', {
        name: method,
        value: 'loading',
      });
      commit('removeError', method);
      try {
        let request = await axios.get(method, config);
        commit('setLoading', {
          name: method,
          value: 'loaded',
        });
        if (no_commit === false) {
          commit(name, {
            data: request.data,
          });
        }
        return request;
      } catch (e) {
        await handleError(e, commit, method, error);
      }
    },

    /**
     * отправка POST запроса
     * @param state
     * @param commit
     * @param dispatch
     * @param method
     * @param name
     * @param params
     * @param error
     * @param no_commit
     * @returns {Promise<void>}
     */
    async post_request({ state, commit, dispatch }, { method, name, params, error = '', no_commit = false }) {
      // TODO: post request
    },

    /**
     * отправка PUT запроса
     * @param state
     * @param commit
     * @param dispatch
     * @param method
     * @param name
     * @param params
     * @param error
     * @param no_commit
     * @returns {Promise<void>}
     */
    async put_request({ state, commit, dispatch }, { method, name, params, error = '', no_commit = false }) {
      // TODO: put request
    },
    /**
     * отправка PATCH запроса
     * @param state
     * @param commit
     * @param dispatch
     * @param method
     * @param name
     * @param params
     * @param error
     * @param no_commit
     * @returns {Promise<void>}
     */
    async patch_request({ state, commit, dispatch }, { method, name, params, error = '', no_commit = false }) {
      // TODO: patch request
    },

    /**
     * отправка DELETE запроса
     * @param state
     * @param commit
     * @param dispatch
     * @param method
     * @param name
     * @param params
     * @param error
     * @param no_commit
     * @returns {Promise<void>}
     */
    async delete_request({ state, commit, dispatch }, { method, name, params, error = '', no_commit = false }) {
      // TODO: delete request
    },
  },
  mutations: {
    setLoading(state, { name, value }) {
      Vue.set(state.loading, name, value);
    },
    setError(state, { name, value }) {
      Vue.set(state.error, name, value);
    },
    removeError(state, name) {
      Vue.set(state.error, name, null);
    },
  },
})
