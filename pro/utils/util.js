const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = {
  formatTime: formatTime,
  request: function ({ url, data, success, fail, complete, method = "GET" }){
    var session_id = wx.getStorageSync('sessionId');//本地取存储的sessionID
    if (session_id != "" && session_id != null) {
      var header = { 'content-type': 'application/x-www-form-urlencoded', 'session': session_id }
    } else {
      var header = { 'content-type': 'application/x-www-form-urlencoded' }
    }
    console.log(session_id);
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: res => {
        if (session_id == "" || session_id == null) {
          wx.setStorageSync('sessionId', res.data.session_id) //如果本地没有就说明第一次请求 把返回的session id 存入本地
        }
        console.log(res);
        let data = res.data
        res['statusCode'] === 200 ? success(data) : fail(res)
      },
      fail: fail,
      complete: complete
    })
  }
}
