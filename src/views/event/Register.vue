<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
const props = defineProps(['event']);
const router = useRouter();
// GSTORE OBJECT AVAILABLE:
const GStore = inject('GStore');
const register = () => {
  GStore.flashMessage = "You are registered for " + props.event.title;
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000);
  // router links call this method from inside their definition
  router.push({
    name: 'EventDetails',
    // dont specify, added by default > id: props.event.id
  })
}
</script>

<template>
  <p>register here</p>
  <button @click="register">Register Me!</button>
</template>
