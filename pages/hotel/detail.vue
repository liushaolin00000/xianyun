<template>
  <div class="container">
    <!-- 酒店详情页的面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/hotel'}">南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{detail.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 介绍酒店的名字和酒店的地址 -->
    <div class="name">
      <em class="titel">{{detail.name}}</em>
      <span class="iconfont icon-huangguan"></span>
      <span class="iconfont icon-huangguan"></span>
      <span class="iconfont icon-huangguan"></span>
      <span class="iconfont icon-huangguan"></span>
      <span class="iconfont icon-huangguan"></span>
      <span class="iconfont icon-huangguan"></span>
      <div>{{detail.alias}}</div>
      <div>
        <i class="iconfont icon-biaoji"></i>
        {{detail.address}}
      </div>
    </div>
    <!-- 展示酒店环境的图片 -->
    <div class="img">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <img :src="current" style="width:640px;height:360px;cursor:pointer" />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-row :gutter="40">
              <el-col :span="12" v-for="(item,index) in image" :key="index">
                <img
                  :src="item"
                  style="width:160px;height:110px;margin-bottom:10px;cursor:pointer"
                  @click="handleClick(index)"
                />
                <!-- <img src="../../static/1.jpg" alt=""> -->
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 低价来源，低价房型组成的表格 -->
    <!-- <el-table :data="detail.products" style="width: 100%">
      <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
      <el-table-column prop="price" label="最低价格/每晚"></el-table-column>
    </el-table>-->
    <table>
      <thead>
        <tr>
          <td>价格来源</td>
          <td>低价房型</td>
          <td>最低价格/每晚</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in detail.products" :key="index" @click="handlereplace">
          <td>{{item.name}}</td>
          <td>{{item.bestType}}</td>
          <td class="last">
            ¥ {{item.price}} 起
            <i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></i>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 地图组件 -->
    <maps style="margin-top:30px"></maps>
    <!-- 基本信息，主要设施，停车服务，品牌信息模块 -->
    <div class="infomessage">
      <el-row type="flex" style="height:100px;" class="hang">
        <el-col :span="4" style="padding:20px,10px">基本信息</el-col>
        <el-col :span="20" style="padding:20px,10px" class="right">
          <span>入住时间：14:00之后</span>
          <span>离开时间：12:00之后</span>
          <span>2010年开业/2015年装修</span>
          <span>酒店规模：148间客房</span>
        </el-col>
      </el-row>
      <el-row type="flex" style="height:100px;" class="hang two">
        <el-col :span="4" style="padding:20px,10px">主要设施</el-col>
        <el-col :span="20" style="padding:20px,10px;color:skyblue" class="right">
          <em>外币兑换服务</em>
          <em>电梯</em>
          <em>洗衣服务</em>
          <em>热水壶</em>
        </el-col>
      </el-row>
      <el-row type="flex" style="height:100px;" class="hang">
        <el-col :span="4" style="padding:20px,10px">停车服务</el-col>
        <el-col :span="20" style="padding:20px,10px" class="right">-</el-col>
      </el-row>
      <el-row type="flex" style="height:100px;" class="hang">
        <el-col :span="4" style="padding:20px,10px">品牌信息</el-col>
        <el-col :span="20" style="padding:20px,10px" class="right">-</el-col>
      </el-row>
    </div>
    <!-- 根据用户评论制作的评分 -->
    <div class="score">
      <h5 class="title">0条真实用户评论</h5>
      <el-row type="flex" align="middle" style="margin-bottom:30px">
        <el-col :span="4">
          <ul style="padding:0">
            <li>总评数: 9</li>
            <li>号评数: 1</li>
            <li>差评数: 2</li>
          </ul>
        </el-col>
        <el-col :span="5">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </el-col>
        <el-col :span="3" style="color:rgb(255, 153, 0);font-size:20px">环境</el-col>
        <el-col :span="3" style="color:rgb(255, 153, 0);font-size:20px">产品</el-col>
        <el-col :span="3" style="color:rgb(255, 153, 0);font-size:20px">服务</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
//引入地图组件
import maps from "@/components/hotel/map.vue";
export default {
  components: {
    maps
  },
  data() {
    return {
      tableData: [],
      //酒店详情数据
      detail: {},
      //评分分数
      value: 3.5,
      //酒店大图片数据
      current: "/_nuxt/static/1.jpg",
      //酒店图片展示数据
      image: [
        "/_nuxt/static/8.jpg",
        "/_nuxt/static/1.jpg",
        "/_nuxt/static/8.jpg",
        "/_nuxt/static/1.jpg",
        "/_nuxt/static/8.jpg",
        "/_nuxt/static/1.jpg"
      ]
    };
  },
  mounted() {
    //页面加载完成后即请求后台的酒店详情
    this.$axios({
      url: "/hotels",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      console.log(res);
      const data = res.data.data[0];
      console.log(data);

      this.detail = data;
      //    console.log(this.detail.pics[0].url)
    });
  },
  methods: {
    //点击小图片的时候触发
    handleClick(index) {
      this.current = this.image[index];
    },
    //点击跳转到其他网站
    handlereplace() {
      window.location.href = "https://hotels.ctrip.com/hotel/694679.html";
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  margin: 0 auto;
  width: 1000px;
  padding-top: 20px;
  //酒店的名字
  .name {
    margin-top: 20px;
    span {
      color: #ff9900;
    }
    .titel {
      font-size: 30px;
      color: #333;
    }
    div {
      color: #666;
    }
  }
  //展示酒店环境的图片
  .img {
    margin-top: 40px;
  }
  //价格来源，酒店房型，酒店价格
  table {
    width: 100%;
    text-align: center;
    margin-top: 40px;
    font-style: 14px;
    color: #909399;

    thead {
      height: 50px;
      line-height: 50px;
      td {
        border-bottom: 1px solid #ebeef5;
      }
    }
    tbody {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #ebeef5;
      color: #606266;
      tr:hover {
        background-color: #f5f7fa;
      }
      .last {
        color: #ff9900;
      }
    }
  }
  //    <!-- 基本信息，主要设施，停车服务，品牌信息模块 -->
  .infomessage {
    .hang {
      border-bottom: 1px solid #eeeeee;
      line-height: 100px;
    }
    .two {
      em {
        height: 20px;
      }
    }
    margin: 40px 0;
    .right {
      color: #666;
      span {
        display: inline-block;
        width: 24%;
      }
    }
  }
  // 根据用户评论制作的评分
  .score {
    h5 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 30px;
    }
    ul {
      color: #666;
      font-size: 22px;
    }
  }
}
/deep/ .is-scrolling-none {
  cursor: pointer;
}
</style>