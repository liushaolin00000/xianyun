<template>
  <div>
     <div>
         <!-- <div v-for='(item,index) in list' :key='index'>{{item.name}}
              <div v-for='(item,index) in item.children' :key='index'>
                   {{item.name}}
              </div>
         </div> -->
         <zujiandigui :data='list'></zujiandigui>
     </div>
  </div>
</template>

<script>
import zujiandigui from '@/components/zujiandigui.vue'
export default {
   components:{zujiandigui},
    data(){
      return{
         list:[{name:'服装',children:[{name:'衬衫'},{name:'裙子'}]},
         {name:'电器',children:[{name:'空调'},{name:'电视'}]},
         {name:'电子产品',children:[{name:'手机'},{name:'笔记本电脑'}]}]
      } 
    }
}
</script>

<style>

</style>