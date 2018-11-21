const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    list: [],
  },
  // 删除
  delete(e){
    var _this = this,
      id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index      
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      success(res) {
        if(res.confirm) {
          _this.deleteRequest(id,index)
        }
      }
    })
  },
  deleteRequest(id,index){
    var _this = this,
      list = this.data.list
    // util.request({
    //   utl: 'address/delete',
    //   data: {
    //     address_id: id
    //   },
    //   success(res) {
        list.splice(index,1)
        _this.setData({
          list: list
        })
        wx.showToast({
          title: '删除成功',
          icon: 'none',
        })
    //   }
    // })
  },
  // 选择地址
  addressSelect(e) {
    var index = e.detail.value,
      data = this.data.list[index]
    util.prevPage({
      address: data
    },true)
  },
  // 数据请求
  pageData(id){
    var _this = this
    // util.request({
    //   url: 'address/list',
    //   data: {},
    //   success(res) {
        var res = {list:[
          {id:1,contact:'联系人1',phone:13566296373,prov:'浙江省',city:'杭州市',district:'萧山区',desc:'详情'},
          {id:2,contact:'联系人2',phone:13566296373,prov:'浙江省',city:'杭州市',district:'萧山区',desc:'详情'},
          {id:3,contact:'联系人3',phone:13566296373,prov:'浙江省',city:'杭州市',district:'萧山区',desc:'详情'},
          {id:4,contact:'联系人4',phone:13566296373,prov:'浙江省',city:'杭州市',district:'萧山区',desc:'详情'},
          {id:5,contact:'联系人5',phone:13566296373,prov:'浙江省',city:'杭州市',district:'萧山区',desc:'详情'},
        ]}
        var list = res.list
        list.map((item,index)=>{
          if(item.id == id) { 
            item.checked = true
            return item
          }
        })
        _this.setData({
          list: list
        })
    //   }
    // })
  },
  onLoad: function (options) {
    this.setData({
      select: options.select||''
    })
    this.pageData(options.id)
  },
  onReachBottom() {
    console.log('上拉加载')
  },
})