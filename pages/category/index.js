const interfaces = require("../../utils/urlconfig.js")
// pages/category/logs.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],
    navRightItems:[],
    curIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中...'
    })
    wx.request({
      url: interfaces.productions,
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          navLeftItems: res.data.navLeftItems,
          navRightItems:res.data.navRightItems
        })
        wx.hideLoading()
      }
    })
  },
  switchRightTab(e){ // 左边菜单点击事件
      let index = parseInt (e.currentTarget.dataset.index)
      this.setData({
        curIndex: index
      })
  },
  showListView(e){
    let text = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '/pages/list/index?title='+text,
    })
    console.log(e.currentTarget.dataset.text)
  }
})