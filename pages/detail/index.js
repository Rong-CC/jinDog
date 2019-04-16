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
    },
    hideBuy: true,
    badgeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    const id = options.id;
    // const id = "4a4c8b8e4d8c22a97a94b46f58c1f3b9"
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
    const slef = this;
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        console.log(res)
        const cartArray = res.data;
        slef.setBadge(cartArray);
      },
    })
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
  },
   // 弹框
  popBuy(){
    this.setData({
      hideBuy: false
    })
    console.log("显示")
  },
  updateSelectItem(e){
    this.setData({
      baitiaoSelectItem:e.detail
    })
    console.log(e)
  },
    // 子组件传的  购买数量
  updateCount(e){
    let partData = this.data.partData
    partData.count = e.detail.val;
    this.setData({
      partData: partData
    })
    console.log(this.data.partData)
  },
  // 加入购物车
  addCart(e){
    // console.log('加入购物车')
    const self = this;
    wx:wx.getStorage({
      key: 'cartInfo',
      // 查到cartInfo 这个数据了，判断数组中是否拥有当前添加的商品
      success(res) {
        const cartArray = res.data;
        // 拿到现在添加的商品对象
        const partData = self.data.partData;
        let isExit  = false;
        cartArray.forEach(cart => {
          if(cart.id == partData.id){
            isExit = true;
            cart.total += self.data.partData.count;
            wx.setStorage({
              key: 'cartInfo',
              data: cartArray,
            })
          }
        })

        if(!isExit){ // 不存在Storage 商品
          partData.total = self.data.partData.count;
          cartArray.push(partData);
          wx:wx.setStorage({
            key: 'cartInfo',
            data: cartArray
          })
        }
        // 商品数量
        self.setBadge(cartArray)
      },
      fail(res) {
        let partData = self.data.partData;
        partData.total = self.data.partData.count
        let cartArray = [];
        cartArray.push(partData);
        wx.setStorage({
          key: 'cartInfo',
          data: cartArray,
        })
        // 商品数量
        self.setBadge(cartArray)
      }
    }),
    wx.showToast({
      title: '加入购物车',
      icon: 'success',
      duration: 3000
    })
  },
  setBadge(item){
    this.setData({
      badgeCount: item.length
    })
  }
})