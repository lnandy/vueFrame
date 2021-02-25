import checkPermission from '@/router/async/permission.js'

export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    mutations: {
        SET(state, userInfo) {
            state.userInfo = userInfo;
        },
    },
    actions: {
        SET({ commit }, userInfo) {
            commit('SET', userInfo)
            if (JSON.stringify(userInfo) != "{}") {
                checkPermission();
            }
        },
    },
    getters: {
        get: state => {
            return state.userInfo
        }
    }
}