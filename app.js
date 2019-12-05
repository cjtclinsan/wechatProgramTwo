const TOKEN = 'token'

App({
  globalData: {
    token: ''
  },

  onLaunch: function(){
    const token = wx.getStorageSync(TOKEN);
    //判断是否有值
    if( token && token.length !== 0 ){
      //验证是否过期
      this.check_token(token);
    }else{
      //重新登录
      console.log('登录')
      this.login();
    }
  },
  check_token(token){
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method: 'post',
      header: {
        token
      },
      success: (res) => {
        if( !res.data.errorCode ){
          this.globalData.token = token;
        }else{
          console.log("token无效！")
          this.login();
        }
        console.log(res);
      },
      fail: (err)=>{
        console.log(err);
      }
    })
  },

  //登录操作
  login(){
    wx.login({
      success: (res) => {
        //1.获取code
        const code = res.code;
        console.log(code);
        //2.将code发送给服务器
        
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          //url: 'http://localhost:18090/ruidaTeacher/teacher/login',
          data:{
            code: code
          },
          method: 'post',
          success: (res) => {
            const token = res.data.token;

            //保存到全局变量中
            this.globalData.token = token;
            
            // this.setData({
            //   globalData: token
            // })
            //本地存储(同步，异步)
            wx.setStorageSync(TOKEN, token);
          },
          fail: function(err){
            console.log(err);
          }
        })
      }
    })
  }
})