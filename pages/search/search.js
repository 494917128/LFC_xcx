const util = require('../../utils/util.js')

Page({
  data: {
    search: '',
    list: [],
    page: 1,
    loading: false,
    search_value: '',
  },
  searchValue(e){
    var value = e.detail.value
    this.setData({
      search_value: value,
    })
  },
  search(){
    this.setData({
      list: [],
      page: 1,
      search: this.data.search_value
    })
    this.pageData()
  },
  // 请求商品列表
  pageData(){
    var _this = this,
      search = this.data.search,
      page = this.data.page,
      list = this.data.list
    _this.setData({ loading: true })// 加载中
    // this.ajax = util.request({
    //   url: 'product/list',
    //   data: {
    //     search: search,
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

  onLoad: function () {
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
