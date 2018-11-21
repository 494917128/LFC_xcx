const app = getApp()
Component({
  relations: {

  },
  properties: {
    top: Number, // 距离顶部高度，单位rpx
    black: Boolean, 
  },

  data: {
    is_play: true,
  },

  methods: {
    song(){
      console.log(app.backgroundAudioManager.content)
      const backgroundAudioManager = app.backgroundAudioManager.content
      if (this.data.is_play) {
        backgroundAudioManager.pause()
      } else {
        backgroundAudioManager.play()
      }
    },
  },
  ready() {
    const backgroundAudioManager = app.backgroundAudioManager.content,
      play = app.backgroundAudioManager.play, // 播放方法
      stop = app.backgroundAudioManager.stop, // 暂停方法
      _this = this
    
    this.setData({ 
      top: this.data.top + 10, 
      is_play: !backgroundAudioManager.paused 
    })

    play.push(function () {
      _this.setData({ is_play: true })
    })
    stop.push(function () {
      _this.setData({ is_play: false })
    })
  },
  moved() { // 移除
    const play = app.backgroundAudioManager.play, // 播放方法
      stop = app.backgroundAudioManager.stop // 暂停方法
    play.pop()
    stop.pop()
  }
})
