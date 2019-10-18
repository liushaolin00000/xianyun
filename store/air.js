export const state =()=>{
    return{
       //历史搜索记录的数据
       history:[]
    }
}
//同步的方法
export const mutations = {
     //设置history的值,data是搜索表单的对象
     setHistory(state,data){
          state.history.unshift(data)
     }
}

//异步的方法
export const actions = {

}