import Vue from 'vue'
import Router from 'vue-router'
import user from '@/components/user'
import products from '@/components/product'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'User',
      component: user
    },
    {
      path:'/products',
      name: 'products',
      component: products
    }
  ]
})