const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    swiper_image: [
      '/images/index_bg.jpg',
    ],
    page_data: [],
  },

  onLoad: function (options) {
    var _this = this
    // util.request({
    //   url: 'index/index',
    //   data: {},
    //   success: function (res) {
        var res = {
          data: {
            "swiper": [
              "/images/index_bg.jpg",
              "/images/index_bg.jpg",
              "/images/index_bg.jpg"
            ],
            "list": [
              {
                "title": "专题推荐",
                "content": {
                  "id": 1,
                  "image": "/images/index_bg.jpg",
                  "brand": "live for cool",
                  "name": "t恤"
                },
                "list": [
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  },
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  },
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  }
                ]
              },
              {
                "title": "专题推荐",
                "content": {
                  "id": 1,
                  "image": "/images/index_bg.jpg",
                  "brand": "live for cool",
                  "name": "t恤"
                },
                "list": [
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  },
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  },
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  }
                ]
              },
              {
                "title": "专题推荐",
                "content": {
                  "id": 1,
                  "image": "/images/index_bg.jpg",
                  "brand": "live for cool",
                  "name": "t恤"
                },
                "list": [
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  },
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  },
                  {
                    "id": 1,
                    "image": "/images/index_bg.jpg",
                    "brand": "live for cool",
                    "name": "t恤"
                  }
                ]
              }
            ]
          }
        }
        _this.setData({
          swiper_image: res.data.swiper,
          page_data: res.data.list
        })
    //   }
    // })
  },
  onUnload() {
    // 清除验证码读秒
    clearInterval(this.interval)
  },
})
