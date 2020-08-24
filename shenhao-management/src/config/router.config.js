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
        meta: { title: '知识中心', icon: 'table', permission: ['form'] },
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
        path: '/newsManagement',
        name: 'newsManagement',
        component: RouteView,
        redirect: '/newsManagement/newsList',
        meta: { title: '新闻管理', icon: 'table', permission: ['form'] },
        children: [
          {
            path: '/newsManagement/newsList',
            name: 'newsList',
            component: () => import('@/views/newsManagement/newsList'),
            meta: { title: '新闻列表', keepAlive: true, permission: ['form'] }
          },
          {
            path: '/newsManagement/newsDetail',
            name: 'newsDetail',
            component: () => import('@/views/newsManagement/newsDetail'),
            hidden: true,
            meta: { title: '新闻详情', keepAlive: true, permission: ['form'] }
          }
        ]
      },
      {
        path: '/newsManagement/newsDetail',
        name: 'newsDetail',
        component: () => import('@/views/newsManagement/newsDetail'),
        hidden: true,
        meta: { title: '新闻详情', permission: ['form'] }
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
      },
      {
        path: '/dataStatistical',
        name: 'dataStatistical',
        component: () => import('@/views/dataStatistical/pageStatistical'),
        meta: { title: '访问统计', icon: 'table', permission: ['form'] }
      },
      // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: RouteView,
      //   meta: { title: '表单页', icon: 'form', permission: ['form'] },
      //   children: [
      //     {
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/basicForm'),
      //       meta: { title: '基础表单', keepAlive: true, permission: ['form'] }
      //     }
      //   ]
      // },

      // list
      // {
      //   path: '/list',
      //   name: 'list',
      //   component: RouteView,
      //   redirect: '/list/table-list',
      //   meta: { title: '列表页', icon: 'table', permission: ['table'] },
      //   children: [
      //     {
      //       path: '/list/table-list/:pageNo([1-9]\\d*)?',
      //       name: 'TableListWrapper',
      //       hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
      //       component: () => import('@/views/list/TableList'),

      //       meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
      //     }
      //   ]
      // }
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
