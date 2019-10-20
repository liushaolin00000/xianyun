<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <!-- 用户列表，可以循环该div -->
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in detail.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  
          最高赔付${item.compensation}`"
            border
            @change="handleChange(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <!-- 让计算总价格的代码执行起来 -->
    <input type="hidden" :value="allPrice" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //机票总价格
      // totalPrice:5,
      //机票详情
      detail: {
        seat_infos: {}
      },
      //用户列表
      users: [
        {
          username: "",
          id: ""
        }
      ],
      //保险id的集合
      insurances: [],
      //联系人名字
      contactName: "",
      //联系人电话
      contactPhone: "",
      //验证码
      captcha: "",
      //发票
      invoice: false
    };
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      //给user中添加多一项
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },
    //点击保险框的时候触发
    handleChange(id) {
      //判断如果数组里面有id的时候删除掉那一个id
      const index = this.insurances.indexOf(id);
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(id);
      }
    },
    // 发送手机验证码
    handleSendCaptcha() {
      this.$store.dispatch("user/Captcha", this.contactPhone);
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id,
        captcha: this.captcha
      };
      //向后台提交机票订单，以进行下一步操作
      this.$axios({
        url: "/airorders",
        method: "POST",
        data: data,
        //添加请求头，增加权限问题
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        if (res.status == 200) {
          this.$message.success(res.data.message);
          //订单提交成功后，跳转到付款页面
          this.$router.push({
            path: "/air/pay",
            query: { id: res.data.data.id }
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  computed: {
    //计算总价格
    allPrice() {
      let price = 9;
      let len = this.users.length;
      price += this.detail.seat_infos.org_settle_price * len;
      this.insurances.forEach(v => {
        price += this.detail.insurances[v - 1].price * len;
      });
      price += this.detail.airport_tax_audlet * len;
      this.$emit("totalprice", price);
      return price;
    }
  },
  mounted() {
    // console.log(this.$route.query);
    const { id, seat_xid } = this.$route.query;
    //请求机票详情
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      this.detail = res.data;
      // //页面加载后请求机票详情成功后将机票详情传递到父组件
      this.$emit("getDetail", this.detail);
      // this.$emit('totalprice',this.totalPrice)
      // console.log(this.detail)
    });
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>