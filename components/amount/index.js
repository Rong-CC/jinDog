// components/amount/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: { // 商品数量
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputChangeHandle: function (event) {
      var val = event.detail.value; //通过这个传递数据
      var myEventDetail = {
        val: val
      }
      // 数据改变时 向父组件传递新数据
      this.triggerEvent('myevent', myEventDetail)
    },
    subtract: function () {
      var count = this.data.count;
      count > 1 ? count-- : 1
      this.setData({
        count: count
      })
      var myEventDetail = {
        val: count
      }
      this.triggerEvent('myevent', myEventDetail)
      this.triggerEvent('subevent')
    },
    add: function () {
      var count = this.data.count;
      this.setData({
        count: ++count
      })
      var myEventDetail = {
        val: count
      }
      this.triggerEvent('myevent', myEventDetail)
      this.triggerEvent('addevent')
    }
  }
})
