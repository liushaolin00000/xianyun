//导入提示插件
import { Message } from 'element-ui';

//固定写法，暴露出state
export const state = () => {
  return {
    userInfo: {}
  }
}
//存放的是同步修改state的方法
export const mutations = {
  //mutation下的值必须是一个函数，函数中有两个参数，第一个为固定的state，第二个为用户调用方法的时候传进来的值
  //非常类似于$emit
  setUserInfo(state, data) {
    state.userInfo = data
  }
}
//存放的是异步修改state的方法
export const actions = {
  //封装了登录请求的方法
  async login(store, data) {
    var res = await this.$axios({
      url: "accounts/login",
      method: "POST",
      data: data
    })
    if (res.status === 200) {
      store.commit("setUserInfo", res.data);
    }
    return res
  },
  //封装了发送验证码请求的方法
  async Captcha(store, data) {
    if (data) {
      const res = await this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: data
        }
      });
      Message.success('当前手机验证码是:' + res.data.code)
    } else {
      Message.error('手机号码不能为空')
    }
  }

}
