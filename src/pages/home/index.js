import {
  defineComponent,
  definePage,
  onHide,
  onShow,
  onUnload,
  ref,
  onReady,
  onShareAppMessage,
  onLoad,
  nextTick
} from '@vue-mini/core';

definePage(() => {
  const greeting = ref('欢迎使用 Vue Mini');
  function getRandomColor() {
    const rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length === 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  }
  const videoContext = ref(null)
  const src = ref('')
  const inputValue = ref('')
  const danmuList = ref([{
    text: '第 1s 出现的弹幕',
    color: '#ff0000',
    time: 1
  }, {
    text: '第 3s 出现的弹幕',
    color: '#ff00ff',
    time: 3
  }])
   onShow(async () => {

     videoContext.value = await wx.createVideoContext('myVideo')
   })
  onLoad(() => {
    wx.showToast({
      title: '页面显示',
      icon: 'none'
    })
    console.log('load')
  })
   onHide(() => {
     nextTick(()=>{
       wx.showToast({
         title: '页面隐藏',
         icon: 'none'
       })
       console.log('pause')
     })
     videoContext.value.stop()

  })
   onUnload(() => {
    console.log('unload')
  })



  function bindInputBlur(e) {
  inputValue.value = e.detail.value
  }

  function bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  }

  function bindVideoEnterPictureInPicture() {
    console.log('进入小窗模式')
  }

  function bindVideoLeavePictureInPicture() {
    console.log('退出小窗模式')
  }

  function bindPlayVideo() {
    videoContext.value.play()
  }
  function bindSendDanmu() {
    videoContext.value.sendDanmu({
      text:inputValue.value,
      color: getRandomColor()
    })
  }

  function videoErrorCallback(e) {
    console.log(e.detail.errMsg)
  }
  return {
    greeting,
    src,
    inputValue,
    danmuList,
    bindInputBlur,
    bindButtonTap,
    bindVideoEnterPictureInPicture,
    bindVideoLeavePictureInPicture,
    bindPlayVideo,
    bindSendDanmu,
    videoErrorCallback,
    videoContext
  };
});


