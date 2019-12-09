import {
  courseURL
} from './config.js'

export default function courseRequest(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: courseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}