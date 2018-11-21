const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    list: [
      {
        name: 'contact',
        title: '联系人',
        content: '',
      },
      {
        name: 'phone',
        title: '联系人电话',
        content: '',
        input_type: 'number',
      },
      {
        name: 'address',
        title: '地址',
        content: ['上海市', '上海市', '浦东新区'],
      },
      {
        name: 'desc',
        title: '详细地址',
        content: '',
      }
    ],
  },
  valueChange (e) {
    var name = e.detail.name
    var content = e.detail.content
    this.dataUpdate(name, content)
  },
  regionChange (e) {
    var value = e.detail.detail.value
    this.dataUpdate('address', value)
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
  // 获取数据
  dataGet(){
    var data = {}
    this.data.list.map((item, index) => {
      data[item.name] = item.content
    })
    return data
  },
  submit(){
    var _this = this,
      data = {},
      get_data = this.dataGet()
    if (this.data.id) { data.address_id = this.data.id }
    data.contact = get_data.contact
    data.phone = get_data.phone
    data.prov = get_data.address[0]
    data.city = get_data.address[1]
    data.district = get_data.address[2]
    data.desc = get_data.desc
    // util.request({
    //   url: 'address/update',
    //   data: data,
    //   success(res) {
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(()=>{
          var pages = getCurrentPages(),
            prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.pageData()
          // 返回上一个页面
          wx.navigateBack({
            delta: 1,
          })
        },1500)
    //   }
    // })
  },
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
      this.dataUpdate('contact', options.contact)
      this.dataUpdate('phone', options.phone)
      this.dataUpdate('address', [options.prov, options.city, options.district])
      this.dataUpdate('desc', options.desc)
    }
  },
  onReachBottom() {
    console.log('上拉加载')
  },
})