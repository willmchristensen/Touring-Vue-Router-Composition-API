<script setup>
import { useRouter } from 'vue-router';
const props = defineProps(['event']);
const router = useRouter();
const register = () => {
  // router links call this method from inside their definition
  router.push({
    name: 'EventDetails',
    // dont specify, added by default
    // id: props.event.id
  })
}
</script>

<template>
  <p>register here</p>
  <button @click="register">Register Me!</button>
</template>
