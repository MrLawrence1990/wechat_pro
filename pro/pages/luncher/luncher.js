// pages/luncher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
    wx.login({
      success:function(res){
        if(res.code){
          console.log(res)
          wx.request({
            url: 'http://localhost:3000/users/regWechatUser',
            data:{
              js_code:res.code,
              appid:"wx11a30002c58bcc40",
              secret:"8797afba30707d049b747457a3a59e05",
              grant_type:"authorization_code"
            }
          })
        }
      }
    });
    return;
    setTimeout(function () {
      wx.redirectTo({
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