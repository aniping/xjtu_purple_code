// pages/info.js
Page({

  data: {
    savedFilePath: "",
    stu_name: "",
    stu_no: "",
    stu_pp: "",
    stu_xue: ""
  },
  onLoad: function (options) {

  },
  printInfo:function(){
    wx.getStorage({
      key: 'head_pic',
      success (res) {
        console.log("head_pic"+res.data)
      }
    })
    wx.getStorage({
      key: 'stu_name',
      success (res) {
        console.log("stu_name"+res.data)
      }
    })
    wx.getStorage({
      key: 'stu_no',
      success (res) {
        console.log("stu_no"+res.data)
      }
    })
    wx.getStorage({
      key: 'stu_pp',
      success (res) {
        console.log("stu_pp"+res.data)
      }
    })




  },

  //按钮点击事件
  formSubmit: function (e) {
    var stu_name = e.detail.value.stu_name;
    var stu_no = e.detail.value.stu_no;
    var stu_pp = e.detail.value.stu_pp;
    var stu_xue = e.detail.value.stu_xue;
    //根据name取input的value
    wx.setStorage({
      key:"stu_name",
      data: stu_name
    })
    wx.setStorage({
      key:"stu_no",
      data: stu_no
    })
    wx.setStorage({
      key:"stu_pp",
      data: stu_pp
    })
    wx.setStorage({
      key:"stu_xue",
      data: stu_xue
    })
  },

  changeAvatar:function(){
    let tmp_pic = ''
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        console.log("chooseImage 成功")
        tmp_pic = res.tempFilePaths
        console.log("tmp_pic:"+tmp_pic[0])
        wx.saveFile({
          tempFilePath: tmp_pic[0],
          success (res) {
            console.log("saveFile YES")
            // this.savedFilePath = res.savedFilePath
            console.log(res.savedFilePath)
            wx.setStorage({
              key:"head_pic",
              data: res.savedFilePath
            })
          },
          fail(error){
            console.log("saveFile NO")
          }
        })
      },
      fail(){
        console.log("NO")
      }
    })
    let savedFilePath = wx.getStorageSync('head_pic')
    this.setData({
      savedFilePath: savedFilePath
    });
  }
})