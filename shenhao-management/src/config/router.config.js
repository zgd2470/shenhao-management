// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: { title: '首页', keepAlive: true, permission: ['form'] },
        component: () => import('@/views/index/index')
      },
      // knowledgeCenter
      {
        path: '/knowledgeCenter',
        redirect: '/knowledgeCenter/videoList',
        component: RouteView,
        meta: { title: '知识中心管理', icon: 'table', permission: ['form'] },
        children: [
          {
            path: '/knowledgeCenter/videoList',
            name: 'videoList',
            component: () => import('@/views/knowledgeCenter/videoList'),
            meta: { title: '视频列表', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/knowledgeCenter/videoDetail',
            name: 'videoDetail',
            component: () => import('@/views/knowledgeCenter/videoDetail'),
            hidden: true,
            meta: { title: '视频配置详情', permission: ['form'] }
          },
          {
            path: '/knowledgeCenter/commentsList',
            name: 'commentsList',
            component: () => import('@/views/knowledgeCenter/commentsList'),
            meta: { title: '评论列表', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/knowledgeCenter/problemList',
            name: 'problemList',
            component: () => import('@/views/knowledgeCenter/problemList'),
            meta: { title: '常见问题列表', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      {
        path: '/formList',
        redirect: '/formList/demonstrate',
        component: RouteView,
        meta: { title: '表单提交管理', icon: 'table', permission: ['form'] },
        children: [
          {
            path: '/formList/demonstrate',
            name: 'demonstrate',
            component: () => import('@/views/formList/demonstrate'),
            meta: { title: '预约演示列表', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/formList/partner',
            name: 'partner',
            component: () => import('@/views/formList/partner'),
            meta: { title: '成为合作伙伴列表', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/formList/trial',
            name: 'trial',
            component: () => import('@/views/formList/trial'),
            meta: { title: '试用申请列表', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      {
        path: '/aboutShenHao',
        redirect: '/aboutShenHao/developmentCourse',
        component: RouteView,
        meta: { title: '关于甚好', icon: 'table', permission: ['form'] },
        children: [
          {
            path: '/aboutShenHao/developmentCourse',
            name: 'developmentCourse',
            component: () => import('@/views/aboutShenHao/developmentCourse'),
            meta: { title: '发展历程', keepAlive: true, permission: ['form'] }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
