<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          //需要查询，在表单验证规则里面查询即可
          //require为必填项，message 提示的错误信息  trigger 当数去焦点的时候触发
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //在表单里面提供了一个方法验证表单是否通过
      this.$refs.form.validate(vaild => {
        //如果表单验证通过就请求后台的登录接口
        if (vaild) {
          this.$axios({
            url: "accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
            //如果登录成功则提示用户
            if(res.status==200){
               this.$message.success('登录成功')
               //提取data里面的数据
               const {data} = res
               //将数据存放到vuex里面  vuex不能直接赋值来修改
              //  this.$store.user.username = data.user.nickname
            //  通过调用mutation下的方法修改掉state的值，使用commit调用mutation
              this.$store.commit('user/setUserInfo',data)
               console.log(this.$store.state.user.userInfo)
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
