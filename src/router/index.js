import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import login from '@/components/login/login.vue'
import logining from '@/components/login/logining.vue'
import resgin from '@/components/resgin/resgin.vue'
import loginIn from '@/components/login/loginIn.vue'
import descover from '../views/descover.vue'
import mine from '../views/mine.vue'
import movie from '../views/movie.vue'
import yuncun from '../views/yuncun.vue'

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path:'/logining',
    name:'logining',
    component:logining
  },
  {
    path:'/resgin',
    name:'resgin',
    component:resgin
  },
  {
    path:'/loginIn',
    name:'loginIn',
    component:loginIn
  },
  {
    path:'/home',
    name:'home',
    component:home,
    redirect:'descover',
    children:[
      {
        path:'/descover',
        component:descover
      },
      {
        path:'/mine',
        component:mine
      },
      {
        path:'/movie',
        component:movie
      },
      {
        path:'/yuncun',
        component:yuncun
      }
    ]
  }
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
