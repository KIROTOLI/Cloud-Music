<template>
  <div class="home">
    <tabbar class="tabbar"></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar/tabbar.vue'

export default {
  name: 'Home',
  components:{
    tabbar
  }
 
}
</script>
<style>
.tabbar{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: #fff;
 
}
</style>

