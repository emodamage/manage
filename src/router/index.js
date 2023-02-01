import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import ('@/views/Main.vue'),
            name: 'Main',
            redirect: '/home',
            children: [
                // {
                //     //子路由带/就报错
                //     path: 'home',
                //     name: 'home',
                //     // label: '首页',
                //     component: () => import('@/views/Home.vue')
                // },
                // {
                //     path: 'user',
                //     name: 'user',
                //     component: () => import('@/views/User.vue')
                // },
                // {
                //     path: 'mall',
                //     name: 'mall',
                //     component: () => import('@/views/Mall.vue')
                // },
                // {
                //     path: 'page1',
                //     name: 'page1',
                //     component: () => import('@/views/One.vue')
                // },
                // {
                //     path: 'page2',
                //     name: 'page2',
                //     component: () => import('@/views/Two.vue')
                // }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (!token && to.name !== 'login') {
        next('/login')
    } else if (token && to.name === 'login') {
        next('/home')
    } else {
        next()
    }
})

export default router