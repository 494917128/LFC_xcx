const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
  },
  onLoad: function () {
    this.setData({
      photo: app.globalData.userInfo.avatarUrl,
      name: app.globalData.userInfo.nickName
    })
  },
})