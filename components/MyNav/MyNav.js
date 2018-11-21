Component({

  properties: {
    nav_list: Array,
    nav_index: Number,
  },

  data: {

  },

  methods: {
    navbar(e){
      var index = e.currentTarget.dataset.index
      this.triggerEvent('Navbar', {index})
    }
  },
  ready() {

  }
})
