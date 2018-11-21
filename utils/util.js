const app = getApp()


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const request = ({ prefix_url, url, data, method, type, success }) => {
  var token = app.globalData.token
  if (token) { data.token = token }
  var ajax = wx.request({
    url: (prefix_url || app.url) + url,
    data: data,
    header: {
      'content-type': type == 'form' ? 'application/x-www-form-urlencoded' : 'application/json'
    },
    method: method || 'POST',
    dataType: 'json',
    responseType: 'text',
    success: success,
    fail: function () {
      var callback = () => {
        request({ prefix_url, url, data, method, type, success })
      }
      wx.getNetworkType({
        success: function (res) {
          // 返回网络类型
          noneNetworl(res, callback)
        }
      })
    }
  })
  return ajax // 返回实例用于中断请求
}
var noneNetworl = (res, callback) => {
  if (res.networkType == 'none') {
    wx.showToast({
      title: '当前无网络，请连接网络后再试',
      icon: 'none',
      duration: 5000
    })
  }
}

// 设置上一个页面参数并返回上个页面
const prevPage = (data,back) => {
  var pages = getCurrentPages();
  var prevPage = pages[pages.length - 2];  //上一个页面
  prevPage.setData(data)
  // 返回上一个页面
  if (back) {
    wx.navigateBack({
      delta: 1,
    })
  }
}

module.exports = {
  formatTime,
  request,
  prevPage,
}
