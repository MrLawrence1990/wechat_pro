var util=require("../../utils/util.js");
Page({
  data: {
    logs: [],
    groundList:[],
    showtips: "",
    tips: false,
    msg: ""
  },
  onShow: function () {
    this.setData({
      logs: null,
      groundList:[]
    });
    this.getGroundList();
  },
  parse: function (item) {
    console.log(item);
  },
  goPage: function (event) {
    const page = event.currentTarget.dataset.page;
    wx.redirectTo({
      url: '../' + page + '/' + page
    })
  },
  error:function(){

  },
  getGroundList:function(){
    const that = this;
    that.load();
    util.request({
      url: getApp().appData.api +'/reserve/list',
      success: function (res) {
        if(res.code==200){
          that.setData({
            groundList: res.data
          })
        }else{
          that.error(res.msg);
        }
      },
      fail: function (res) {
        that.error(res.msg);
      },
      complete:function(){
        console.log("com")
        that.closeLoad();
      }
    })
  },error: function (msg) {
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
  load:function(){
    this.setData({
      loading:'loading',
      onLoad:true
    })
  },
  closeLoad:function(){
    this.setData({
      loading: '',
      onLoad:false
    })
  },
  goReserve:function(event){
    const ground = event.currentTarget.dataset.ground;
    /*
      后续扩展 管理员可以看预约信息
    */
    // if (ground.reserve_status1 == 1 && ground.reserve_status2==1){
    //   return;
    // }
    wx.navigateTo({
      url: "../../pages/reserveInfo/reserveInfo?ground=" + JSON.stringify(ground)
    });
  }
})