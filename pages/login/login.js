const app = getApp()
import util from "../../utils/util.js";
Page({

  data: {
    count_down: 0,
    get_userinfo: false,
  },
  // input值获取
  inputValue(e) {
    const type = e.currentTarget.dataset.type
    const data = {}
    data[type] = e.detail.value + ""//转字符串
    this.setData(data)
  },
  loginCallback(res) {
    wx.hideLoading()
    console.log(res)
    // app.globalData.userInfo = res.userInfo
    // 首次登陆需要绑定pc端
    app.globalData.token = res.token
    if (!res.is_binding) {
      this.setData({ modal_type: 1 })
    } else {
      this.done()
    }
  },

  // 获取用户信息
  getUserInfo(e) {
    if (e.detail.detail.userInfo) {
      this.login(e.detail.detail)
    }
  },
  // 登录
  login(data) {
    var userInfo = data.userInfo
    var _this = this
    wx.showLoading({
      title: '登录中...',
    })
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       util.request({
    //         url: 'login/login_wx',
    //         data: {
    //           appid: app.AppID,
    //           secret: app.AppSecret,
    //           code: res.code,
    //           userInfo: userInfo,
    //         },
    //         success: function (res) {
              var data = { 
                "token": "mock", 
                "is_binding": 1 
              }
              _this.loginCallback(data)
    //         }
    //       })

    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // });
  },
  wechatLogin(){
    var _this = this
    // 获取个人信息
    wx.getUserInfo({
      success: function (res) {
        _this.login(res)
      },
      fail() {
        // 显示点击授权模态框
        _this.setData({
          get_userinfo: true
        })
      }
    })
  },
  // 模态框input聚焦
  modalFocus() {
    this.setData({
      modal_focus: true
    })
  },
  // 模态框input失焦
  modalBlur() {
    this.setData({
      modal_focus: false
    })
  },
  // 获取模态框input内容
  modalInput(e) {
    var type = e.currentTarget.dataset.type,
      value = e.detail.value
    this.setData({
      [type]: value
    })
  },
  // 下一页
  next() {
    var phone = this.data.phone || ''
    if (phone.length == 11) {
      this.setData({
        modal_type: 2
      })
      this.sendCode()
    } else {
      wx.showToast({
        icon: "none",
        title: '手机号码格式错误',
      })
    }
  },
  // 完成操作（密码）
  finish() {
    var password = this.data.password || ''
    if (password.length >= 6) {
      // util.request({
      //   url: 'login/binding/password',
      //   data: {
      //     password: password
      //   },
      //   success(res){
          this.setData({
            modal_type: 4
          })
      //   }
      // })
    } else {
      wx.showToast({
        icon: "none",
        title: '密码必须大于六位',
      })
    }
  },
  // 验证码倒计时
  countDown() {
    var _this = this
    this.setData({
      count_down: 60
    })
    this.interval = setInterval(() => {
      if (_this.data.count_down > 0) {
        _this.setData({
          count_down: _this.data.count_down - 1
        })
      } else {
        clearInterval(_this.interval)
      }
    }, 1000)
  },
  // 发送验证码
  sendCode() {
    var _this = this
    // util.request({
    //   url: 'login/getCode',
    //   data: {
    //     mobile: this.data.phone
    //   },
    //   success(res){
        wx.showToast({
          icon: "none",
          title: '验证码已发送',
        })
    //   }
    // })
    this.countDown()
  },
  // 验证码input
  modalCode(e) {
    var value = e.detail.value
    if (value.length == 4) { // 验证码输入完成
      // util.request({
      //   url: 'login/binding',
      //   data: {
      //     mobile: this.data.phone,
      //     code: value
      //   },
      //   success(res){
          wx.showToast({
            icon: "none",
            title: '验证码已发送',
          })
          this.setData({
            modal_type: 3,
          })
      //   }
      // })
    }
  },
  done(){
    // util.request({
    //   url: 'index/userInfo',
    //   data: {},
    //   success(res){
        var res = {
          mobile: '13566296373',
          user_image: '/images/index_bg.jpg',
          user_name: '王尔迪',
        }
        app.globalData.userInfo = res
    //   },
    // })
    wx.reLaunch({
      url: this.data.path
    })
  },
  onLoad: function (options) {
    this.setData({
      path: decodeURIComponent(options.path || '/pages/index/index')
    })
    this.wechatLogin()
  },
  onUnload() {
    clearInterval(this.interval)
  },

})