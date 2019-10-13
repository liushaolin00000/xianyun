<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  //确认密码的验证方法
  //rule 当前的规则，一般用不上这个
  //value 输入框的值
  //callback回调函数。必须要调用
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        //new Error 浏览器原生的js写法
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        //表面验证通过
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "", //验证码
        password: "",
        checkPassword: "" //确认密码
      },
      // 表单规则
      rules: {
        //用户名验证
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        //昵称验证
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        //验证码验证
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        //密码验证
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        //确认密码验证
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    async handleSendCaptcha() {
      if (this.form.username) {
        const res = await this.$axios({
          url: "/captchas",
          method: "POST",
          data: {
            tel: this.form.username
          }
        });
          this.$message.success('当前手机验证码是:'+res.data.code)
      }else{
        this.$message.error('手机号码不能为空')
      }
    },

    // 注册
    handleRegSubmit() {
      //当表单规则验证通过的时候点击注册按钮向后台发起注册请求
      this.$refs.form.validate(async valid => {
        if (valid) {
            //将from表单数据中的确认密码内容删除掉
            const {checkPassword, ...props} = this.form
          const res = await this.$axios({
              url:'/accounts/register',
              method:'POST',
              data:props
          });
          if(res.status==200){
              this.$message.success('注册成功')
              //跳转到首页
              this.$router.push('/')
               //提取data里面的数据
               const {data} = res
               //将数据存放到vuex里面  vuex不能直接赋值来修改
              //  this.$store.user.username = data.user.nickname
            //  通过调用mutation下的方法修改掉state的值，使用commit调用mutation
              this.$store.commit('user/setUserInfo',data)
            //    console.log(this.$store.state.user.userInfo)
          }
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