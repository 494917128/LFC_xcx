const util = require('../../utils/util.js'),
  app = getApp()
Page({
  data: {
    image_url: app.image_url,
    order: {},
  },
  pageData(){
    var _this = this
    // util.request({
    //   url: '',
    //   data: {
    //     order_id: this.data.order_id
    //   },
    //   success(res){
        var res = {
          id: 1,
          type: 1,
          order_number: '234897399023',
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
          }],
          address: {
            id: 1,
            contact: '联系人',
            phone: '13333333333',
            prov: '浙江省',
            city: '温州市',
            district: '瓯海区',
            desc: '地址详情'
          },
        }

        _this.setData({
          order: res
        })
    //   }
    // })
  },
  onLoad: function () {
    this.pageData()
  },
})