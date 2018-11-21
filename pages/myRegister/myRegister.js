const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    count_down: 0,
    image_url: app.image_url,
  },
  // 验证码倒计时
  countDown(){
    var _this = this
    this.setData({
      count_down: 60
    })
    this.interval = setInterval(()=>{
      if (_this.data.count_down > 0){
        _this.setData({
          count_down: _this.data.count_down - 1
        })
      }else{
        clearInterval(_this.interval)
      }
    },1000)
  },
  // 发送验证码
  sendCode(){
    var _this = this
    if (!this.data.phone || this.data.phone.length != 11){
      wx.showToast({
        icon: "none",
        title: '手机号码错误',
      })
    }else{
      wx.showToast({
        icon: "none",
        title: '验证码已发送',
      })
      this.countDown()
    }
  },
  // 获取input内容
  inputValue(e){
    var type = e.currentTarget.dataset.type,
      value = e.detail.value
    this.setData({
      [type]: value
    })
  },
  onLoad: function (e) {
    this.setData({
      photo: app.globalData.userInfo.avatarUrl,
      name: app.globalData.userInfo.nickName,
      type: e.type||'', // 判断是否忘记密码
    })
  },
  onUnload() {
    // 清除验证码读秒
    clearInterval(this.interval)
  },

})