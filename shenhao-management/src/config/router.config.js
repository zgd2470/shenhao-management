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
        meta: { title: '首页', keepAlive: true },
        component: () => import('@/views/index/index')
      },
      // knowledgeCenter
      {
        path: '/knowledgeCenter',
        redirect: '/knowledgeCenter/videoList',
        component: RouteView,
        meta: { title: '知识中心管理', icon: 'table', permission: ['knowledge'] },
        children: [
          {
            path: '/knowledgeCenter/videoList',
            name: 'videoList',
            component: () => import('@/views/knowledgeCenter/videoList'),
            meta: { title: '视频管理', keepAlive: true, permission: ['knowledgeVideo'] }
          },
          {
            path: '/knowledgeCenter/videoDetail',
            name: 'videoDetail',
            component: () => import('@/views/knowledgeCenter/videoDetail'),
            hidden: true,
            meta: { title: '视频配置详情', permission: ['knowledgeVideo'] }
          },
          // {
          //   path: '/knowledgeCenter/commentsList',
          //   name: 'commentsList',
          //   component: () => import('@/views/knowledgeCenter/commentsList'),
          //   meta: { title: '评论列表', keepAlive: true, permission: ['form'] }
          // },
          {
            path: '/knowledgeCenter/problemList',
            name: 'problemList',
            component: () => import('@/views/knowledgeCenter/problemList'),
            meta: { title: '常见问题管理', keepAlive: true, permission: ['knowledgeProblem'] }
          }
        ]
      },
      {
        path: '/formList',
        redirect: '/formList/demonstrate',
        component: RouteView,
        meta: { title: '表单管理', icon: 'table', permission: ['form'] },
        children: [
          {
            path: '/formList/demonstrate',
            name: 'demonstrate',
            component: () => import('@/views/formList/demonstrate'),
            meta: { title: '预约演示管理', keepAlive: true, permission: ['formDemonstrate'] }
          },
          {
            path: '/formList/partner',
            name: 'partner',
            component: () => import('@/views/formList/partner'),
            meta: { title: '成为合作伙伴管理', keepAlive: true, permission: ['formPartner'] }
          },
          {
            path: '/formList/trial',
            name: 'trial',
            component: () => import('@/views/formList/trial'),
            meta: { title: '试用申请管理', keepAlive: true, permission: ['formTrial'] }
          }
        ]
      },
      {
        path: '/newsManagement',
        name: 'newsManagement',
        component: RouteView,
        redirect: '/newsManagement/newsList',
        meta: { title: '新闻管理', icon: 'table', permission: ['news'] },
        children: [
          {
            path: '/newsManagement/newsList',
            name: 'newsList',
            component: () => import('@/views/newsManagement/newsList'),
            meta: { title: '新闻列表', keepAlive: true, permission: ['news'] }
          },
          {
            path: '/newsManagement/newsDetail',
            name: 'newsDetail',
            component: () => import('@/views/newsManagement/newsDetail'),
            hidden: true,
            meta: { title: '新闻详情', keepAlive: true, permission: ['news'] }
          }
        ]
      },

      {
        path: '/aboutShenHao',
        redirect: '/aboutShenHao/developmentCourse',
        component: RouteView,
        meta: { title: '关于甚好', icon: 'table', permission: ['about'] },
        children: [
          {
            path: '/aboutShenHao/developmentCourse',
            name: 'developmentCourse',
            component: () => import('@/views/aboutShenHao/developmentCourse'),
            meta: { title: '发展历程', keepAlive: true, permission: ['aboutDevelopmentCourse'] }
          }
        ]
      },
      {
        path: '/setting',
        redirect: '/setting/bannerList',
        component: RouteView,
        meta: { title: '系统设置', icon: 'table', permission: ['setting'] },
        children: [
          {
            path: '/setting/bannerList',
            name: 'bannerList',
            component: () => import('@/views/banner/bannerList'),
            meta: { title: 'Banner管理', permission: ['settingBanner'] }
          },
          {
            path: '/setting/bannerDetail',
            name: 'bannerDetail',
            hidden: true,
            component: () => import('@/views/banner/bannerDetail'),
            meta: { title: 'Banner详情', permission: ['settingBanner'] }
          },
          {
            path: '/setting/userManagement',
            name: 'userManagement',
            component: () => import('@/views/userManagement/userManagement'),
            meta: { title: '用户管理', permission: ['settingUser'] }
          },
          {
            path: '/setting/userManagementDetail',
            name: 'userManagementDetail',
            hidden: true,
            component: () => import('@/views/userManagement/userManagementDetail'),
            meta: { title: '用户详情', icon: 'table', permission: ['settingUser'] }
          }
        ]
      },

      {
        path: '/dataStatistical',
        name: 'dataStatistical',
        component: () => import('@/views/dataStatistical/pageStatistical'),
        meta: { title: '访问统计', icon: 'table', permission: ['dataStatistical'] }
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
      // {
      //   path: 'register',
      //   name: 'register',
      //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      // },
      // {
      //   path: 'register-result',
      //   name: 'registerResult',
      //   component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      // },
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
