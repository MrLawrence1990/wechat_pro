// pages/myreserve.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parseStatus:function(){
      debugger
      return "cancel"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initList();
  },
  initList: function () {
    var that = this;
    that.load();
    util.request({
      url: getApp().appData.api + '/reserve/myreserve',
      success: function (res) {
        if (res.code == 200) {
          that.setData({
            list: res.data
          })
        } else {
          that.error(res.msg);
        }
      },
      fail: function (res) {
        that.error(res.msg);
      },
      complete: function () {
        console.log("com")
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
  showInfo: function (event) {
    const item = event.currentTarget.dataset.reserve;
    var list = this.data.list;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == item.id) {
        list[i].show = list[i].show ? "" : "show" + (item.orderStatus == '未开始' ? ' btn' : '');
        break;
      }
    }
    this.setData({
      list: list
    })
  },
  cancelReserve: function (event) {
    let reserve = event.currentTarget.dataset.reserve;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否取消预约？',
      success: function (res) {
        if (res.confirm) {
          that.load();
          util.request({
            url: getApp().appData.api + '/reserve/cancel',
            data: {
              "id": reserve.id,
              "ground": reserve.ground,
              "date": reserve.time,
              "phone": reserve.phone,
            },
            success: function (res) {
              if (res.code == 200) {
                that.initList();
              } else {
                that.error(res.msg);
              }
            },
            fail: function (res) {
              that.error(res.msg);
            },
            complete: function () {
              console.log("com")
              that.closeLoad();
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  }
})