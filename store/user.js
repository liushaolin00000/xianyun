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

}
