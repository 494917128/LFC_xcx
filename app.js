//app.js
App({
  onLaunch: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    // backgroundAudioManager.title = '此时此刻'
    // backgroundAudioManager.epname = '此时此刻'
    // backgroundAudioManager.singer = '许巍'
    // backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // // 设置了 src 之后会自动播放
    // backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    
    var _this = this
    backgroundAudioManager.onPlay(function () {
      _this.backgroundAudioManager.playFunction()
    })
    backgroundAudioManager.onStop(function () {
      _this.backgroundAudioManager.stopFunction()
    })
    backgroundAudioManager.onError(function () {
      _this.backgroundAudioManager.stopFunction()
    })
    backgroundAudioManager.onPause(function () {
      _this.backgroundAudioManager.stopFunction()
    })
    backgroundAudioManager.onEnded(function () {
      backgroundAudioManager.play() // 播放结束重新播放
    })

    this.backgroundAudioManager.content = backgroundAudioManager
  },
  url: 'http://liveforcool.com/',
  // url: 'http://132.232.15.225:81/',
  image_url: 'https://images.saiminet.com/',
  // image_url: 'http://132.232.15.225:8080/',
  AppID: 'wx2dc76b68094be102',
  AppSecret: 'a7e7da853104c153ef822d11ffca99bc',
  backgroundAudioManager: { // 背景音乐
    content: '', // 背景音乐实例
    play: [], // play要执行的方法列表
    playFunction: function () { // 执行所有play执行方法
      this.play.map((item) => {
        item()
      })
    },
    stop: [], // stop要执行的方法列表
    stopFunction: function () { // 执行所有stop执行方法
      this.stop.map((item) => {
        item()
      })
    },
  },
  globalData: {
  }
})