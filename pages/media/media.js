const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    search: '',
    list: [],
    page: 1,
    loading: false,
    search_value: '',
  },
  searchValue(e) {
    var value = e.detail.value
    this.setData({
      search_value: value,
    })
  },
  search() {
    this.setData({
      list: [],
      page: 1,
      search: this.data.search_value
    })
    this.pageData()
  },
  // 点赞
  like(e) {
    var _this = this,
      index = e.currentTarget.dataset.index,
      list = this.data.list,
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
    var _this = this,
      index = e.currentTarget.dataset.index,
      list = this.data.list,
      id = e.detail.id
    // util.request({
    //   url: 'collect/set',
    //   data: {
    //     media_id: id,
    //   },
    //   success(res){
        var res = { is_collect: 1 }
        var is_collect = !data.is_collect
        _this.setData({
          ['list[' + index + '].is_collect']: is_collect,
        })
    //   },
    // })
  },
  // 请求媒体列表
  pageData(){
    var _this = this,
      search = this.data.search,
      page = this.data.page,
      list = this.data.list
    _this.setData({ loading: true })// 加载中
    // this.ajax = util.request({
    //   url: 'media/list',
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
      list.push(...res.list)

      _this.setData({
        list: list,
        loading: false,
      })
    //   },
    // })
  },
  onLoad: function() {
    this.pageData()
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