import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// filters
import filters from './filters'

// Buefy
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'

// Utils
import './utils'

for (const name in filters) {
  Vue.filter(name, filters[name])
}

Vue.use(Buefy, {
  defaultIconPack: 'fas'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
