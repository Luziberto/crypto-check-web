<template>
  <div v-if="!hide" role="alert">
    <div
      class="{{!type ? 'bg-red-500' : 'bg-green-500'}} text-white font-bold rounded-t px-4 py-2"
    >
      Request Error
    </div>
    <div
      class="border border-t-0 px-4 py-3 rounded-b {{!type ? 'border-red-400 bg-red-100 text-red-700' : 'border-green-400 bg-green-100 text-green-700'}}"
    >
      <ul>
        <li v-for="(message, index) in messages" :key="`error-${index}`">
          <p>{{ message }}</p>
        </li>
      </ul>
    </div>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg
        class="fill-current h-6 w-6 {{!type ? 'text-red-500' : 'text-green-500'}}"
        role="button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <title>Close</title>
        <path
          d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
        />
      </svg>
    </span>
  </div>
</template>

  <script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AlertPopup',
  data() {
    return {
      date: new Date() as Date,
      hide: true as boolean,
      messages: [] as Array<string>,
      type: 1 as number,
      types: {
        ERROR: 0,
        SUCCESS: 1,
      } as any,
    }
  },
  methods: {
    show(messages: Array<string>, type?: string) {
      this.messages = messages
      const alertType = type
        ? this.types[type as keyof any]
        : this.types['SUCCESS' as keyof any]
      this.type = Number(alertType)
      this.hide = false
    },
  },
})
</script>
