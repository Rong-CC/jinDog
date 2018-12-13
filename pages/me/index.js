// pages/me/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo:false,
    canIUse:wx.canIUse("button.open-type.getUserInfo")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else if(this.data.canIUse){
      //由于getUserInfo 是网络请求，可能会在Page.onLoad 之后返回
      // 为了防止z这种情况发生，所以此处加入callback
      app.userInfoReadyCallback = res =>{
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
  },
  getUserInfo(e){
    console.log(e)
    this.setData({
      userInfo:e.detail.userInfo,
      hasUserInfo: true
    })
  }
})