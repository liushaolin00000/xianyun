<template>
  <div class="all">
    <!-- 左边地图模块 -->
    <div class="map">
      <h4 style="margin-bottom:20px">高德地图路径导航：</h4>
      <el-input placeholder="出发地点" v-model="start" style="width:200px;margin-bottom:20px"></el-input>
      <el-input placeholder="到达地点" v-model="end" style="width:200px;margin-bottom:20px"></el-input>
      <el-button @click="handleClick" style="background-color:skyblue;color:#fff">搜索</el-button>
      <!-- 地图的容器 -->
      <div id="container"></div>
      <!-- 路径导航面板容器 -->
      <div id="panel"></div>
    </div>
    <!-- 右边路线模块 -->
    <!-- <div class="line">
      <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
        <li v-for="(item,index) in count" class="infinite-list-item" :key="index">{{item}}</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //出发城市
      start: "",
      //到达城市
      end: "",  
    };
  },
  methods: {
    //封装一个路径导航的方法
    map() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923] //中心点坐标
      });

      //添加地图的矢量标记方法
      var marker1 = new AMap.Marker({
        position: [116.397428, 39.90923], //位置
        content: "<div>中心</div>" // 自定义点标记覆盖物内容
      });
      var marker2 = new AMap.Marker({
        position: [116.55237234, 39.90234] //位置
      });
      var marker3 = new AMap.Marker({
        position: [116.6123123, 39.9124] //位置
      });
      var marker4 = new AMap.Marker({
        position: [116.51236, 39.900923] //位置
      });
      var markerlist = [marker1, marker2, marker3, marker4];
      map.add(markerlist); //添加到地图

      //异步加载插件
      AMap.plugin(["AMap.ToolBar", "AMap.Driving"], () => {
        //调用地图工具条插件
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
        //调用路线规划插件，使用关键字获取驾车规划数据
        if (this.start && this.end) {
          var driving = new AMap.Driving({
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME,
            // map 指定将路线规划方案绘制到对应的AMap.Map对象上
            map: map,
            // panel 指定将结构化的路线详情数据显示的对应的DOM上，传入值需是DOM的ID
            panel: "panel"
          });
        }

        var points = [
          { keyword: this.start, city: "北京" },
          { keyword: this.end, city: "北京" }
        ];

        // driving.search(points, function(status, result) {
        //   // 未出错时，result即是对应的路线规划方案
        //   // 搜索完成后，将自动绘制路线到地图上

        // });
        driving.search(points);
      });
    },
    //点击搜索按钮搜索路径
    handleClick() {
      this.map();
    },
  },
  mounted() {
    //高德地图异步加载 js API
    //真个页面加载完毕之后加载
    window.onLoad = () => {
      this.map();
    };
    //地图的链接
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=373cba4fc9e5f3e73bec82045fa47295&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang='less' scoped>
.all {
  .map {
    #container {
      width: 651px;
      height: 360px;
    }
    #panel {
      position: fixed;
      background-color: white;
      max-height: 200px;
      overflow-y: auto;
      top: 10px;
      left: 10px;
      width: 280px;
    }
    #panel .amap-call {
      background-color: #009cf9;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    #panel .amap-lib-driving {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>