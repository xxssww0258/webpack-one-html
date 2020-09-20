import 'html5-reset/assets/css/reset.css'
import './c.less'
import Vue from 'vue'
import App from './App.vue'

const requireAll = (requireContext) => requireContext.keys().map(requireContext) // eslint-disable-line
const req = require.context('./icons/', false, /\.svg$/)
requireAll(req)

new Vue({
    render: (h) => h(App),
}).$mount('#app')
