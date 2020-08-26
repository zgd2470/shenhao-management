import request from '@/utils/request'

const shenhaoApi = {
  setVideoDetail: '/setVideoDetail',
  getVideoList: '/getVideoList',
  getVideoDetail: '/getVideoDetail',
  deleteVideo: '/deleteVideo',
  getVideoPath: '/getVideoPath',
  getCommentsList: '/getCommentsList',
  deleteComments: '/deleteComments',
  submitProblem: '/submitProblem',
  getProblemList: '/getProblemList',
  deleteProblem: '/deleteProblem',
  getDevelopmentYear: '/getDevelopmentYear',
  setDevelopmentYear: '/setDevelopmentYear',
  getDevelopmentEvent: '/getDevelopmentEvent',
  deleteDevelopmentYear: '/deleteDevelopmentYear',
  setDevelopmentEvent: '/setDevelopmentEvent',
  getDemonstrateList: '/getDemonstrateList',
  dealDemonstrate: '/dealDemonstrate',
  getPartnerList: '/getPartnerList',
  dealPartner: '/dealPartner',
  getTrialList: '/getTrialList',
  dealTrial: '/dealTrial',
  getBannerList: '/getBannerList',
  setBanner: '/setBanner',
  getBannerDetail: '/getBannerDetail',
  getStatistical: '/getStatistical',
  getNewsList: '/getNewsList',
  getMenuArray: '/getMenuArray',
  setUser: '/setUser',
  getUserList: '/getUserList',
  getUserDetail: '/getUserDetail',
  deleteUser: '/deleteUser'
}

export function deleteUser(parameter) {
  return request({
    url: shenhaoApi.deleteUser,
    method: 'get',
    params: parameter
  })
}

export function getUserDetail(parameter) {
  return request({
    url: shenhaoApi.getUserDetail,
    method: 'get',
    params: parameter
  })
}

export function getUserList(parameter) {
  return request({
    url: shenhaoApi.getUserList,
    method: 'get',
    params: parameter
  })
}

export function setUser(parameter) {
  return request({
    url: shenhaoApi.setUser,
    method: 'post',
    data: parameter
  })
}

export function getMenuArray(parameter) {
  return request({
    url: shenhaoApi.getMenuArray,
    method: 'get',
    params: parameter
  })
}

export function getBannerDetail(parameter) {
  return request({
    url: shenhaoApi.getBannerDetail,
    method: 'get',
    params: parameter
  })
}

export function setBanner(parameter) {
  return request({
    url: shenhaoApi.setBanner,
    method: 'post',
    data: parameter
  })
}

export function getBannerList(parameter) {
  return request({
    url: shenhaoApi.getBannerList,
    method: 'get',
    params: parameter
  })
}

export function dealTrial(parameter) {
  return request({
    url: shenhaoApi.dealTrial,
    method: 'get',
    params: parameter
  })
}

export function getTrialList(parameter) {
  return request({
    url: shenhaoApi.getTrialList,
    method: 'get',
    params: parameter
  })
}

export function getPartnerList(parameter) {
  return request({
    url: shenhaoApi.getPartnerList,
    method: 'get',
    params: parameter
  })
}

export function dealPartner(parameter) {
  return request({
    url: shenhaoApi.dealPartner,
    method: 'get',
    params: parameter
  })
}

export function dealDemonstrate(parameter) {
  return request({
    url: shenhaoApi.dealDemonstrate,
    method: 'get',
    params: parameter
  })
}

export function getDemonstrateList(parameter) {
  return request({
    url: shenhaoApi.getDemonstrateList,
    method: 'get',
    params: parameter
  })
}

export function deleteDevelopmentYear(parameter) {
  return request({
    url: shenhaoApi.deleteDevelopmentYear,
    method: 'get',
    params: parameter
  })
}

export function setDevelopmentEvent(parameter) {
  return request({
    url: shenhaoApi.setDevelopmentEvent,
    method: 'post',
    data: parameter
  })
}

export function getDevelopmentEvent(parameter) {
  return request({
    url: shenhaoApi.getDevelopmentEvent,
    method: 'get',
    params: parameter
  })
}

export function getDevelopmentYear(parameter) {
  return request({
    url: shenhaoApi.getDevelopmentYear,
    method: 'get',
    params: parameter
  })
}

export function setDevelopmentYear(parameter) {
  return request({
    url: shenhaoApi.setDevelopmentYear,
    method: 'post',
    data: parameter
  })
}

export function deleteProblem(parameter) {
  return request({
    url: shenhaoApi.deleteProblem,
    method: 'get',
    params: parameter
  })
}

export function getProblemList(parameter) {
  return request({
    url: shenhaoApi.getProblemList,
    method: 'get',
    params: parameter
  })
}

export function submitProblem(parameter) {
  return request({
    url: shenhaoApi.submitProblem,
    method: 'post',
    data: parameter
  })
}

export function deleteComments(parameter) {
  return request({
    url: shenhaoApi.deleteComments,
    method: 'get',
    params: parameter
  })
}

export function getCommentsList(parameter) {
  return request({
    url: shenhaoApi.getCommentsList,
    method: 'get',
    params: parameter
  })
}

export function setVideoDetail(parameter) {
  return request({
    url: shenhaoApi.setVideoDetail,
    method: 'post',
    data: parameter
  })
}

export function getVideoList(parameter) {
  return request({
    url: shenhaoApi.getVideoList,
    method: 'get',
    params: parameter
  })
}

export function getVideoDetail(parameter) {
  return request({
    url: shenhaoApi.getVideoDetail,
    method: 'get',
    params: parameter
  })
}

export function getVideoPath(parameter) {
  return request({
    url: shenhaoApi.getVideoPath,
    method: 'get',
    params: parameter
  })
}

export function deleteVideo(parameter) {
  return request({
    url: shenhaoApi.deleteVideo,
    method: 'get',
    params: parameter
  })
}

//获取统计api
export function getStatistical(parameter) {
  return request({
    url: shenhaoApi.getStatistical,
    method: 'get',
    params: parameter
  })
}

//获取新闻列表api
export function getNewsList(parameter) {
  return request({
    url: shenhaoApi.getNewsList,
    method: 'get',
    params: parameter
  })
}
