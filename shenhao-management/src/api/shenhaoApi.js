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
  getDevelopmentEvent: './getDevelopmentEvent'
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
