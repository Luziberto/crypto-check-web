<template>
  <div
    id="nav"
    class="flex items-center justify-center bg-gray-300 py-5"
  >
    <div class="flex justify-center flex-items-center">
      <a href="https://matias.ma/nsfw">
        <Coin :width="32" />
      </a>
      <h1 class="flex-1 font-bold text-xl">Coin List</h1>
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
