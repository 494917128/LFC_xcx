Component({

  properties: {
    item: Object,
    index: String, // tab页有index
  },

  data: {

  },

  methods: {
    navigator(e){
      var id = e.currentTarget.dataset.id||''
      wx.navigateTo({
        url: '/pages/mediaDetail/mediaDetail?id='+id+'&index='+this.data.index,
      })
    },
    like(e) { 
      var id = e.currentTarget.dataset.id
      this.triggerEvent('Like', {id})
    },
    collect() { 
      this.triggerEvent('Collect', {})
    },
  },
  ready() {
  }
})
