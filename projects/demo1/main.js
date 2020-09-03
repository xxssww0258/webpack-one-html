import 'style-loader!css-loader!html5-reset/assets/css/reset.css'
import Vue from 'vue'
import App from './App.vue'

new Vue({
    render: (h) => h(App),
}).$mount('#app')
