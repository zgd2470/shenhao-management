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
  getStatistical: '/getStatistical',
  getNewsList: '/getNewsList'
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
