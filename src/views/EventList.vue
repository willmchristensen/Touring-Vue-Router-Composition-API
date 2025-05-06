<script setup>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
import { onMounted, ref, computed, watch } from "vue";

const props = defineProps(["page"]);
const events = ref(null);
// --------------HASNEXTPAGE - TOTALEVENTS-------------------------
const totalEvents = ref(0);
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value/2)
  return props.page < totalPages
});
// ----------------------------------------------------------------
const fetchEvents = () => {
  EventService.getEvents(2, props.page)
    .then((response) => {
      events.value = response.data;
      // --------------TOTALEVENTS-------------------------
      totalEvents.value = response.headers["x-total-count"]
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  fetchEvents();
});
// --------------fetch if page change-------------------------
watch(
  () => props.page,
  () => {
    events.value = null;
    fetchEvents()
  }
)
// -----------------------------------------------------------

</script>

<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <router-link
      :to="{name: 'EventList', query: {page: page - 1}}"
      rel="prev"
      v-if="page != 1"
    >Prev Page</router-link>
    
    <router-link
      :to="{name: 'EventList', query: {page: page + 1}}"
      rel="next"
      v-if="hasNextPage"
    >Next Page</router-link>

  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
