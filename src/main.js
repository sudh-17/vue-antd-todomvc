import Vue from 'vue'
import App from './App.vue'
import './core/use.js'
import store from './store/store.js'
import bootstrap from './core/bootstrap.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  created () {
    bootstrap()
  }
}).$mount('#app')
