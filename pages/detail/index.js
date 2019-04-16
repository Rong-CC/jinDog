// pages/detail/index.js
const interfaces = require("../../utils/urlconfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData: {},
    biaotiao:[],
    hideBaitiao:true,
    baitiaoSelectItem:{
      desc: "【白条支付】 首单享立减优惠"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    // const id = options.id;
    const id = "4a4c8b8e4d8c22a97a94b46f58c1f3b9"
    const self = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: interfaces.productionDetail,
      success(res){
        let result = null;
        res.data.forEach(data=>{
            console.log(data)
            if(data.partData.id == id){
                result = data;
            }
        })
        self.setData({
          partData: result.partData,
          baitiao:result.baitiao 
        })
        console.log(self.data.baitiao)
        console.log(self.data.partData, 'sss')
        wx.hideLoading()
        // console.log(e)
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

  },
  popBaitiao(){
    this.setData({
      hideBaitiao: false
    })
    console.log()
  },
  popBuy(){
    console.log("显示")
  },
  updateSelectItem(e){
  this.setData({
    baitiaoSelectItem:e.detail
  })
    console.log(e)
  }
})