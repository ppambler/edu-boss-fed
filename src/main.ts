import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import { menuLevel } from '@/utils/format'

// 加载全局样式
import './styles/index.scss'

if (process.env.NODE_ENV === 'development') {
  require('element-ui/lib/theme-chalk/index.css')
}

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// Vue.filter('formatLevel', menuLevel)
