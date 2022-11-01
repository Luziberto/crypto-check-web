<template>
  <div id="nav" class="flex items-center justify-center bg-gray-300">
    <div class="flex flex-items-center">
      <Coin :width="32" />
      <h1 class="flex-1 font-bold text-xl py-5">Coin List</h1>
      <!-- <div class="mt-auto mr-2 text-left">

      </div> -->
    </div>

  </div>
  <router-view />
</template>

<script lang="ts" setup>
import Coin from '@/assets/svg/CoinSvg.vue';

// export default defineComponent({
//   name: 'App'
// });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
