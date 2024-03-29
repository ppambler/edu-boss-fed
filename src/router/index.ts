import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './modules'

Vue.use(VueRouter)

// 路由配置规则
// const routes: Array<RouteConfig> = [
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
//   },
//   {
//     path: '/',
//     component: Layout,
//     meta: {
//       requiresAuth: true
//     },
//     children: [
//       {
//         path: '', // 默认子路由
//         name: 'home',
//         component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
//       },
//       {
//         path: '/role',
//         name: 'role',
//         component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
//       },
//       {
//         path: '/menu',
//         name: 'menu',
//         component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue')
//       },
//       {
//         path: '/resource',
//         name: 'resource',
//         component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue')
//       },
//       {
//         path: '/course',
//         name: 'course',
//         component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
//       },
//       {
//         path: '/user',
//         name: 'user',
//         component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
//       },
//       {
//         path: '/advert',
//         name: 'advert',
//         component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
//       },
//       {
//         path: '/advert-space',
//         name: 'advert-space',
//         component: () => import(/* webpackChunkName: 'a-dvert-space' */ '@/views/advert-space/index.vue')
//       },
//       {
//         path: '/menu/create',
//         name: 'menu-create',
//         component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/create.vue')
//       },
//       {
//         path: '/menu/:id/edit',
//         name: 'menu-edit',
//         component: () => import(/* webpackChunkName: 'menu-create-edit' */ '@/views/menu/edit.vue')
//       },
//       {
//         path: '/resource/category',
//         name: 'resource-category',
//         component: () => import(/* webpackChunkName: 'resource-category' */ '@/views/resource/category.vue')
//       },
//       {
//         path: '/role/:roleId/alloc-menu',
//         name: 'alloc-menu',
//         component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
//         props: true // 将路由路径参数映射到组件的 props 数据中
//       },
//       {
//         path: '/role/:roleId/alloc-resource',
//         name: 'alloc-resource',
//         component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-resource.vue'),
//         props: true // 将路由路径参数映射到组件的 props 数据中
//       },
//       {
//         path: '/course/create',
//         name: 'course-create',
//         component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue')
//       },
//       {
//         path: '/course/:courseId/edit',
//         name: 'course-edit',
//         component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
//         props: true
//       },
//       {
//         path: '/course/:courseId/section',
//         name: 'course-section',
//         component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
//         props: true
//       },
//       {
//         path: '/course/:courseId/video',
//         name: 'course-video',
//         component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
//         props: true
//       }
//     ]
//   },
//   {
//     path: '*',
//     name: '404',
//     component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
//   }
// ]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  // console.log('进入了路由全局守卫')
  // console.log('to => ', to)
  // console.log('from => ', from)

  // to.matched 是一个数组（匹配到是路由记录）
  // console.log(to.matched) // 最后一个元素是 to
  // 只要该路由有配置 meta 的 requiresAuth 为 true，那就意味着访问该路由对应的页面是有权限的！
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      // 跳转到登录页面
      return next({
        name: 'login',
        query: { // 通过 url 传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    }
  }

  // 获取用户权限
  // const data = await store.dispatch('getUserPermissons')
  // 判断当前请求路径是否在权限菜单中
  // 在 -> 通过
  // 不在 -> 跳转到没有权限页面
  // console.log(data)

  next()
})

router.afterEach(() => {
  nprogress.done()
})

// 全局前置守卫：任何页面的访问都要经过这里
// to：要去哪里的路由信息
// from：从哪里来的路由信息
// next：通行的标志
// router.beforeEach((to, from, next) => {
//   // to.matched 是一个数组（匹配到是路由记录）
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.state.user) {
//       // 跳转到登录页面
//       next({
//         name: 'login',
//         query: { // 通过 url 传递查询字符串参数
//           redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
//         }
//       })
//     } else {
//       next() // 需要登录验证通过
//     }
//   } else {
//     next() // 不需要登录允许通过
//   }
// })
export default router
