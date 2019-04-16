// components/IOU/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hideBaitiao:{
      type:Boolean,
      value:true
    },
    list:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clone(){
      
    },
    hiddenBaitianView(e){
      if(e.target.dataset.target == "self"){
        this.setData({
          hideBaitiao: true
        })
      }
    },
    slelectItem(e){
      let index = e.currentTarget.dataset.index
      let baotiao = this.data.list;
      for(let i =0; i< baotiao.length; i++){
        baotiao[i].select = false;
      }
      baotiao[index].select = true;
      this.setData({
        list:baotiao,
        selectIndex: index
      })
    },
    mackBaitiao(e){
      this.setData({
        hideBaitiao: true
      })
      const selectItem = this.data.list[this.data.selectIndex]
      // console.log(selectItem)
      // 事件传递
      this.triggerEvent("updateSelect",selectItem)
      // this.triggerEvent("popView")
    }
  }
})
