import storage from 'store'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    pmCode: '',
    info: {},
    username: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PMCODE: (state, pmCode) => {
      state.pmCode = pmCode
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.result

            storage.set(ACCESS_TOKEN, result.token)
            localStorage.setItem('pmCode', result.pmCode)
            commit('SET_TOKEN', result.token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo({ pmCode: localStorage.getItem('pmCode') || '' })
          .then(response => {
            const result = response.result

            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map(per => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map(action => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map(permission => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
              commit('SET_USERNAME', result.username)
              commit('SET_NAME', result.name)
              commit('SET_PMCODE', result.pmCode)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            commit('SET_AVATAR', result.avatar)

            localStorage.setItem('lang', 'zh-CN')
            localStorage.setItem('app_language', 'zh-CN')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            storage.remove(ACCESS_TOKEN)
            localStorage.removeItem('pmCode')
            resolve()
          })
          .catch(() => {
            resolve()
          })
          .finally(() => {})
      })
    }
  }
}

export default user
