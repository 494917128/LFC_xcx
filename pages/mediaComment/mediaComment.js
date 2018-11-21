const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    list: [],
    page: 1,
    loading: false,
    comment_input: '', // 回复的内容
    comment_again_name: '', // 二重回复的人的名字
    comment_again_id: '', // 二重回复的人的id
    comment_again_index: '', // 二重回复的人的位置
    comment_focus: false, // 输入框是否聚焦
  },
  commentAgain(e) {
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
  commentInput(e) {
    var value = e.detail.value,
      comment_again_name = this.data.comment_again_name,
      input = value.split('回复 @' + comment_again_name + '：'),
      comment_input = ''
    console.log(input)
    if (input.length == 2) { // 代表是二重回复
      comment_input = input[1]
    } else if (input.length == 1) { // 代表是一重回复
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
      id = this.data.comment.id,
      comment_id = this.data.comment_again_id,
      value = this.data.comment_input,
      data = {}
    if (comment_id) { // 三级
      data.comment_id = comment_id;
      value = '回复 @'+this.data.comment_again_name+'：'+value
    } else { data.comment_id = id } // 二级
    data.value = value
    // util.request({
    //   url: 'media/comment/add',
    //   data: data,
    //   success(res) {
        var res = {"id":24,"name":app.globalData.userInfo.user_name,"photo": "/images/index_bg.jpg","text":value,"comment":{"page":{"page":1,"totalCount":0,"TotalPage":0,"pageSize":8},"list":[]},"add_time":"2018-09-15 17:32:11"}
        wx.showToast({
          title: '评论成功',
        })
        list.unshift(res)
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
  pageData(){
    var _this = this,
      page = this.data.page,
      list = this.data.list
    _this.setData({ loading: true })// 加载中
    // this.ajax = util.request({
    //   url: 'media/comment/list',
    //   data: {
    //     media_id: this.data.id,
    //     comment_id: this.data.comment.id
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
        var res = {"list":[{"id":24,"name":"123234","photo": "/images/index_bg.jpg","text":"1222222","add_time":"2018-09-15 17:32:11"},{"id":18,"name":"123234","photo": "/images/index_bg.jpg","text":"   到底是范","comment":{"page":{"page":1,"totalCount":12,"TotalPage":2,"pageSize":8}},"add_time":"2018-09-15 16:30:13"},{"id":17,"name":"123234","photo": "/images/index_bg.jpg","text":"123","add_time":"2018-09-15 16:29:54"},{"id":16,"name":"123234","photo": "/images/index_bg.jpg","text":"123","add_time":"2018-09-15 16:29:14"},{"id":15,"name":"123234","photo": "/images/index_bg.jpg","text":"撒地方","add_time":"2018-09-15 16:25:06"},{"id":14,"name":"123234","photo": "/images/index_bg.jpg","text":"第三方","add_time":"2018-09-15 16:24:22"},{"id":13,"name":"123234","photo": "/images/index_bg.jpg","text":"啊啊啊","add_time":"2018-09-15 16:23:37"},{"id":12,"name":"123234","photo": "/images/index_bg.jpg","text":"啊啊啊","add_time":"2018-09-15 16:23:37"}]
        }
        list.push(...res.list)

        _this.setData({
          list: list,
          loading: false,
        })
    //   }
    // })
  },
  onLoad: function (options) {
    this.setData({
      comment: options,
    })
    this.pageData()
  },
  // 上拉加载
  onReachBottom() {
    console.log('上拉加载')
    if (!this.data.loading) {
      this.ajax && this.ajax.abort()
      this.pageData()
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
  },
})