import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vuescroll from 'vuescroll';

Vue.use(ElementUI);
Vue.config.productionTip = false

//https://vuescrolljs.yvescoding.org/zh/guide/getting-started.htm
Vue.use(vuescroll, {
	ops: {
		vuescroll: {
			mode: 'native',
			sizeStrategy: 'percent',
			detectResize: true,
			wheelScrollDuration: 300,
			wheelDirectionReverse: false
		},
		scrollPanel: {},
		rail: {
			background: '#01a99a',
			opacity: 0,
			size: '5px',
			gutterOfEnds: '5px',
			gutterOfSide: '2px',
		},
		bar: {
			showDelay: 1000,
			background: '#c1c1c1',
			size: '5px',
		}
	}, 
	name: 'scrollBar'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
