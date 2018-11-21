const util = require('../../utils/util.js'),
  app = getApp()

Page({
  data: {
    image_url: app.image_url,
    play_index: 0, // 当前正在播放的音乐
    is_play: true,
  },
  audio(e){
    var index = e.currentTarget.dataset.index
    if (index == this.data.play_index) { // 暂停或播放当前这条的
      if (this.backgroundAudio.paused) { // 当前暂停，点击播放
        this.backgroundAudio.play()
      } else { // 当前播放，点击暂停
        this.backgroundAudio.pause()
      }
    } else {
      this.audioNew(index)
    }
  },
  audioPlay() {
    this.backgroundAudio.play()
  },
  audioStop() {
    this.backgroundAudio.stop()
  },
  audioNew(index) { // 播放这一条，新建一个背景音乐
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = '此时此刻2'
    backgroundAudioManager.epname = '此时此刻2'
    backgroundAudioManager.singer = '许巍2'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'

    app.backgroundAudioManager.content = backgroundAudioManager // 更新实例
    this.backgroundAudio = app.backgroundAudioManager.content
    this.setData({
      play_index: index,
      is_play: true,
    })
  },
  onLoad: function () {
    var _this = this
    this.backgroundAudio = app.backgroundAudioManager.content
    this.setData({ is_play: !this.backgroundAudio.paused })

    app.backgroundAudioManager.play.push(function () {
      _this.setData({ is_play: true })
    })
    app.backgroundAudioManager.stop.push(function () {
      _this.setData({ is_play: false })
    })
  },
  onUnload(){
    app.backgroundAudioManager.play.pop()
    app.backgroundAudioManager.stop.pop()
  }
})