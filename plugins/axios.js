import {Message} from "element-ui";
//nuxt插件的固定写法
//context包含nuxt下所有的方法，固定有的参数
export default (context)=>{
    context.$axios.onError(err => {
        const {statusCode, message} = err.response.data;
        
        // 还未使用
        // if(statusCode === 401 || statusCode === 403){
        //     Message.warning({message: "请先登录"});
        //     redirect("/user/login");
        // }

        if(statusCode === 400){
            Message.warning({message});
        }
        if(statusCode === 403||statusCode===401){
            //路由重定向的方法,发现403表示没有权限访问则跳转到登录页面
            Message.warning({message})
           context.redirect('/user/login')
        }
    })
}