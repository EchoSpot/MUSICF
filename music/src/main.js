import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import 'common/css/index.scss'

Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VueLazyload,{
	loading:require('common/image/loading.gif'),
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h => h(App),
  router,
  store
  // components: { App },
  // template: '<App/>'
})
