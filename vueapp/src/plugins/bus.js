import axios from 'axios';

export default {
  install: function install(Vue) {
    const host = 'http://localhost:3000';
    // Event-bus 相当于简单的store
    const bus = new Vue({
      data() {
        return {
          host,
        };
      },
      methods: {
        // 接口部分
        submitText(data) {
          return axios({
            url: `${host}/submitText`,
            method: 'post',
            data,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        getList() {
          return axios({
            url: `${host}/text`,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        updata(data) {
          return axios({
            url: `${host}/updata`,
            method: 'post',
            data,
          }).then((response) => {
            const result = response.data;
            return result;
          });
        },
        remove(data) {
          return axios({
            url: `${host}/remove`,
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
