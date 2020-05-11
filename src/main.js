// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import promise from 'es6-promise'
promise.polyfill()
import axios from 'axios'
import VueChatScroll from 'vue-chat-scroll'
import router from './router'
import Vuex from 'vuex'
import QRCode from 'qrcode'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import utils from '../static/js/utils'
import html2canvas from 'html2canvas'

import toolsTwo from '../static/js/toolsTwo.js'

Vue.prototype.$toolsTwo = toolsTwo

Vue.prototype.$utils = utils
Vue.use(QRCode)
Vue.use(VueChatScroll)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
