
<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
        style="cursor:pointer"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法  类似于inputd的方法，每次输入框发生变化的时候触发-->
        <!-- select 选中下拉列表的时候触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          @blur="departCityBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="form.destCity"
          @blur="destCityBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
//引入事件转换插件
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      //最终表单要提交的属性
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", //到大城市代码
        departDate: "" //日期字符串
      },
      //数组newData
      newData: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index == 1) {
        this.$confirm("目前暂不支持往返,请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是输入框的值，cb是回调函数，调用时必须要传递数组的参数数组，数组中的元素必须是一个或多个对象
    async queryDepartSearch(value, cb) {
      //因为输入框为空的时候请求的数据会很大，导致一直显示加载状态，缩所以当输入框值为空时不请求数据
      if (!value) {
        cb([]);
        return;
      }

      //请求搜索机票城市
      const res = await this.$axios({
        url: "/airs/city?name=" + value
      });
      if (res.status == 200) {
        //data是后台返回的城市数组，没有value属性
        const { data } = res.data;
        //所以要对数组加上value属性
        const newData = data.map(v => {
          //需要把市字去掉
          v.value = v.name.replace("市", "");
          return v;
        });
        //将newData保存起来
        this.newData = newData;
        //下来列表展示搜索数据
        cb(newData);
      }
    },
    //出发城市失去焦点的时候触发
    departCityBlur() {
      //为了防止用户输入后不选择，默认选中第一个
      if (this.newData.length > 0) {
        this.form.departCity = this.newData[0].value;
        this.form.departCode = this.newData[0].sort;
      }
    },
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch(value, cb) {
      //因为输入框为空的时候请求的数据会很大，导致一直显示加载状态，缩所以当输入框值为空时不请求数据
      if (!value) {
        cb([]);
        return;
      }

      //请求搜索机票城市
      const res = await this.$axios({
        url: "/airs/city?name=" + value
      });
      if (res.status == 200) {
        //data是后台返回的城市数组，没有value属性
        const { data } = res.data;
        //所以要对数组加上value属性
        const newData = data.map(v => {
          //需要把市字去掉
          v.value = v.name.replace("市", "");
          return v;

        });
        //将newData保存起来
        this.newData = newData;
        //下来列表展示搜索数据
        cb(newData);
      }
    },
    //到达城市失去焦点的时候触发
    destCityBlur() {
      //为了防止用户输入后不选择，默认选中第一个
      if (this.newData.length > 0) {
        this.form.destCity = this.newData[0].value;
        this.form.destCode = this.newData[0].sort;
      }
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      //获取出发城市名
      this.form.departCity = item.name;
      //获取触发城市的departCode
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      //获取出发城市名
      this.form.destCity = item.name;
      //获取触发城市的departCode
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 出发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCode, destCity } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      this.form.departCity = this.form.departCity.replace('市','')
       this.form.destCity = this.form.destCity.replace('市','')
      if (!this.form.departCity) {
        this.$message.error("请填写出发地");
        return;
      }
      if (!this.form.departCode) {
        this.$message.error("请填写正确的出发地");
        return;
      }
      if (!this.form.destCity) {
        this.$message.error("请填写目的地");
        return;
      }
      if (!this.form.destCode) {
        this.$message.error("请填写正确的出发地");
        return;
      }
      if (!this.form.departDate) {
        this.$message.error("请填写出发日期");
        return;
      }

      this.$router.push({
          path:'/air/flights',
          query:this.form
      })
      //保存到vuex、
      this.$store.commit('air/setHistory',this.form)
      // console.log()
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
