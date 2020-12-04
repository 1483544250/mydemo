import axios from 'axios';

export default {
  install: function install(Vue) {
    const host = 'http://localhost:3000';
    // Event-bus 相当于简单的store
    const bus = new Vue({
      data() {
        return {
          host,
          id: null,
        };
      },
      methods: {
        // 接口部分
        submitText(data) {
          return axios({
            url: `${host}/books`,
            method: 'post',
            data,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        getList(params) {
          return axios({
            url: `${host}/books`,
            method: 'get',
            params,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        updata(data) {
          return axios({
            url: `${host}/books`,
            method: 'PATCH',
            data,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        remove(data) {
          return axios({
            url: `${host}/books`,
            method: 'DELETE',
            data,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        register(data) {
          return axios({
            url: `${host}/register`,
            method: 'post',
            data,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        login(data) {
          return axios({
            url: `${host}/login`,
            method: 'post',
            data,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
      },
    });
    window.bus = bus;
    /* eslint no-param-reassign: ["error", { "props": false }] */
    Vue.prototype.$bus = bus;
  },
};
