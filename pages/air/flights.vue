<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <flightsFilters :flightsData="cacheFlightsData" @setDataList="setDataList"></flightsFilters>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <flightsListHead></flightsListHead>
        </div>

        <!-- 航班信息 -->
        <!-- 如果没有数据返回就将航班信息和分页全部隐藏 -->
        <div v-if="dataList.length">
          <flightsItem
            v-for="(item,index) in dataList"
            :key="index"
            :dataList="item"
            :flightsData="flightsData"
          ></flightsItem>
          <!-- 完整功能的分页组件 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5,10,15,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div v-if="dataList.length==0">很抱歉，你没有您想要的航班,请重新搜索</div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <flightsAside></flightsAside>
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
//引入头部组件
import flightsListHead from "@/components/air/flightsListHead.vue";
//引入机票详情列表页面
import flightsItem from "@/components/air/flightsItem.vue";
//引入机票筛选组件
import flightsFilters from "@/components/air/flightsFilters.vue";
//引入侧边栏组件组件
import flightsAside from "@/components/air/flightsAside.vue";
export default {
  //注册头部组件
  components: {
    //注册机票详情头部组件
    flightsListHead,
    //注册机票详情列表页面
    flightsItem,
    //注册筛选组件
    flightsFilters,
    //注册侧边栏组件
    flightsAside
  },
  data() {
    return {
      //机票总数据
      flightsData: {
        info: {},
        options: {},
        flights: []
      },
      //缓存一份机票的总数据，只会修改一次
      cacheFlightsData: {
        info: {},
        options: {}
      },
      //机票详情数据
      // dataList: [],

      //以下为分页组件的参数
      //当前的页数
      pageIndex: 1,
      //当前一页显示的条数
      pageSize: 5,
      //总的数据条数
      total: 0
    };
  },

  watch: {
    //监听路由的变化 watch可以监听实例下的所有属性
    $route() {
     this.getList()
    }
  },
  mounted() {
    //机票详情组件加载完毕就向后台请求真实的机票详情数据
    this.getList()
  },
  computed: {
    //从flights总列表数据中切割出来的数组列表
    dataList() {
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  methods: {
    //分页条数切换的时候触发 val是当前的条数
    handleSizeChange(val) {
      //切换条数
      this.pageSize = val;
    },
    //页数切换的时候触发，val是当前页的页数
    handleCurrentChange(val) {
      //修改当前的页数
      this.pageIndex = val;
      //修改机票的列表
      // this.dataList = this.flightsData.flights.slice(
      //   (this.pageIndex - 1) * this.pageSize,
      //   this.pageIndex * this.pageSize
      // );
    },
    //接收子组件传递过来的数据
    setDataList(data) {
      //根据过滤条件修改列表
      this.flightsData.flights = data;
      this.total = data.length;
      //每次改变筛选条件之后当前页码为第一页
      this.pageIndex = 1;
    },
    //获取机票的封装函数
    getList() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // console.log(res);
        //机票的总数据，这个数据再筛选时被修改
        this.flightsData = res.data;
        //备份的机票总数据，需要将其存放到另一个堆内存里面,这个数据不会被修改
        this.cacheFlightsData = { ...res.data };
        //总数据
        this.total = this.flightsData.total;
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>