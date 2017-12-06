Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: null
    })
  },
  goPage: function (event) {
    const page = event.currentTarget.dataset.page;
    wx.redirectTo({
      url: '../' + page + '/' + page
    })
  }
})