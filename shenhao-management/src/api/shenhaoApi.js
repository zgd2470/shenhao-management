import request from '@/utils/request'

const shenhaoApi = {
  setVideoDetail: '/setVideoDetail',
  getVideoList: '/getVideoList',
  getVideoDetail: '/getVideoDetail',
  deleteVideo: '/deleteVideo',
  getVideoPath: '/getVideoPath'
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
