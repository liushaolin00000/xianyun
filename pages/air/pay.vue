<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{totalPrice}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
//导入生成二维码的包
import QRcode from "qrcode";
export default {
  data() {
    return {
      //总价格
      totalPrice: 0,
       //循环的事件
      timer:null
    };
  },
  mounted() {
    const { id } = this.$route.query;
    //页面加载完毕后向后台请求订单的详情数据
    setTimeout(() => {
      this.$axios({
        url: "/airorders/" + id,
        //请求头
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);

        if (res.status == 200) {
          const { code_url } = res.data.payInfo;
          this.totalPrice = res.data.price;
          //生成二维码到canvas
          const stage = document.querySelector("#qrcode-stage");
          QRcode.toCanvas(stage, code_url, { width: 200 });
          //在请求付款也详情成功后再向后台请求订单支付情况,每过3秒钟查询一下是否支付了
         this.timer= setInterval(() => {
            this.$axios({
              url: "/airorders/checkpay",
              method: "POST",
              //请求头
              headers: {
                Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
              },
              data: {
                id: id,
                nonce_str: this.totalPrice,
                out_trade_no: res.data.orderNo
              }
            }).then(res => {
                console.log(res)
              //如果检测到支付完成停止定时器的执行
              if(res.data.statusTxt=='支付完成'){
                  clearInterval(this.timer)
                  this.$message.success('支付完成')
              }
            });
          }, 4000);
        }
      });
    }, 500);
  },
  //生命周期之结束组件的时候删除组件所有的请求
  destroyed(){
    //清除定时器
      clearInterval(this.timer)
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>