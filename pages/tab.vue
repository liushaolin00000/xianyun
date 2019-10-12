<template>
  <div class="main">
    <div class="btn">
      <span @click="handleplay(index)" :class="current==index?'gaoliang':'none'" v-for='(item,index) in title' 
      :key='index'
      style="cursor:pointer">{{item.title}}</span>
    </div>
    <div v-if="current==0">
      <p>娱乐1</p>
      <p>娱乐2</p>
      <p>娱乐3</p>
      <p>娱乐4</p>
    </div>
    <div v-if="current==1">
      <p>新闻1</p>
      <p>新闻2</p>
      <p>新闻3</p>
      <p>新闻4</p>
    </div>
    <div v-if="current==2">
      <p>游戏1</p>
      <p>游戏2</p>
      <p>游戏3</p>
      <p>游戏4</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 标题内容
      title:[{title:'娱乐'},{title:'新闻'},{title:'游戏'}],
      current: 0
    };
  },
  methods: {
    handleplay(index) {
      this.current=index
    }
  }
};
</script>

<style lang='less' scoped>
.main {
  .btn {
    .gaoliang{
    background-color: pink;
    }
    span {
      border: 1px solid black;
    }
  }
}
</style>