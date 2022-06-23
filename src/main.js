import Vue from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
};
Vue.use(Toast, options);

new Vue({
  el: '#app',
  render: h => h(App)
})
