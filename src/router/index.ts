import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const layoutRoutes: Array<RouteRecordRaw> = [
  {
    path: '/index',
    name: 'Index',
    component: () => import('@/views/index/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: {
      title: '关于',
    },
  },
]

const demoRoutes: Array<RouteRecordRaw> = [
  {
    path: '/luckyDraw',
    name: 'luckyDraw',
    component: () => import('@/views/luckyDraw/index.vue'),
  },
  {
    path: '/todoList',
    name: 'todoList',
    component: () => import('@/views/todoList/index.tsx'),
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/chat/index.vue'),
  },
  {
    path: '/canvasImg',
    name: 'canvasImg',
    component: () => import('@/views/chat/canvas.vue'),
  },
  {
    path: '/dragPage',
    name: 'dragPage',
    component: () => import('@/views/dragPage/index.vue'),
  },
  {
    path: '/resizePage',
    name: 'resizePage',
    component: () => import('@/views/resizePage/index.vue'),
  },
  {
    path: '/toHtml',
    name: 'toHtml',
    component: () => import('@/views/resizePage/htmlTocanvas.vue'),
  },
  {
    path: '/canvas',
    name: 'canvas',
    component: () => import('@/views/canvas/index.vue'),
  },
  {
    path: '/changeImg',
    name: 'changeImg',
    component: () => import('@/views/imagePage/index.vue'),
  },
  {
    path: '/boxShadowCanvas',
    name: 'boxShadowCanvas',
    component: () => import('@/views/boxShadowCanvas/index.vue'),
    meta: {
      title: 'Box Shadow Canvas',
    },
  },
  {
    path: '/waterFull',
    name: 'waterFull',
    component: () => import('@/views/waterFull/index.vue'),
  },
  {
    path: '/articleFold',
    name: 'articleFold',
    component: () => import('@/views/articleFold/index.vue'),
  },
  {
    path: '/sideNav',
    name: 'sideNav',
    component: () => import('@/views/sideNav/index.vue'),
  },
  {
    path: '/life100',
    name: 'life 100',
    component: () => import('@/views/life100/index.vue'),
  },
  {
    path: '/lifeDetail',
    name: 'lifeDetail',
    meta: {
      hidden: true,
    },
    component: () => import('@/views/life100/lifeDetail.vue'),
  },
  {
    path: '/fileDrag',
    name: 'fileDrag',
    component: () => import('@/views/fileDrag/index.vue'),
  },
  {
    path: '/selectText',
    name: 'selectText',
    component: () => import('@/views/selectText/index.vue'),
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/calendar/index.vue'),
  },
  {
    path: '/randomCode',
    name: 'randomCode',
    component: () => import('@/views/randomVerifyCode/index.vue'),
  },
]

const lifeAppRoutes: Array<RouteRecordRaw> = [
  {
    path: '/life',
    name: 'LifeApp',
    redirect: '/life-list',
    component: () => import('@/layout/lifeAppLayout.vue'),
    children: [
      {
        path: '/life-list',
        name: 'life-list',
        component: () => import('@/views/lifeApp/index.vue'),
      },
      {
        path: '/life-playground',
        name: 'life-playground',
        component: () => import('@/views/lifeApp/playground.vue'),
      },
      {
        path: '/life-notify',
        name: 'life-notify',
        component: () => import('@/views/lifeApp/notify.vue'),
      },
      {
        path: '/life-my',
        name: 'life-my',
        component: () => import('@/views/lifeApp/mine.vue'),
      },
    ],
  },
]

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    meta: {
      hidden: true,
    },
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    children: layoutRoutes,
  },
  ...demoRoutes,
  ...lifeAppRoutes,

  {
    path: '/testPage',
    name: 'testPage',
    component: () => import('@/views/testPage/index.vue'),
  },

  // 替代vue2中的'*'通配符路径
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
    meta: {
      hidden: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
})
export default router
