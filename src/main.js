import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.config.productionTip = false
// Vue.prototype.servicePath = "/api/";
// if (process.env.NODE_ENV !== "development") {
// 	Vue.prototype.servicePath = "http://58.87.113.200/noobiekartscloudservices/";
// }
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
