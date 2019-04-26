// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    setTimeout(function () {
      // 显示顶部刷新图标
      wx.showNavigationBarLoading();
      // 隐藏 导航加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const loading = this.data.searchLoading
    this.setData({
      searchLoading: !loading
    })
    // setTimeout(function(){
    //   this.setData({
    //     searchLoading: false
    //   })
    // },500)
    // wx.showLoading({
    //   title: '玩命加载中',
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})