<template>
  <div>
    <Pusher/>
  </div>
</template>

<script lang="ts">
import Pusher from "../components/Pusher.vue";
export default {
    name: "Home",
    components: { Pusher }
};
</script>

<style scoped>
.main-container {
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>