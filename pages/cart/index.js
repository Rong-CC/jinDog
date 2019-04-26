// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartArray:[],
    totalMoney: "0.00", //价格
    totalCount: 0,  //总数
    selectAll : false, // 全选,
    startX: 0,
    stratY: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getCount (e) {
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    cartArray[index].total = e.detail.val;
    this.setData({
      cartArray:cartArray
    })
  },
  switchGoodDetail(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + cartArray[index].id,
    })
  },
  selectGood(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 合计和数量
    let totalMoney = Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;

    // 选中状态
    let selectAll = this.data.selectAll;    
    // 设置选中或者不选中的状态
    cartArray[index].select = !cartArray[index].select;

    // 如果选中 
    if(cartArray[index].select){
      totalMoney += Number(cartArray[index].price) * cartArray[index].total;
      totalCount++;
      totalCount == cartArray.length ? selectAll = true :''
    } else{
      totalMoney -=Number(cartArray[index].price) * cartArray[index].total;
      totalCount--;
      selectAll = false;
    }

    // 更新数据
    this.setData({
      cartArray : cartArray,
      totalMoney: String(totalMoney.toFixed(2)),
      totalCount: totalCount,
      selectAll: selectAll
    })
  },
   /**
   * 子组件修改count触发
   */
  onGetCount(e){
    const index = e.currentTarget.dataset.index
    const cartArray = this.data.cartArray
    cartArray[index].total = e.detail.val
    // 更新data
    this.setData({
      cartArray: cartArray
    })
  },
  /**
   * count -1
  */
  subCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 合计
    let totalMoney = Number(this.data.totalMoney);
    // 计算金额
    if(cartArray[index].select){
      totalMoney -= Number(cartArray[index].price)
    }
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })


  },
  /**
   * count +1
  */
  addCount(e){
    const index = e.currentTarget.dataset.index;
    const cartArray = this.data.cartArray;
    // 合计
    let totalMoney = Number(this.data.totalMoney);
    // 计算金额
    if (cartArray[index].select) {
      totalMoney += Number(cartArray[index].price)
    }
    this.setData({
      totalMoney: String(totalMoney.toFixed(2))
    })
  },

  selectAll (e){
   const cartArray = this.data.cartArray;
   let totalMoney = 0;
   let totalCount = 0;
   let selectAll = this.data.selectAll;
   selectAll = ! selectAll;
   cartArray.forEach(item =>{
     // 设置选中或不选中状态和全选按钮一样的状态
     item.select = selectAll;
      // 计算总金额和商品个数
     if(item.select){
       totalMoney += Number(item.price) * item.total; 
       totalCount++;
     } else{ // 为0
      totalCount = 0;
      totalMoney = 0;
     }
      // 更新数据
      this.setData({
        cartArray: cartArray,
        totalMoney: String(totalMoney.toFixed(2)),
        totalCount: totalCount,
        selectAll: selectAll
      })
   })
  },
  touchstart(e){
    // 开始触摸时，重置所以
    this.data.cartArray.forEach(item=>{
      if(item.isTouchMove) // 未ture的时候
        item.isTouchMove = false // 其他的对象为false
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    })
  },
  touchmove(e){
    let index = e.currentTarget.dataset.index;
    // 开始x和y坐标
    let startX = this.data.startX;
    let startY = this.data.startY;
    var touchMoveX = e.changedTouches[0].clientX;
    var touchMoveY = e.changedTouches[0].clientY;
    let angel = this.angel({X: startX,Y: startY},{X: touchMoveX,Y:touchMoveY});
    // 遍历数组中的所有对象
    this.data.cartArray.forEach((cart,i)=>{
      cart.isTouchMove = false;
      if(Math.abs(angel)>30) return;
      // 滑动的角度 > 30 直接return

      // 匹配
      if(i == index){
        if (touchMoveX > startX) {// 右滑
          cart.isTouchMove = false;
        } else{ // 左滑
          cart.isTouchMove = true;
        }
      }
    })
    // 更新数据
    this.setData({
      cartArray: this.data.cartArray
    })
  },
  angel(start,end){
    var _X = end.X - start.X;
    var _Y = end.Y - start.Y;
    // 返回角度 Math.atan（） 返回数字的反正切值
    return 360 * Math.atan(_Y/_X) / (2*Math.PI);
  },
  del(e){
    var self = this;
    const index = e.currentTarget.dataset.index;
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const partData = res.data;
        partData.forEach((cart,i)=>{
          if(cart.title === self.data.cartArray[index].title){
            partData.splice(i,1);
          }
        })

      // 删除之后 存储
      wx.setStorage({
        key: 'cartInfo',
        data: partData
      })
      // 更新数据
      self.updata(index);
    },
  })
  },
  updata(index){
    console.log(index);
    var cartArray = this.data.cartArray;
    let totalMoney= Number(this.data.totalMoney);
    let totalCount = this.data.totalCount;
    // 计算价格和数量
    if(cartArray[index].select){
      totalMoney-= Number(cartArray[index].price) * cartArray[index].total;
      totalCount--
    }
    // 删除
    cartArray.splice(index,1);
    this.setData({
      cartArray : this.data.cartArray,
      totalCount: totalCount,
      totalMoney: String(totalMoney.toFixed(2))
    })
    // 设置tabBar图标
    cartArray.length > 0 ? wx.setTabBarBadge({
      index: 2,
      text: String(cartArray.length)
    }):wx.removeTabBarBadge({
      index: 2
    })
  },
  /**-
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        const cartArray = res.data;
        cartArray.forEach(item=>{
            item.select = false; //全都不选中
            item.isTouchMove = false;
        })
        self.setData({
          cartArray: res.data,
          selectAll: false,
          totalMoney: "0.00",
          totalCount: 0
        })

        // 设置tabber 图标
        res.data.length> 0 ?wx.setTabBarBadge({
          index: 2,
          text: String(res.data.length)
        }): wx.removeTabBarBadge({
          index: 2
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 页面离开更新storage
    var self = this;
    const cartArray = this.data.cartArray;
    wx:wx.getStorage({
      key: 'cartInfo',
      success: function(res) {
        self.setData({
          cartArray: res.data
        })
      }
    })
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