const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    url: app.url,
    image_url: app.image_url,
    nav_list: ['全部', '待付款', '待发货', '待收货', '已收货'],
    nav_index: 0,
    list: [],
    page: 1,
    loading: false,
  },
  navbar(e) {
    var index = e.detail.index
    if (index == this.data.nav_index)
      return;
    this.setData({
      nav_index: index,
      notice_content: false,
      list: [],// 重新加载
      page: 1,// 页数为1
    })
    this.ajax.abort()// 结束之前的请求
    this.pageData()
  },
  pageData() {
    var _this = this
    var index = this.data.nav_index
    this.setData({ loading: true })
    // this.ajax = util.request({
    //   url: 'order/list',
    //   data: {
    //     page: this.data.page,
    //   },
    //   success: function (res) {
        // 算出商品总数量
        // for (var i = 0, len = res.data.data.list.length; i < len; i++) {
        //   res.data.data.list[i].goods_sum = 0
        //   for (var p = 0, length = res.data.data.list[i].goods_list.length; p < length; p++) {
        //     res.data.data.list[i].goods_sum += res.data.data.list[i].goods_list[p].goods_number
        //   }
        // }
        // 
        // if (res.data.data.list.length == 0) {
        //   if (_this.data.page != 1) {
        //     wx.showToast({
        //       icon: 'none',
        //       title: '没有更多了'
        //     })
        //   }
        // } else {
        //   _this.setData({
        //     page: _this.data.page + 1,
        //   })
        // }
        var res = {
          list:[{
            id: 1,
            type: 1,
            order_number: '1238718927398217',
            totalPrice: 45,
            products: [{
              id: 1,
              brand: 'LFC',
              name: 'JLINGZ Original Logo Hoodie',
              image: '/images/product.png',
              price: 45,
              size: 'S',
              color: '白色',
              num: 1
            }]
          }]
        }

        var list = _this.data.list
        list.push(...res.list)

        _this.setData({
          list: list,
          loading: false,
        })
    //   }
    // })

  }, 

  onLoad: function (e) {

    this.pageData()
  },
  // 上拉加载
  onReachBottom() {
    console.log('上拉加载')
    if (!this.data.loading) {
      this.ajax.abort()
      this.pageData()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    this.setData({
      list: [],// 重新加载
      page: 1,// 页数为1
    })
    this.pageData()
    setTimeout(() => { wx.stopPullDownRefresh() }, 1000)
  }
})