<template>
  <el-row class="all" type="flex" justify="center" align="middle">
    <!-- 主要内容部分 -->
    <div class="contain">
      <!-- 登录和注册的切换栏 -->
      <el-row class="tab" type="flex">
        <span
          v-for="(item,index) in tab"
          :key="index"
          style="cursor:pointer"
          :class="{highlight:current==index}"
          @click="handleclick(index)"
        >{{item.title}}</span>
      </el-row>
      <div class="input">
        <el-row type="flex">
          <LoginForm v-if="current==0" style="width:100%"></LoginForm>
          <Register v-if="current==1" style="width:100%"></Register>
        </el-row>
      </div>
    </div>
  </el-row>
</template>
   
<script>
//引入登录组件
import LoginForm from "@/components/user/loginForm.vue";
//引入注册组件
import Register from "@/components/user/register.vue";
export default {
  //注册登录组件
  components: {
    LoginForm,
    Register
  },
  data() {
    return {
      //登录注册标题
      tab: [{ title: "登录" }, { title: "注册" }],
      //登录注册栏的current值
      current: 0,
      //表单数据 
      form:{
      }
    };
  },
  methods: {
    //点击触发改变current的值
    handleclick(index) {
      this.current = index;
    }
  }
};
</script>

<style lang='less' scoped>
.all {
  background: url(../../static/8.jpg);
  height: 700px;
  .contain {
    width: 400px;
    background-color: #ffffff;
    .tab {
      span {
        display: block;
        width: 200px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #ffa500;
        background-color: #eeeeee;
      }
      .highlight {
        border-top: 1px solid #ffa500;
        background-color: #ffffff;
      }
    }
    .input{
      padding: 20px;
    }
  }
}
</style>