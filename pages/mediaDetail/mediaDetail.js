const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    page_data: {},
    list: [],
    page: 1,
    loading: false,
    comment_input: '', // 回复的内容
    comment_again_name: '', // 二重回复的人的名字
    comment_again_id: '', // 二重回复的人的id
    comment_again_index: '', // 二重回复的人的位置
    comment_focus: false, // 输入框是否聚焦
  },
  commentAgain(e){
    var name = e.currentTarget.dataset.name,
      id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index
    this.setData({
      comment_again_name: name,
      comment_again_id: id,
      comment_again_index: index,
      comment_focus: true,
    })
  },
  commentInput(e){
    var value = e.detail.value,
      comment_again_name = this.data.comment_again_name,
      input = value.split('回复 @'+comment_again_name+'：'),
      comment_input = ''
    console.log(input)
    if(input.length == 2){ // 代表是二重回复
      comment_input = input[1]
    } else if (input.length == 1){ // 代表是一重回复
      this.setData({
        comment_again_id: '',
        comment_again_index: '',
      })
      comment_input = input[0]
      comment_again_name = ''
    }
    this.setData({
      comment_input,
      comment_again_name
    })
  },
  // 提交评论
  commentSubmit (){
    var _this = this,
      list = this.data.list,
      media_id = this.data.id,
      comment_id = this.data.comment_again_id,
      value = this.data.comment_input,
      data = {}
    data.value = value
    if (comment_id) { data.comment_id = comment_id } // 二级
    else { data.media_id = media_id } // 一级
    // util.request({
    //   url: 'media/comment/add',
    //   data: data,
    //   success(res) {
        var res = {"id":24,"name":app.globalData.userInfo.user_name,"photo": "/images/index_bg.jpg","text":value,"comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 17:32:11"}
        wx.showToast({
          title: '评论成功',
        })
        if (comment_id) {
          list[this.data.comment_again_index].comment.list.unshift(res)
        } else {
          list.unshift(res)
        }
        _this.setData({ // 清空
          list, 
          comment_input: '',
          comment_again_name: '',
          comment_again_id: '',
          comment_again_index: '',
        })
    //   },
    // })
  },
  // 点赞
  like(e) {
    console.log(e)
    var _this = this,
      index = this.data.index,
      data = this.data.page_data,
      id = e.detail.id
    // util.request({
    //   url: 'media/setLike',
    //   data: {
    //     media_id: id,
    //   },
    // success(res){
      var res = 1
      var is_like = !data.is_like
      var like_num = data.is_like?data.like_num-1:data.like_num+1
      _this.setData({
        ['page_data.is_like']: is_like,
        ['page_data.like_num']: like_num,
      })
      // 更改上一页的数据
      util.prevPage({
        ['list[' + index + '].is_like']: is_like,
        ['list[' + index + '].like_num']: like_num,
      })
    //   },
    // })
  },
  // 收藏
  collect(e) {
    var _this = this,
      index = this.data.index,
      data = this.data.page_data,
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
          ['page_data.is_collect']: is_collect,
        })
        // 更改上一页的数据
        util.prevPage({
          ['list[' + index + '].is_collect']: is_collect,
        })
    //   },
    // })
  },
  // 加载评论列表
  commentData(){
    var _this = this,
      page = this.data.page,
      list = this.data.list
    _this.setData({ loading: true })// 加载中
    // this.ajax = util.request({
    //   url: 'media/comment/list',
    //   data: {
    //     media_id: this.data.id,
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
        var res = {"list":[{"id":24,"name":"123234","photo": "/images/index_bg.jpg","text":"1222222","comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 17:32:11"},{"id":18,"name":"123234","photo": "/images/index_bg.jpg","text":"   到底是范","comment":{"page":{"page":1,"totalCount":12,"TotalPage":2,"pageSize":8},"list":[{"id":31,"name":"123234","photo": "/images/index_bg.jpg","text":"回复 @123 ：789","add_time":"2018-09-15 19:16:53"},{"id":30,"name":"123234","photo": "/images/index_bg.jpg","text":"回复 @123 ：哈哈哈","add_time":"2018-09-15 19:16:36"},{"id":29,"name":"123234","photo": "/images/index_bg.jpg","text":"回复 @123 ：VC下班","add_time":"2018-09-15 18:47:10"},{"id":28,"name":"123234","photo": "/images/index_bg.jpg","text":"回复 @123 ：VC下班","add_time":"2018-09-15 18:47:10"},{"id":27,"name":"123234","photo": "/images/index_bg.jpg","text":"第三个","add_time":"2018-09-15 18:47:07"},{"id":26,"name":"123234","photo": "/images/index_bg.jpg","text":"单方事故","add_time":"2018-09-15 18:47:04"},{"id":25,"name":"123234","photo": "/images/index_bg.jpg","text":"123","add_time":"2018-09-15 18:47:01"},{"id":23,"name":"123234","photo": "/images/index_bg.jpg","text":"回复 @123 ：撒分为","add_time":"2018-09-15 16:52:48"}]},"add_time":"2018-09-15 16:30:13"},{"id":17,"name":"123234","photo": "/images/index_bg.jpg","text":"123","comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 16:29:54"},{"id":16,"name":"123234","photo": "/images/index_bg.jpg","text":"123","comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 16:29:14"},{"id":15,"name":"123234","photo": "/images/index_bg.jpg","text":"撒地方","comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 16:25:06"},{"id":14,"name":"123234","photo": "/images/index_bg.jpg","text":"第三方","comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 16:24:22"},{"id":13,"name":"123234","photo": "/images/index_bg.jpg","text":"啊啊啊","comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 16:23:37"},{"id":12,"name":"123234","photo": "/images/index_bg.jpg","text":"啊啊啊","comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 16:23:37"}]
        }
        list.push(...res.list)

        _this.setData({
          list: list,
          loading: false,
        })
    //   }
    // })
  },
  // 加载媒体数据
  pageData(){
    var _this = this
    // util.request({
    //   url: 'media/media',
    //   data: {
    //     media_id: this.data.id,
    //   },
    //   success(res){
        var res = {
          "id": 1,
          "name": "123234",
          "photo": "/images/index_bg.jpg",
          "text": "wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字wenzi文字文字文字超级多文字",
          "images": [],
          "video": "http://132.232.15.225:8080/video/13f67edeca135431b96f6a21d2404e74.mp4",
          "video_poster": "http://132.232.15.225:8080/images/product.png",
          "comment_num": 31,
          "like_num": 2,
          "is_like": 1,
          "is_collect": 0,
          "add_time": "2018-09-13 16:11:33"
        }
        _this.setData({
          page_data: res
        })
    //   }
    // })
  },
  onLoad: function (options) {
    this.setData({
      id: options.id,
      index: options.index, // 用于改变上一页的点赞
    })
    this.pageData()
    this.commentData()
  },
  // 上拉加载
  onReachBottom() {
    console.log('上拉加载')
    if (!this.data.loading) {
      this.ajax && this.ajax.abort()
      this.commentData()
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
    this.commentData()
    setTimeout(() => { wx.stopPullDownRefresh() }, 1000)
  },
  onShareAppMessage: function (res = {}) {
    var id = this.data.id,
      path = '/pages/mediaDetail/mediaDetail?id=' + id
    return {
      path: path
    }
  }

})