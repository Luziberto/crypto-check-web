<template>
  <label
    for="darkmode-toggle"
    class="inline-block w-16 cursor-pointer"
  >
    <input
      id="darkmode-toggle"
      ref="toggle"
      name="darkmode-toggle"
      type="checkbox"
      class="opacity-0 h-0 w-0"
      @change="saveToggle(($event.currentTarget as HTMLInputElement).checked)"
    >

    <div class="relative slider bg-gray-300 rounded-full p-1 py-1.5">
      <div class="absolute bg-white duration-500 rounded-full p-3 top-1" />
      <NightSvg
        class="ml-auto"
        :width="20"
      />
    </div>
  </label>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import NightSvg from "@/components/common/Icons/NightSvg.vue"

const toggle = ref<HTMLInputElement | null>()

const loadToggle = () => {
  const value = localStorage.getItem("darMode")
  if (toggle.value) toggle.value.checked = Boolean(value)
}

const saveToggle = (value: boolean | null) => {
  localStorage.setItem("darMode", value ? value.toString() : "")
}

onMounted(() => {
  loadToggle()
})
</script>

<style scoped>
input:checked + .slider {
  background-color: #eab308;
}

input:checked + .slider > div {
  -webkit-transform: translateX(2rem);
  -ms-transform: translateX(2rem);
  transform: translateX(2rem);
  background-color: black;
}
</style>
