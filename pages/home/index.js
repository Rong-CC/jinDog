// 引入interfaces
const interfaces = require("../../utils/urlconfig.js");

// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logos:[],
    pageRow:[],
    quicks: [],
    swipers:[],
    indicatorDots:true,
    vertical:false,
    autoplay:true,
    interval:3000,
    duration:500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.homepage,
      header:{
        "content-type": "appLication/json"
      },
      success(res){
        that.setData({
          swipers: res.data.swipers,
          logos: res.data.logos,
          quicks: res.data.quicks,
          pageRow: res.data.pageRow
        })

        wx.hideLoading()
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})