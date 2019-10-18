<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{flightsData.info.departCity}} - {{flightsData.info.destCity}}
        /
        {{flightsData.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightsData.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightsData.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            :label="item.name"
            :value="item.size"
            v-for="(item,index) in sizeOptions"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //航班的全部数据
    flightsData: {
      //声明接收的数据类型
      type: Object,
      //默认数据为空的时候接收的为空对象
      default: {}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      //自己创建机型大小的数据
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  methods: {
    // 选择触发机场时候触发
    handleAirport(value) {
      const arr = this.flightsData.flights.filter(
        v => v.org_airport_name == value
      );
      this.$emit("setDataList", arr);
      //   console.log(arr);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      const arr = value.split(",");
      const arr1 = this.flightsData.flights.filter(v => {
        //出发时间小时
        const start = +v.dep_time.split(":")[0];
        return start >= arr[0] && start < arr[1];
      });
      this.$emit("setDataList", arr1);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      const arr = this.flightsData.flights.filter(v => v.airline_name == value);
      this.$emit("setDataList", arr);
      //   console.log(arr);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      const arr = this.flightsData.flights.filter(v => v.plane_size == value);
      this.$emit("setDataList", arr);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
         this.airport=""; // 机场
      this.flightTimes= ""; // 出发时间
      this.company="";// 航空公司
      this.airSize= ""; // 机型大小
      //传递一个没有修改过的航班数据
      this.$emit("setDataList", this.flightsData.flights);
    } 
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>