Component({

  properties: {
    list: Array,
  },

  data: {

  },

  methods: {
    updatePhoto() {
      this.triggerEvent('Photo', {})
    },
    updatePassword() {
      this.triggerEvent('Password', {})
    },
    valueChange(e){
      var name = e.currentTarget.dataset.name
      var content = e.detail.value
      this.triggerEvent('Input', { name, content })
    },
    regionChange(e){
      this.triggerEvent('RegionChange', e)
    },
  },
  ready() {
    console.log(this.data.list)
  }
})
