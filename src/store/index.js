import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from "@/store/module/userInfo"
import menus from "@/store/module/menus"
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		userInfo : userInfo,
		menus: menus
	}
})