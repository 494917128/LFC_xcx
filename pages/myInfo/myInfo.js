const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    modal_type: false,
    list: [
      {
        name: 'photo',
        title: '头像',
        content: '/images/product.png',
      },
      {
        name: 'name',
        title: '昵称',
        content: '名字',
      },
      {
        name: 'phone',
        title: '手机号码',
        content: '13566296373',
        input_type: 'number',
        disabled: true
      },
      {
        name: 'password',
        title: '密码',
        content: '123456',
      },
    ]
  },
  valueChange(e) {
    var name = e.detail.name
    var content = e.detail.content
    this.dataUpdate(name, content)
  },
  updatePhoto(){
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePath = res.tempFilePaths[0]
        _this.dataUpdate('photo', tempFilePath)
      },
    })
  },
  updatePassword(){
    this.setData({
      modal_type: 1,
    })
  },
  // 模态框确定
  modalConfirm() { 
    var _this = this
    // util.request({
    //   url: 'login/updatePassword',
    //   data: {
    //     mobile: this.data.mobile,
    //     password_old: this.data.old_password,
    //     password_new: this.data.new_password
    //   },
    //   success(res){
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        })
        _this.modalCancel()
    //   },
    // })
  },
  // 模态框取消
  modalCancel() { 
    this.setData({
      modal_type: false,
    })
  },
  // 模态框input聚焦
  modalFocus(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      [name]: true
    })
  },
  // 模态框input失焦
  modalBlur(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      [name]: false
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

  // 更新原有数据
  dataUpdate(name, value) {
    var _this = this
    this.data.list.map((item, index) => {
      if (item.name == name) {
        _this.setData({
          ['list[' + index + '].content']: value
        })
      }
    })
  },
  onLoad: function () {
    this.setData({
      mobile: app.globalData.userInfo.mobile
    })
    this.dataUpdate('photo', app.globalData.userInfo.user_image)
    this.dataUpdate('name', app.globalData.userInfo.user_name)
    this.dataUpdate('phone', app.globalData.userInfo.mobile)
  },
  onReachBottom() {
    console.log('上拉加载')
  },
})