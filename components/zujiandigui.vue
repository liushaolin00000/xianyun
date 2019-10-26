<template>
     <div>
          <div v-for="(item,index) in data" :key='index'>
              {{item.name}}
               <zidiaoyong :data='item.children' v-if="item.children"></zidiaoyong>
          </div>
     </div>
</template>

<script>
export default {
    name:'zidiaoyong',
    props:['data']
}
</script>

<style>

</style>