//app.js
var util = require("./utils/util.js");
App({
  appData:{
    api:'http://localhost:8088'
  },
  onLaunch: function () {
    // 展示本地存储能力
    // return;
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
    console.log(that)
    wx.login({
      success: function (res) {
        
        if (res.code) {//登录凭证
        /*
        将登录凭证发往你的服务端，并在你的服务端使用该凭证向微信服务器换取该微信用户的唯一标识(openid)和会话密钥(session_key)
        后台访问
        https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        获得openid和session_key
        */
          wx.request({
            url: that.appData.api+'/user/regWechatUser',
            /*
              这里做为第一次访问，产生的session
            */
            data: {
              js_code: res.code,
              appid: "wx11a30002c58bcc40",
              secret: "8797afba30707d049b747457a3a59e05",
              grant_type: "authorization_code",
              userInfo: data.userInfo
            }, success: function (res) {
              console.log(res);
              //如果已注册，获取注册的信息，里面可能包含电话
              /*
              服务端生成sessionId，值为openid + session_key 保存session，返回给客户端
              */
              wx.setStorageSync('sessionId', res.data.data.sessionid);
              util.request({
                url: that.appData.api + '/user/getUser',
                success: function (res) {
                  console.log(res);
                },
                fail: function (res) {
                  that.getCurrentPage().error(res.msg);
                }
              })
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
    showtips: null,
    sessionId:null
  }
})