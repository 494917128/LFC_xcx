const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {

  },
  call(e){
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  onLoad: function () {
  },
})
