<template>
  <div class="container">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mianbaoxie">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预定</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索查看酒店价格 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-autocomplete
            class="inline-input"
            v-model="city"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="grid-content bg-purple">
          <el-date-picker
            value="南京"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-select v-model="value" clearable placeholder="请选择入住的人数">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content bg-purple">
          <el-button type="primary">主要按钮</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 区域，攻略，均价，高德地图模块 -->
    <div :gutter="20" class="info">
      <!-- 区域、攻略、均价部分 -->
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <!-- 区域模块 -->
          <el-row :gutter="0" style="margin:20px 0">
            <el-col :span="3">
              <div class="grid-content bg-purple">区域：</div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple luxian">
                <span class="luxian-all">全部</span>
                <span
                  style="margin-left:1em"
                  v-for="(item,index) in scenics"
                  :key="index"
                  class="luxian-single"
                >{{item.name}}</span>
                <p>
                  <i class="iconfont icon-xiangshangzhanhang" style="color:#f90"></i>
                  <i class="iconfont icon-xiangxiazhanhang" style="color:#f90"></i>
                  等43个区域
                </p>
              </div>
            </el-col>
          </el-row>

          <!-- 攻略模块 -->
          <el-row :gutter="0" style="margin:20px 0">
            <el-col :span="3">
              <div class="grid-content bg-purple">攻略：</div>
            </el-col>
            <el-col :span="19">
              <div
                class="grid-content bg-purple gonglue"
              >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
            </el-col>
          </el-row>
          <!-- 均价模块 -->
          <div class="averagePrice">
            <span>
              均价
              <i class="iconfont icon-wenhao wenhao" title="等级均价有平日价格计算得出，节假日价格会有上浮"></i> :
              <span class="one" title="等级均价有平日价格计算得出，节假日价格会有上浮">
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                ¥332
              </span>
              <span class="two" title="等级均价有平日价格计算得出，节假日价格会有上浮">
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                ¥521
              </span>
              <span class="three" title="等级均价有平日价格计算得出，节假日价格会有上浮">
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                <i class="iconfont icon-huangguan"></i>
                ¥768
              </span>
            </span>
          </div>
        </div>
      </el-col>
      <!-- 高德地图模块 -->
      <el-col :span="10">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </div>

    <!--过滤列表 根据价格，住宿等级，住宿类型等条件筛选酒店 -->
    <div class="filters-list el-row el-row--flex">
      <div class="block el-col el-col-8" style="border-right:1px solid #ccc">
        <span class="demonstration">价格</span>
        <el-slider v-model="value1" show-input :max='4000'></el-slider>
      </div>
      <div class="dengji el-col el-col-6">
        <div class="deng">住宿等级</div>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:200px">
            <el-checkbox-group v-model="checkList" class="checkList">
              <ul>
                <li>
                  <el-checkbox label="1 星"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="2 星"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="3 星"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="4 星"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="5 星"></el-checkbox>
                </li>
              </ul>
            </el-checkbox-group>

            <!-- <el-dropdown-item>
              <el-checkbox v-model="checked">舒适型</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-checkbox v-model="checked">高档型</el-checkbox>
            </el-dropdown-item>
            <el-dropdown-item disabled>
              <el-checkbox v-model="checked">豪华型</el-checkbox>
            </el-dropdown-item>
             <el-dropdown-item disabled>
              <el-checkbox v-model="checked">度假型</el-checkbox>
            </el-dropdown-item>
             <el-dropdown-item disabled>
              <el-checkbox v-model="checked">公寓式酒店</el-checkbox>
            </el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="dengji el-col el-col-6">
        <div class="deng">宿舍类型</div>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:200px">
            <el-checkbox-group v-model="checkList" class="checkList">
              <ul>
                <li>
                  <el-checkbox label="经济型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="舒适型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="高档型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="豪华型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="度假型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="公寓式酒店"></el-checkbox>
                </li>
              </ul>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="dengji el-col el-col-6" style="border:none">
        <div class="deng">酒店品牌</div>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link">
            不限
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:200px">
            <el-checkbox-group v-model="checkList" class="checkList">
              <ul>
                <li>
                  <el-checkbox label="经济型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="舒适型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="高档型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="豪华型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="度假型"></el-checkbox>
                </li>
                <li>
                  <el-checkbox label="公寓式酒店"></el-checkbox>
                </li>
              </ul>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 酒店列表内容 -->
    <!-- 点击酒店列表相对应的酒店跳转到相对应的酒店详情页面 -->

    <div class="hotelContent" v-for="(item,index) in cityHotel" :key="index">
      <!-- 酒店图片展示 -->
      <nuxt-link :to="`/hotel/detail?id=${item.id}`" class="el-row el-row--flex">
        <div class="img el-col el-col-8">
          <img :src="item.photos" alt />
        </div>
        <!-- 酒店信息介绍展示 -->
        <div class="info el-col el-col-10">
          <!-- 酒店名 -->
          <div class="name">{{item.name}}</div>
          <div class="leixing">
            {{item.alias}}
            <i class="iconfont icon-huangguan"></i>
            <i class="iconfont icon-huangguan"></i>
            <i class="iconfont icon-huangguan" style="margin-right:10px"></i>经济型
          </div>
          <!-- 酒店的评分 -->
          <div class="grade el-low el-row--flex">
            <div class="el-col el-col-10 one">
              <el-rate
                v-model="item.stars"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <!-- <span>{{item.stars}}分</span> -->
            </div>
            <div class="el-col el-col-7 two">
              <span>{{item.roomCount}}</span>条评论
            </div>
            <div style="margin-left:10px " class="el-col el-col-7 three">
              <span>55</span>篇游记
            </div>
          </div>
          <!-- 酒店的位置 -->
          <div class="location">
            <i class="iconfont icon-biaoji"></i>
            位于，{{item.address}}
          </div>
        </div>
        <!-- 酒店平台连接推荐 -->
        <div class="connet el-col el-col-6">
          <a href="https://hotels.ctrip.com/hotel/694679.html">
            <div class="lianjie" v-for="(data,index) in item.products" :key="index">
              <span>{{data.name}}</span>
              <span style="float:right">
                <i style="color:#ff9900;font-size:19px">¥{{data.price}}</i>起
                <i class="iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-"></i>
              </span>
            </div>
          </a>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      score: 3.5,
      //目的地输入框的值
      city: "南京",
      //日期选择组件件的值
      value1: 4000,
      //选择人数的值
      value: "",
      //选择人数的下拉框数据
      options: [
        { value: "选择1", label: "1人" },
        { value: "选择2", label: "2人" },
        { value: "选择3", label: "3人" },
        { value: "选择4", label: "4人" },
        { value: "选择5", label: "5人" }
      ],
      //攻略中的区域中的线路数组数据
      scenics: [],
      //城市id
      id: Number,
      //对应城市的酒店
      cityHotel: [],

      //多选框组件给的值
      checkList: ["选中且禁用", "复选框 A"],
      // 筛选酒店滑块价格的最大值
      max:Number,
    };
  },
  methods: {
    //  输入框的值发生变化的时候触发
    //value时输入框的值
    // cb是回调函数，必须要调用，调用的是传递的数组的参数，数组中的元素必须是一个对象
    querySearch(value, cb) {
      //   console.log(value)
      //当输入框的值为空的时候不请求数据
      if (!value) return;
      //   var arr = [
      //       {value:'广州'},
      //       {value:'广元'},
      //   ]
      //请求搜索建议的城市
      this.$axios({
        url: "/cities?name=" + value
      }).then(res => {
        console.log(res);
        //攻略中的区域中的线路数组数据
        const { scenics } = res.data.data[0];
        this.scenics = scenics;
        //data是后台返回的城市的数组，没有value的属性
        const { data } = res.data;
        //循环给每一项添加value的属性
        const newData = data.map(v => {
          v.value = v.name;
          return v;
        });
        cb(newData);
      });
    },
    //选择下拉列表的内容的时候触发
    handleSelect(item) {}
  },
  mounted() {
    //   页面加载完后默认显示搜索的城市是南京市
    this.$axios({
      url: "/cities?name=南京市"
    }).then(res => {
      // console.log(res);
      //攻略中的区域中的线路数组数据
      const { scenics } = res.data.data[0];
      this.scenics = scenics;
      //解构城市的id
      const { id } = res.data.data[0];
      this.id = id;
      //请求酒店详情数据
      this.$axios({
        url: "/hotels?city=" + id
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        this.cityHotel = data;
        console.log(this.cityHotel);
      });
    });
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .mianbaoxie {
    padding: 20px 0;
    overflow: hidden;
  }
  .info {
    margin-bottom: 50px;
    overflow: hidden;
    .luxian {
      cursor: pointer;
      color: #666;
      font-size: 14px;
      .luxian-all {
        background-color: #eee;
      }
      .luxian-single:hover {
        color: #0099ff;
        border-bottom: 1px solid #0099ff;
      }
    }
    .gonglue {
      color: #666;
      font-size: 14px;
    }
    .averagePrice {
      .wenhao {
        background-color: #cccccc;
      }
      .one,
      .two,
      .three {
        margin-left: 25px;
        i {
          color: #ff9900;
        }
      }
    }
    .grade {
      .one {
        span {
          margin-left: 10px;
          color: #ff9900;
        }
      }
      .two,
      .three {
        span {
          margin-right: 10px;
          color: #ff9900;
        }
      }
    }
  }
  //酒店的住宿等级，住宿条件等多级筛选
  .filters-list {
    height: 80px;
    border: 1px solid #dddddd;
    padding: 5px 20px;
    .dengji {
      padding: 5px 20px;
      border-right: 1px solid #dddddd;
      color: #666;
      .deng {
        margin-bottom: 10px;
      }
    }
  }
  //酒店列表内容
  .hotelContent {
    padding: 25px 0;
    border-bottom: 1px solid #eee;
    img {
      width: 320px;
      height: 210px;
    }
    .info {
      padding: 0 10px;
      .name {
        font-weight: 400;
        font-size: 28px;
      }
      .leixing {
        color: #999;
        font-size: 16px;
        margin-bottom: 1.5em;
        i {
          color: #ff9900;
        }
      }
      .location {
        color: #666;
        font-size: 16px;
        margin-top: 1.5em;
        i {
          margin-right: 6px;
        }
      }
    }
    .lianjie {
      padding: 16px 10px;
      border-bottom: 1px solid #ebeef5;
    }
    .lianjie:hover {
      background-color: #f5f7fa;
      cursor: pointer;
    }
  }
}
/deep/ .el-checkbox__inner {
  border-radius: 50%;
}
/deep/ .el-checkbox {
  padding: 20px 0;
}
/deep/ .el-checkbox:hover {
  color: #66b1ff;
}
/deep/ .el-dropdown {
  width: 100%;
}
/deep/ .el-icon-arrow-down {
  float: right;
  margin-top: 4px;
}
/deep/ .el-dropdown-link {
  display: inline-block;
  width: 100%;
}
</style>