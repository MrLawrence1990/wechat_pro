// pages/reserveInfo/reserveInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reserveParam:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroundInfo(options);
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
  getGroundInfo: function (options){
    const that = this;
    wx.request({
      url: 'http://localhost:3000/reserve/info',
      data:{
        groundId: options.groundId
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            groundInfo: res.data.data[0]
          })
        }
      },
      fail: function (res) {
        that.error(res.msg);
      }
    })
  },
  showReserve:function(){
    var that = this;
    var ground = that.data.groundInfo
    var itemList
    if (ground.reserve_status1 == 0 && ground.reserve_status2 == 0){
      itemList = ['下午', '晚上']
    } else if (ground.reserve_status1 == 0 && ground.reserve_status2 == 1){
      itemList = ['下午']
    } else if (ground.reserve_status1 == 1 && ground.reserve_status2 == 0) {
      itemList = ['晚上']
    }else{
      return;
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        that.data.reserveParam.time_type = res.tapIndex;
        that.setData({
          time_type_text: res.tapIndex == 0 ? '上午' : '下午'
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})