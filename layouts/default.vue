<template>
  <div>
    <!-- 页面头部占位组件 -->
    <Header class="content"></Header>
    <!-- 内容站位组件 -->
    <nuxt />
    <!-- 底部组件的占位组件 -->
    <Footer></Footer>
  </div>
</template>
<script>
//导入头部组件
import Header from  '@/components/header.vue' 
//导入底部组件
import Footer from '@/components/footer.vue'
export default {
    components:{
      //注册头部组件
      Header,
      //注册底部组件
      Footer
    }
}
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  margin: 0;
  top: 0;
}

*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
ul,
li,
ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
}
em,
i {
  font-style: normal;
}
</style>
