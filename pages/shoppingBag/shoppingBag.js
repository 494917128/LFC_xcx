const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.globalData.image_url,
    list: [],
    page: 1,
    loading: false,
    all_checked: false, // 是否选择全部
    all_checked_length: 0, // 选中的数量
    total_price: 0, // 所有选中的价格
  },
  checkboxSelect(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      ['list[' + index + '].checked']: !this.data.list[index].checked
    })
    this.updateAll()
  },
  // 全选或者全部取消
  selectAll(e){
    var list = this.data.list,
      all_checked = this.data.all_checked
    list.map((item,index)=>{
      item.checked = !all_checked
      return item
    })
    this.setData({
      list,
      all_checked: !all_checked
    })
    this.updateAll()
  },
  // 添加，减少，删除
  numUpdate(e){
    var _this = this,
      index = e.currentTarget.dataset.index,
      num = this.data.list[index].num,
      type = e.currentTarget.dataset.type,
      update = 0
    
    if (type == 'add') { // 添加
      update = 1
      this.update({ index, num, update })
    } else if (type == 'subtract' && num > 1) { // 减少
      update = -1
      this.update({ index, num, update })
    } else if (type == 'subtract' && num <= 1) { // 删除
      wx.showModal({
        title: '提示',
        content: '是否删除该商品',
        success(res) {
          if (res.confirm) {
            _this.delete(index)
          }
        }
      })
    }
  },
  // 更改
  update({index,num,update}){
    var _this = this,
      id = this.data.list[index].id
    // util.request({
    //   url: 'bag/update',
    //   data: {
    //     bag_id: id,
    //     num: update,
    //   },
    //   success(res){
        var res = { num: num + update }
        _this.setData({
          ['list[' + index + '].num']: res.num
        })
        _this.updateAll()
    //   },
    // })
  },
  // 删除
  delete(index){
    var _this = this,
      id = this.data.list[index].id,
      list = this.data.list
    // util.request({
    //   url: 'bag/delete',
    //   data: {
    //     bag_id: id,
    //   },
    //   success(res){
        list.splice(index, 1)
        _this.setData({
          list: list
        })
        _this.updateAll()
    //   },
    // })
  },
  // 计算是否全选和总价格
  updateAll(){
    var list = this.data.list,
      price = 0,
      checked_length = 0
    list.map((item,index)=>{
      if(item.checked){
        checked_length += 1
        price += Number(item.price) * item.num
      }
    })
    this.setData({
      total_price: price,
      all_checked_length: checked_length,
      all_checked: checked_length == list.length,
    })
  },
  // 确认下单
  orderSure(){
    var list = this.data.list
    
    if (this.data.all_checked_length) {
      var orderSure_list = [],
        bag_id = []
      list.map((item, index) => {
        if (item.checked) {
          orderSure_list.push(item)
          bag_id.push(item.id)
        }
      })
      app.globalData.orderSure_list = orderSure_list
      app.globalData.total_price = this.data.total_price
      bag_id.join(',')
      wx.navigateTo({
        url: '/pages/orderSure/orderSure?bag_id=' + bag_id,
      })
    } else { // 没选择就不跳
      wx.showToast({
        title: '请先选择下单商品',
        icon: 'none',
      })
    }
  },
  // 阻止冒泡
  stop(){},
  // 请求数据
  pageData(){
    var _this = this,
      page = this.data.page,
      list = this.data.list
    _this.setData({ loading: true })// 加载中
    // this.ajax = util.request({
    //   url: 'bag/list',
    //   data: {
    //     page: page,
    //   },
    //   success(res){
    //     if (res.data.list.length == 0) {
    //       wx.showToast({
    //         icon: 'none',
    //         title: '没有更多了'
    //       })
    //     } else {
    //       _this.setData({
    //         page: page + 1,//页数自增
    //       })
    //     }
        var res = {
          list: [
            {
              id: 1,
              product_id: 1,
              brand: 'JLINGZ',
              name: 'Original Logo Hoodie',
              image: '/images/product.png',
              color: '白色',
              size: 'S',
              price: '666.00',
              num: 1,
              total_price: '666.00'
            },
            {
              id: 1,
              product_id: 1,
              brand: 'JLINGZ',
              name: 'Original Logo Hoodie',
              image: '/images/product.png',
              color: '白色',
              size: 'S',
              price: '666.00',
              num: 1,
              total_price: '666.00'
            },
          ]
        }
        list.push(...res.list)
        list.map((item, index) => {
          item.checked = false
          return item
        })

        _this.setData({
          list: list,
          loading: false,
        })
        _this.updateAll()
    //   },
    // })
  },
  onLoad: function () {
    this.pageData()
  },
  onShow(){
    this.onPullDownRefresh()
  },
  // 上拉加载
  onReachBottom() {
    console.log('上拉加载')
    if (!this.data.loading) {
      this.ajax && this.ajax.abort()
      this.pageData && this.pageData()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    this.setData({
      list: [],
      page: 1,
    })
    this.ajax && this.ajax.abort()
    this.pageData()
    setTimeout(() => { wx.stopPullDownRefresh() }, 1000)
  }
})