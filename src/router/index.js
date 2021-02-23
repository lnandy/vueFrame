import Vue from 'vue'
import Router from 'vue-router'
import createRouter from '@/router/async/publicRouter.js'
Vue.use(Router)

/*
因为vuecli3默认使用router.js创建路由，后面动态创建路由之后，如果用户logout，需要清除通过addRouter添加的路由，
方式是用默认路由的matcher，也就是router.matcher，是一个闭包，无法clonedeep，
所以将默认路由单独提取，页面初始化和添加路由的时候都调用默认路由的方法createRouter
 */
const router = createRouter();
export default router;