//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.openSetting({
            success: (setting) => {
              setting.authSetting = {
                "scope.userInfo": true
              };
              wx.getUserInfo({
                success: res => {
                  console.log(res)
                  this.globalData.userInfo = res.userInfo
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      },
      fail: res => {
        console.log(res)
        /*
          调试数据
        */
        const data = {
          userInfo: {
            "nickName": "Lawrence",
            "gender": 1,
            "language": "zh_CN",
            "city": "Hangzhou",
            "province": "Zhejiang",
            "country": "China", "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epzKgKHxx2picDodbgCcWsDFscKPI4HvNDFBjd8A8Tj0nEhCI4IwTBn2GTHVnHcJDzYQvVFdpdUtwg/0"
          }
        };
        this.userInfoReadyCallback(data)
      }
    })
  },
  userInfoReadyCallback: function (data) {
    const that= this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/user/regWechatUser',
            data: {
              js_code: res.code,
              appid: "wx11a30002c58bcc40",
              secret: "8797afba30707d049b747457a3a59e05",
              grant_type: "authorization_code",
              userInfo: data.userInfo
            }, success: function (res) {
              console.log(res);
              //如果已注册，获取注册的信息，里面可能包含电话
            },
            fail: function (res) {
              that.getCurrentPage().error(res.msg);
            }
          })
          wx.request({
            url: 'http://localhost:3000/user/getUser',
            success: function (res) {
              console.log(res);
            },
            fail: function (res) {
              that.getCurrentPage().error(res.msg);
            }
          })
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    showtips: null
  }
})