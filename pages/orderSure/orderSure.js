const util = require('../../utils/util.js'),
  app = getApp()
Page({

  data: {
    image_url: app.image_url,
    list: [],
    address: {},
    total_price: 0,
  },
  // 确认订单
  orderAdd() {
    var _this = this,
      address_id = this.data.address.id,
      bag_id = this.data.bag_id,
      data = {}
    if (address_id) { data.address_id = address_id }
    else { wx.showToast({ title: '请先选择收货地址', icon: 'none' }); return }
    if (bag_id) { 
      data.bag_id = bag_id 
    } else { 
      var product = this.data.list[0]
      data.product_id = product.id
      data.num = product.num
      data.size_id = product.size_id
      data.color_id = product.color_id
    }
    console.log(data)
    // util.request({
    //   url: 'order/add',
    //   data: data,
    //   success(res) {
        // wx.showToast({
        //   title: '下单成功',
        // })
        // setTimeout(()=>{
        //   wx.navigateBack({ delta: 1, })
        //   var pages = getCurrentPages(),
        //     prevPage = pages[pages.length - 2];  //上一个页面
        //   // 刷新上一个页面
        //   prevPage.onPullDownRefresh && prevPage.onPullDownRefresh()
        // },1500)
        var res = {order_id: 1}
    if (typeof WeixinJSBridge == "undefined") {
      wx.showToast({
        title: "请用微信登录支付",
        mask: true,
        duration: 2000
      })
    } else {
      _this.orderPay(res.order_id)
    }

    //   },
    // })
  },
  // 支付
  orderPay(order_id){
    var _this = this
    // util.request({
    //   url: 'order/pay',
    //   data: {
    //     order_id: order_id
    //   },
    //   success(res) {
        _this.onBridgeReady({
          timeStamp: toString(new Date().getTime()),
          nonceStr: '',
          _package: 'prepay_id=1',
          signType: 'MD5',
          paySign: 'paySign',
        })
    //   }
    // })
  },
  // 支付
  onBridgeReady: function ({ timeStamp, nonceStr, _package, signType, paySign }) {
    var _this = this;
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: _package,
      signType: signType,
      paySign: paySign,
      success: function (res) {
        _this.paySuccess()
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  paySuccess(){
    var _this = this
    // util.request({
    //   url: 'order/paySuccess',
    //   data: {
    //     order_id: order_id
    //   },
    //   success(res) {
        wx.showToast({
          title: '下单成功',
        })
        setTimeout(() => {
          wx.navigateBack({ delta: 1, })
          var pages = getCurrentPages(),
            prevPage = pages[pages.length - 2];  //上一个页面
          // 刷新上一个页面
          prevPage.onPullDownRefresh && prevPage.onPullDownRefresh()
        }, 1500)
    //   }
    // })
  },
  onLoad: function (options) {
    var list = app.globalData.orderSure_list,
      total_price = app.globalData.total_price
    app.globalData.orderSure_list = ''
    app.globalData.total_price = ''
    
    this.setData({
      list: list,
      total_price,
      bag_id: options.bag_id ? options.bag_id.split(',') : '',
    })
  },
})