const util = require('../../utils/util.js')

Page({
  data: {
    show_more: false,
    nav_list: ['综合0', '饰品0'],
    nav_index: 0,
    brand_id: '',
    brand: {}, // 品牌信息
    list: [],
    page: 1,
    loading: false,
  },
  headerMore(){
    this.setData({
      show_more: !this.data.show_more
    })
  },
  navbar(e){
    var index = e.detail.index
    if (index == this.data.nav_index)
      return;
    this.setData({
      nav_index: index,
      list: [],
      page: 1,
    })
    this.ajax && this.ajax.abort()
    this.pageData && this.pageData()
  },
  // 请求品牌详情
  getBrand() {
    var _this = this
    // util.request({
    //   url: 'brand/brand',
    //   data: {
    //     brand_id: this.data.brand_id
    //   },
    //   success(res) {
        var res = {
          id: 1,
          name: 'LIVE FOR COOL',
          image: '/images/product.png',
          banner: '/images/product.png',
          desc: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        }
        _this.setData({
          brand: res
        })
    //   }
    // })
  },
  // 请求类别
  getType(){
    var _this = this
    // util.request({
    //   url: 'brand/type',
    //   data: {},
    //   success(res) { 
        var res = { 
          "list": [ 
            { 
              "id": 1, 
              "name": "综合" 
            },
            { 
              "id": 2, 
              "name": "饰品" 
            }
          ]
        }
        var nav_list = []
        res.list.map((item)=>{
          nav_list.push(item.name)
        })
        _this.setData({
          nav_list: nav_list,
          type_list: res.list
        })
        _this.pageData()
    //   }
    // })
  },
  // 请求商品列表
  pageData(){
    var _this = this,
      brand_id = this.data.brand_id,
      type_list = this.data.type_list,
      nav_index = this.data.nav_index,
      page = this.data.page,
      list = this.data.list
    _this.setData({ loading: true })// 加载中
    // this.ajax = util.request({
    //   url: 'product/list',
    //   data: {
    //     brand_id: brand_id,
    //     type_id: type_list[nav_index].id,
    //     page: page
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
      var res = {list: [
        {id:1,image:'/images/ali-pay.png',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/classify_0.png',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/classify_1.png',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/classify_2.png',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/default.png',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/index_bg.jpg',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/product.png',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/wechat-pay.png',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
        {id:1,image:'/images/wechat.jpg',brand:'LIVE FOR COOL',name:'T恤',price:'123'},
      ]}
      list.push(...res.list)

      _this.setData({
        list: list,
        loading: false,
      })
    //   },
    // })
  },
  onLoad: function (options) {
    this.setData({
      brand_id: options.id||'',
    })
    this.getBrand() // 获取品牌信息
    this.getType() // 获取类别
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
