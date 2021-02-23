const state = {
	menus: []
}
// getters
const getters = {
	getMenus: state => {
		return state.menus
	}
}

// actions
const actions = {
	setMenus ({ commit }, menus) {
		commit('setMenus', menus)
	}
}

// mutations
const mutations = {
	setMenus (state, menus) {
		state.menus = (menus).map(item => {
			let name = item.name.replace(/\s*/g,'').toLowerCase();
			if(name == "projects"){
				item.to = "dashboard/hubpage";
			}else{
				item.to = name;
			}
			return item;
		});
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
