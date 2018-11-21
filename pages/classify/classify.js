const util = require('../../utils/util.js')

Page({
  data: {
    list: [
      {image:'/images/logo/classify1.jpg',name:'AAPE'},
      {image:'/images/logo/classify2.png',name:'ADDIDAS'},
      {image:'/images/logo/classify3.png',name:'ANTI SOCAIL CLUB'},
      {image:'/images/logo/classify4.png',name:'BAPE'},
      {image:'/images/logo/classify5.png',name:'CALVIN KLEIN'},
      {image:'/images/logo/classify6.png',name:'CHAMPION'},
      {image:'/images/logo/classify7.png',name:'AAPE'},
      {image:'/images/logo/classify8.png',name:'ADDIDAS'},
      {image:'/images/logo/classify9.png',name:'ANTI SOCAIL CLUB'},
      {image:'/images/logo/classify10.png',name:'BAPE'},
    ],
    new_list: [],
  },
  // 请求品牌列表
  pageData(){
    var _this = this
    // util.request({
    //   url: 'brand/list',
    //   data: {},
    //   success(res){
        var res = {
          list: [
            {id:1,image:'/images/logo/classify1.jpg',name:'AAPE'},
            {id:1,image:'/images/logo/classify2.png',name:'ADDIDAS'},
            {id:1,image:'/images/logo/classify3.png',name:'ANTI SOCAIL CLUB'},
            {id:1,image:'/images/logo/classify4.png',name:'BAPE'},
            {id:1,image:'/images/logo/classify5.png',name:'CALVIN KLEIN'},
            {id:1,image:'/images/logo/classify6.png',name:'CHAMPION'},
            {id:1,image:'/images/logo/classify7.png',name:'AAPE'},
            {id:1,image:'/images/logo/classify8.png',name:'ADDIDAS'},
            {id:1,image:'/images/logo/classify9.png',name:'ANTI SOCAIL CLUB'},
            {id:1,image:'/images/logo/classify10.png',name:'BAPE'},
          ],
        }
        _this.setData({
          list: res.list
        })
    //   }
    // })
  },
  onLoad: function () {
    this.pageData()
  },
})
