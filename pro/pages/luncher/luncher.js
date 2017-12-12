// pages/luncher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtips:"",
    tips:false,
    msg:""
  },
  error:function(msg){
    this.setData({
      showtips: "shake",
      tips:true,
      msg:msg
    })
    this.closeTips();
  },
  tips:function(){
    this.setData({
      showtips: "show",
      tips: true,
      msg: msg
    })
    this.closeTips();
  },
  closeTips:function(){
    const that=  this;
    setTimeout(function () {
      that.setData({
        showtips: ""
      })
    }, 1800);
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
    /*
    新用户注册
    */
    setTimeout(function () {
      wx.switchTab({
        url: '../reserve/reserve'
      })
    }, 2000)
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