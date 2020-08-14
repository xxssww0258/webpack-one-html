import 'style-loader!css-loader!html5-reset/assets/css/reset.css'
import Vue from 'vue'
import App from './App.vue'
import './a.css'
new Vue({
    render: (h) => h(App),
}).$mount('#app')
