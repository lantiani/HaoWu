import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Index from '../views/Index.vue'
import store from '../store/index.js'
// 注册路由插件
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home/index',
    },
    {
        path: '/home',
        component: Index,
        children: [
            {
                path: 'index',
                component: () => import('../views/Home.vue'),
                meta: {
                    name: 'Home',
                    isIndexShow: true
                }
            },
            {
                path: 'cart',
                component: () => import('../views/Cart.vue'),
                meta: {
                    name: 'Cart',
                    title: '购物车'
                    // isIndexShow: true
                }
            },
            {
                path: 'user',
                component: () => import('../views/User.vue'),
                meta: {
                    name: 'User',
                    isIndexShow: true,
                    requireAuth:true
                }
            },
        ],
    },
    {
        path: '/goods',
        component: () => import('../views/Goods.vue'),
        meta: {
            title: '商品列表',
        }
    },
    {
        path: '/order',
        component: () => import('../views/Order.vue'),
        meta: {
            title: '我的订单',
        }
    },
    {
        path:'/goodsDetail/:id',
        component:() => import('../views/goodsDetail.vue'),
        meta: {
            title:'商品详情'
        }
    },
    {
        path:'/login',
        component:() => import('../views/Login.vue'),
        meta:{
            title:'登录'
        }
    },
    {
        path:'/register',
        component:() => import('../views/Register.vue'),
        meta:{
            title:'注册'
        }
    }
]

const router = new VueRouter({
    routes
})

NProgress.configure({
    showSpinner: false,
});
router.beforeEach((to, from, next) => {
    NProgress.start();
    if(to.fullPath == '/home/user') {
        console.log(to.fullPath);
        router.push('/login')
    }
    next();
})

router.afterEach((to, from) => {
    NProgress.done();
})

export default router
