const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    product: {},
    select_color: '', // 选中的颜色
    select_size: '', // 选中的尺码
    num: 1, // 购买的数量
    cover_show: false, // 判断购买弹出是否显示
  },
  previewImage(e){
    var image = e.currentTarget.dataset.image,
      urls = []
    urls.push(this.data.product.image)
    urls.push(...this.data.product.detail)
    wx.previewImage({
      current: image,
      urls: urls,
    })
  },
  // 收藏
  collect(e) {
    var _this = this,
      product = this.data.product,
      id = this.data.product.id
    // util.request({
    //   url: 'collect/set',
    //   data: {
    //     product_id: id,
    //   },
    //   success(res){
        var res = { is_collect: 1 }
        var is_collect = !product.is_collect
        _this.setData({
          'product.is_collect': is_collect,
        })
    //   },
    // })
  },
  coverShow() {
    this.setData({
      cover_show: true
    })
  },
  coverClose() {
    this.setData({
      cover_show: false
    })
  },
  stop(){},
  // 选择颜色尺码
  selectColor(e) { 
    var index = e.currentTarget.dataset.index
    this.setData({
      select_color: index
    })
  },
  selectSize(e) { 
    var index = e.currentTarget.dataset.index
    this.setData({
      select_size: index
    })
  },
  // 添加减少数量
  numUpdate(e) {
    var _this = this,
      num = this.data.num
      type = e.currentTarget.dataset.type

    if (type == 'add') { // 添加
      this.setData({ num: num + 1 })
    } else if (type == 'subtract' && num > 1) { // 减少
      this.setData({ num: num - 1 })
    }
  },
  // 加入购物车
  bagAdd(){
    var _this = this,
      select_size = this.data.select_size,
      select_color = this.data.select_color,
      product = this.data.product,
      data = {}
    data.product_id = this.data.id
    data.num = this.data.num
    if (select_size) { data.size_id = product.sizes[select_size].id } 
    else if (product.sizes.length) { 
      wx.showToast({ title: '请先选择尺码', icon: 'none' })
    }
    if (select_color) { data.color_id = product.colors[select_color].id }
    else if (product.colors.length) {
      wx.showToast({ title: '请先选择颜色', icon: 'none' })
    }
    // util.request({
    //   url: 'bag/update',
    //   data: data,
    //   success(res) {
        wx.showToast({
          title: '成功加入购物袋',
        })
        _this.coverClose()
    //   },
    // })
  },
  // 立即购买
  buy(){
    var product = this.data.product,
      select_size = this.data.select_size,
      select_color = this.data.select_color,
      num = this.data.num

    if (select_size) { 
      product.size = product.sizes[select_size].name
      product.size_id = product.sizes[select_size].id
    } else if (product.sizes.length) {
      wx.showToast({ title: '请先选择尺码', icon: 'none' })
    }
    if (select_color) { 
      product.color = product.colors[select_color].name
      product.color_id = product.colors[select_color].id
    } else if (product.colors.length) {
      wx.showToast({ title: '请先选择颜色', icon: 'none' })
    }

    product.num = num
    app.globalData.orderSure_list = [product]
    app.globalData.total_price = num * product.price
    wx.navigateTo({
      url: '/pages/orderSure/orderSure',
    })
  },
  pageData() { 
    var _this = this
    // util.request({
    //   url: 'product/product',
    //   data: {
    //     product_id: this.data.id
    //   },
    //   success(res) {
        var res = {
          id: 1,
          brand: 'LIVE FOR COOL',
          name: 'T恤',
          image: '/images/index_bg.jpg',
          price: '45',
          type: ['100%纯棉', '纯手工打造'],
          detail: ['/images/index_bg.jpg', '/images/index_bg.jpg'],
          is_wish: 1,
          sizes: [
            {id:1,name:'S/160'}, 
            {id:2,name:'M/165'}, 
            {id:3,name:'L/170'}
          ],
          colors: [
            {id:1,name:'黑色',image:'/images/product.png'}, 
            {id:2,name:'白色',image:'/images/default.png'}, 
          ],
        }
        _this.setData({
          product: res,
        })
    //   },
    // })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id||''
    })
    this.pageData()
  }
})
