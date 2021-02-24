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
		state.menus = menus;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
