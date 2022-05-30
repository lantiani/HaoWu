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
                    isIndexShow: true,
                    showSearchAction:false
                },
                children:[
                    {
                        path:'search',
                        component:() =>import('../views/Search.vue'),
                        meta:{
                            showSearchAction:true
                        }
                    }
                ]
            },
            {
                path: 'cart',
                component: () => import('../views/Cart.vue'),
                meta: {
                    name: 'Cart',
                    title: '购物车',
                    // requireAuth:true,
                    // isIndexShow: true
                }
            },
            {
                path: 'user',
                component: () => import('../views/User.vue'),
                meta: {
                    name: 'User',
                    isIndexShow: true,
                    // requireAuth:true
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
            requireAuth:true
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
    },
    {
        path:'/Address',
        component:() => import('../views/Address.vue'),
        meta:{
            title:'地址',
            requireAuth:true
        }
    },
    {
        path:'/AddAddress',
        component:() => import('../views/AddAddress.vue'),
        meta:{
            title:'新增地址',
            requireAuth:true
        }
    },
    {
        path:'/EditAddress/:userAddress',
        component:() => import('../views/EditAddress.vue'),
        meta:{
            title:'修改地址',
            requireAuth:true
        }
    },
    {
        path:'/orderdetail/:order_id',
        component:() => import('../views/orderDetail.vue'),
        meta:{
            title:'订单详情',
            requireAuth:true
        }
    },
    {
        path:'/searchresult/:searchInfo',
        component:() => import('../views/SearchResult.vue'),
        meta:{
            title:'搜索列表',
            isIndexShow: true
        }
    },
]

const router = new VueRouter({
    routes
})

NProgress.configure({
    showSpinner: false,
});
router.beforeEach((to, from, next) => {
    NProgress.start();
    store.state.token
    if(to.meta.requireAuth) {
        if(store.state.token){
            next()
        }else{
            router.push('/login')
            return;
        }
    } else {
        next()
    }
    // if(to.fullPath == '/home/user') {
    //     router.push('/login')
    // }
    next();
})

router.afterEach((to, from) => {
    NProgress.done();
})

export default router
