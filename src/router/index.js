import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/Index.vue'
// 注册路由插件
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'/home/index',
    },
    {
        path:'/home',
        component:Index,
        children:[
            {
                path:'index',
                component: ()=>import('../views/Home.vue'),
                meta:{
                    name:'Home',
                    isIndexShow:true
                }
            },
            {
                path:'cart',
                component:()=>import('../views/Cart.vue'),
                meta:{
                    name:'Cart',
                    isIndexShow:true
                }
            },
            {
                path:'user',
                component:()=>import('../views/User.vue'),
                meta:{
                    name:'User',
                    isIndexShow:true
                }
            },
        ],
    },
    {
        path:'/goods',
        component:()=>import('../views/Goods.vue'),
        meta:{
            title:'商品列表',
        }
    },
    {
        path:'/order',
        component:()=>import('../views/Order.vue'),
        meta:{
            title:'商品订单',
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
