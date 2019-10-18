<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
          <orderForm @getDetail='getDetail' @totalprice ='totalprice'></orderForm>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <orderAside  :data='Detail' :price='totalPrice'></orderAside>
      </div>
    </el-row>
  </div>
</template>

<script>
//引入表单组价
import orderForm from '@/components/air/orderForm.vue'
import orderAside from '@/components/air/orderAside.vue'
export default {
    data(){
      return{
        //机票的详情数据
        Detail:{},
        // //总价格
        totalPrice:0
      }
    },
    components:{
        //注册表单组件
        orderForm,
        //注册机票订单详情侧边栏页面
        orderAside
    },
    methods:{
      //机票详情页
      getDetail(data){
        this.Detail = data
      },
      //总价格
      totalprice(data){
        this.totalPrice = data
      }
    },
    mounted(){
      console.log(this.getDetail)
    }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>