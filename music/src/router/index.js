import Vue from 'vue'
import VueRouter from 'vue-router'
//注意点：通过import xxx from xxx的方式加载组件，无论组件有没有被用到，都会被加载进来
//import Recommend from '../views/Recommend.vue'
// import Singer from '../views/Singer.vue'
// import Rank from '../views/Rank.vue'
// import Search from '../views/Search.vue'

//实现Vue组件的按需加载（异步加载）
const Recommend = (resolve) => {
    import('../views/Recommend.vue').then((module) => {
        resolve(module)
    })
}
const Detail = (resolve) => {
    import('../views/Detail.vue').then((module) => {
        resolve(module)
    })
}

const Singer = (resolve) => {
    import('../views/Singer.vue').then((module) => {
        resolve(module)
    })
}
const Rank = (resolve) => {
    import('../views/Rank.vue').then((module) => {
        resolve(module)
    })
}
const Search = (resolve) => {
    import('../views/Search.vue').then((module) => {
        resolve(module)
    })
}
const Account = (resolve) => {
    import('../views/Account.vue').then((module) => {
        resolve(module)
    })
}

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/recommend' },
    {
        path: '/recommend',
        component: Recommend,
        children: [
            {
                path: 'detail/:id/:type',
                component: Detail
            }
        ]
    },
    {
        path: '/singer',
        component: Singer,
        children: [
            {
                path: 'detail/:id/:type',
                component: Detail
            }
        ]
    },
    {
        path: '/rank',
        component: Rank,
        children: [
            {
                path: 'detail/:id/:type',
                component: Detail
            }
        ]
    },
    { path: '/search', component: Search },
    { path: '/account', component: Account },
]

const router = new VueRouter({
    routes
})

export default router
