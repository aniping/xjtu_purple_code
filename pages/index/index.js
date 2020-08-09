//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    savedFilePath: "",
    stu_name: "",
    stu_no: "",
    stu_pp: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getMyInfo();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.countDown();
  },

  getMyInfo: function(){
    let savedFilePath = wx.getStorageSync('head_pic')
    let stu_name = wx.getStorageSync('stu_name')
    let stu_no = wx.getStorageSync('stu_no')
    let stu_pp = wx.getStorageSync('stu_pp')
    let stu_xue = wx.getStorageSync('stu_xue')
    this.setData({
      savedFilePath: savedFilePath,
      stu_name: stu_name,
      stu_no: stu_no,
      stu_pp: stu_pp,
      stu_xue: stu_xue
    });
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onPullDownRefresh() {
    // 上拉刷新
    if (!this.loading) {
      this.getMyInfo();
      wx.stopPullDownRefresh()
    }
  },

  countDown:function(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    this.setData({
      M: M,
      D: D,
      hour: hour,
      minute: minute,
      second: second
    });
    setTimeout(this.countDown, 1000);
  }

  
})