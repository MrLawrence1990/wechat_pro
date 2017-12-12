Page({
  data: {
    logs: [],
    groundList:[],
    showtips: "",
    tips: false,
    msg: ""
  },
  onLoad: function () {
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
    wx.request({
      url: 'http://localhost:3000/reserve/list',
      success: function (res) {
        if(res.data.code==200){
          that.setData({
            groundList: res.data.data
          })
        }
      },
      fail: function (res) {
        that.error(res.msg);
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
  tips: function () {
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
  gpReserve:function(event){
    const ground = event.currentTarget.dataset.ground;
    /*
      后续扩展 管理员可以看预约信息
    */
    if(ground.reserve_status==1){
      return;
    }
    wx.navigateTo({
      url: "../../pages/reserveInfo/reserveInfo?groundId="+ground.id+"&groundType="+ground.ground_type
    });
  }
})