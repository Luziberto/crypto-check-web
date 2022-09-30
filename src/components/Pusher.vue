<template>
  <h1>Pusher Test</h1>
  <p>
    Publish an event to channel <code>my-channel</code>
    with event name <code>my-event</code>; it will appear below:
  </p>
  <ul>
    <li :v-for="message in messages">
      {{message}}
    </li>
  </ul>
</template>

<script>
  import Pusher from 'pusher-js';

  export default ({
    data: () => ({
        messages: [],
        pusher: new Pusher('4faba6e93517192599a4', {
          cluster: 'sa1'
        }),
        channel: null
    }),
    mounted() {
      this.channel = this.pusher.subscribe('asset')

      this.channel.bind('my-event', function(data) {
        this.messages.push(JSON.stringify(data));
      })
    },
    watch: {
      messages (val, oldVal) {
        console.log(val, oldVal)
      }
    }
  })
  
</script>
