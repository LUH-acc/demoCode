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

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    children: layoutRoutes,
  },
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

  // 替代vue2中的'*'通配符路径
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(), // history 模式则使用 createWebHistory()
  routes,
})
export default router
