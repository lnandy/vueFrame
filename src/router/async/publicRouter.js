import Router from 'vue-router'

const createRouter = () => new Router({
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'login',
        component: (resolve) => require(['@/views/login/Login.vue'], resolve),
        meta: {
            title: 'Log In'
        }
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: (resolve) => require(['@/views/login/NotFound.vue'], resolve),
    }]
})
export default createRouter;