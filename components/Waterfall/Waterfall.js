Component({
  relations: {

  },
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        var left_list = [],
          right_list = []
        newVal.map((item,index)=>{
          if (index % 2 == 0) {
            left_list.push(item)
          } else {
            right_list.push(item)
          }
        })
        this.setData({
          left_list,
          right_list
        })
      }
    },
    navigator: String,
  },

  data: {
    left_list: [],
    right_list: [],
  },

  methods: {

    // 获取图片宽高
    // imageLoad(e) {
    //   var index = e.currentTarget.dataset.index,
    //     list = this.data.all_list,
    //     left_list = this.data.left_list,
    //     right_list = this.data.right_list,
    //     left_height = this.data.left_height,
    //     right_height = this.data.right_height

    //   var width = e.detail.width,    //获取图片真实宽度  
    //     height = e.detail.height,
    //     ratio = width / height;      //图片的真实宽高比例  

    //   if (left_height <= right_height) {
    //     left_list.push(list[index])
    //     this.setData({
    //       left_list: left_list,
    //       left_height: left_height + height
    //     })
    //   } else {
    //     right_list.push(list[index])
    //     this.setData({
    //       right_list: right_list,
    //       right_height: right_height + height
    //     })
    //   }
    // },
  },
  ready() {
  }
})
