<template>
  <div class="home">
    <xiaozhima msg="小姐姐，我是小芝麻，我很可爱的，你喜欢我吗"/>
    <img height="50%" width="50%" alt="小芝麻" src="../assets/xiaozhima20191025112050.jpg">
  </div>
</template>

<script>
// @ is an alias to /src
import xiaozhima from '@/components/xiaozhima.vue'

export default {
  name: 'home',
  components: {
    xiaozhima
  }
}
</script>
