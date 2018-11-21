const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    nav_list: ['商品', '媒体'],
    nav_index: 0,
    list_1: [],
    page_1: 1,
    loading_1: false,
    list: [],
    page: 1,
    loading: false,
  },
  navbar(e) {
    var _index = this.switchIndex(), 
      index = e.detail.index,
      ajax = this['ajax' + _index],
      pageData = this.pageData
      
    if (index == this.data.nav_index)
      return;
    this.setData({
      nav_index: index,
    })
    _index = this.switchIndex()
    if (index != 0 && this.data['list' + _index].length == 0) {
      ajax && ajax.abort()
      pageData && pageData()
    }
  },
  switchIndex(type) {
    var _index = '',
      _type = ''
    switch (this.data.nav_index) {
      case (0):
        _index = '_1'
        _type = 1
        break;
      case (1):
        _index = '' // index为空是为了配合mediaDetail的里的点赞
        _type = 2
        break;
    }
    if (type == 'type') {
      return _type
    } else {
      return _index
    }
  },
  // 点赞
  like(e) {
    var _index = this.switchIndex(), 
      _this = this,
      index = e.currentTarget.dataset.index,
      list = this.data['list' + _index],
      id = e.detail.id
    // util.request({
    //   url: 'media/setLike',
    //   data: {
    //     media_id: id,
    //   },
    //   success(res){
        var res = 1
        var is_like = !list[index].is_like
        var like_num = list[index].is_like ? list[index].like_num - 1 : list[index].like_num + 1
        _this.setData({
          ['list[' + index + '].is_like']: is_like,
          ['list[' + index + '].like_num']: like_num,
        })
    //   },
    // })
  },
  // 收藏
  collect(e) {
    var _index = this.switchIndex(), 
      _this = this,
      index = e.currentTarget.dataset.index,
      list = this.data['list' + _index],
      id = e.detail.id
    // util.request({
    //   url: 'collect/set',
    //   data: {
    //     media_id: id,
    //   },
    //   success(res){
        var res = { is_collect: 1 }
        var is_collect = !list[index].is_collect
        _this.setData({
          ['list[' + index + '].is_collect']: is_collect,
        })
    //   },
    // })
  },
  // 请求商品（媒体）列表
  pageData() {
    var _index = this.switchIndex(), 
      _type = this.switchIndex('type'),
      _this = this,
      search = this.data['search' + _index],
      page = this.data['page' + _index],
      list = this.data['list' + _index]
    _this.setData({ ['loading' + _index]: true })// 加载中
    // this['ajax'+_index] = util.request({
    //   url: 'collect/list',
    //   data: {
    //     type: type,
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
    console.log(_type)
      if (_type == 1){
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
      } else {
        var res = {list: [
          {
            "id": 1,
            "name": "123234",
            "photo": "/images/index_bg.jpg",
            "text": "wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字",
            "images": ["/images/product.png", "/images/product.png", "/images/product.png", "/images/product.png", "/images/product.png", "/images/product.png", "/images/product.png", "/images/product.png"],
            "video": "",
            "video_poster": "",
            "comment_num": 31,
            "comment": [
              { id: 1, name: '123', text: '评论', },
              { id: 1, name: '123', text: '评论', },
            ],
            "like_num": 2,
            "is_like": 1,
            "is_collect": 0,
            "add_time": "2018-09-13 16:11:33"
          }, {
            "id": 1,
            "name": "123234",
            "photo": "/images/index_bg.jpg",
            "text": "wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字",
            "images": ["/images/product.png"],
            "video": "",
            "video_poster": "",
            "comment_num": 31,
            "comment": [
              { id: 1, name: '123', text: '评论', },
              { id: 1, name: '123', text: '评论', },
            ],
            "like_num": 1,
            "is_like": 1,
            "is_collect": 0,
            "add_time": "2018-09-13 16:11:33"
          }, {
            "id": 2,
            "name": "123234",
            "photo": "/images/index_bg.jpg",
            "text": "文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字\r\n",
            "images": [],
            "video": "http://132.232.15.225:8080/video/13f67edeca135431b96f6a21d2404e74.mp4",
            "video_poster": "http://132.232.15.225:8080/images/product.png",
            "comment_num": 1,
            "comment": [
              { id: 1, name: '123', text: '评论', },
              { id: 1, name: '123', text: '评论', },
            ],
            "like_num": 1,
            "is_like": 1,
            "is_collect": 0,
            "add_time": "2018-09-13 16:11:33"
          }
        ]}
      }
      list.push(...res.list)

      _this.setData({
        ['list' + _index]: list,
        ['loading' + _index]: false,
      })
    //   },
    // })
  },
  onLoad: function () {
    this.pageData()
  },
  // 上拉加载
  onReachBottom() {
    console.log('上拉加载')
    var _index = this.switchIndex(),
      ajax = this['ajax' + _index],
      pageData = this.pageData
    if (!this.data['loading' + _index]) {
      ajax && ajax.abort()
      pageData && pageData()
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    console.log('下拉刷新')
    var _index = this.switchIndex(),
      ajax = this['ajax' + _index],
      pageData = this.pageData
    this.setData({
      ['search' + _index]: '',
      ['list' + _index]: [],
      ['page' + _index]: 1,
    })
    ajax && ajax.abort()
    pageData && pageData()
    setTimeout(() => { wx.stopPullDownRefresh() }, 1000)
  }
})
