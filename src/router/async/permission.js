import router from '@/router/index'
import store from '@/store/index'
import createRouter from '@/router/async/publicRouter.js'
import data from '@/router/async/routerMenu.js'

/*

=========================
页面每次都会先经过app.vue，通过请求更新user store。
user store有更新时，根据用户email查询用户角色，根据角色获取菜单并添加到router。
================================

路由拦截
1.用户刷新或者登陆，判断是否拉取过menu信息，如果没有拉取过，不跳转，等待app.vue拉取用户信息。
2.用户点击菜单或者输入路由信息，判断是否有权限跳转，如果没有权限，跳转404页面。


 */

// 路由拦截器
router.beforeEach((to, from, next) => {
	//第一次进入或者刷新页面，路由还没从后台抓取
	if(to.name  == from.name && to.name != null){
		return false;
	}
	if (!store.getters['menus/getMenus'].length && to.name != "login" && to.name != "notFound") {
		return false;
	}
	if (to.matched.length === 0) {
		next('/notFound') //判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面

	}
	next()
})

//根据menu信息渲染菜单
function renderMenu(menus) {
	// let rootframe = {
	// 	name: "dashboard",
	// 	path: "/dashboard",
	// 	component: (resolve) => require(['@/views/dashboard/dashboard.vue'], resolve),
	// };
	router.matcher = createRouter().matcher;
	
	menus.map(item => {
		let currentMenu = {
			name: item.name,
			path: item.path,
			component: (resolve) => require(['@/views' + item.component + '.vue'], resolve),
		};
		router.addRoute(currentMenu)
		//return currentMenu;
	})
	//rootframe.children = menulist
	//router.addRoute(rootframe);
	console.log(router)
	if (location.href.split('/#').length > 0) {
		let path = location.href.split('/#')[1];
		router.push((path == "login" || path == "/") ? menus[0].path : path);
	}
}

function getMenus(){
    return new Promise(resolve=>{
        store.dispatch('menus/setMenus',data);
        resolve(data);
    })
}

function asycMenu() {
	getMenus().then((menus) => {
		renderMenu(menus);
	});
}

export default asycMenu;
