const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
  },
  onLoad: function () {
    
  },
  onReachBottom() {
    console.log('上拉加载')
  },
})