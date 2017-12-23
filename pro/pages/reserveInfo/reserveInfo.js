// pages/reserveInfo/reserveInfo.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorPhone:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    debugger
    this.setData({
      groundInfo: JSON.parse(options.ground)
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
  showReserve:function(){
    var that = this;
    var itemList = ['18:30-20:30', '20:30-22:30'];    
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        that.setData({
          time_type_text: itemList[res.tapIndex],
          time_type: itemList[res.tapIndex] == '18:30-20:30'?0:1
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  recordPhone:function(e){
    const phone = e.detail.value;
    if (/^1[34578]\d{9}$/.test(phone)){
      this.setData({
        errorPhone:false
      })
    }else{
      this.setData({
        errorPhone: true
      })
    }
    this.setData({
      reserve_phone: e.detail.value
    })
  },
  showReserveDay:function(){
    var that = this;
    var ground = that.data.groundInfo
    var itemList=[];
    var d = new Date();
    if(d.getHours()>=17){
      d.setDate(d.getDate()+1);
    }
    for(var i = 0;i<5;i++){
      itemList.push(d.Format("yyyy-MM-dd"));
      d.setDate(d.getDate()+1);
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        that.setData({
          reserve_day_text: itemList[res.tapIndex],
          reserveDay: itemList[res.tapIndex]
        });
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  doReserve:function(){
    var that = this;
    if (!(/^1[34578]\d{9}$/.test(that.data.reserve_phone)) || (!that.data.time_type && that.data.time_type!=0)){
      return;
    }
    that.load();
    util.request({
      url: getApp().appData.api +'/reserve/doreserve',
      data: {
        groundId: that.data.groundInfo.id,
        phone: that.data.reserve_phone,
        date: that.data.reserveDay,
        type: that.data.time_type
      }, success: function (res) {
        //如果已注册，获取注册的信息，里面可能包含电话
        if(res.code==200){
          that.tips("预约成功");
          setTimeout(function(){
            wx.switchTab({
              url: "../../pages/reserve/reserve"
            });
          },1200);
        }else{
          that.error(res.msg);
        }
      },
      fail: function (res) {
        that.getCurrentPage().error(res.msg);
      },
      complete:function(){
        that.closeLoad();
      }
    })
  },
  error: function (msg) {
    this.setData({
      showtips: "shake",
      tips: true,
      msg: msg
    })
    this.closeTips();
  },
  tips: function (msg) {
    this.setData({
      showtips: "show",
      tips: true,
      msg: msg
    })
    this.closeTips();
  },
  closeTips: function () {
    const that = this;
    setTimeout(function () {
      that.setData({
        showtips: ""
      })
    }, 1800);
  },
  load: function () {
    this.setData({
      loading: 'loading',
      onLoad: true
    })
  },
  closeLoad: function () {
    this.setData({
      loading: '',
      onLoad: false
    })
  },
})