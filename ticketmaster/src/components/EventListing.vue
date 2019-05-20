<template>
  <div class="event-listing">
    <div v-for="item in items" :key="item.id" class="event-listing__item">
      <img :src="item.imageUrl" :alt="item.name">
      <div class="content">
        <a :href="item.url"><h3>{{ item.name }}</h3></a>
        <div><span>{{ item.startDateTime }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['term'],
  serverPrefetch () {
    return this.search({ term: this.term })
  },
  computed: {
    ...mapState(['items'])
  },
  methods: {
    ...mapActions(['search'])
  }
}
</script>

<style scoped>
  .event-listing {
    display: flex;
    flex-flow: column;
  }
  .event-listing__item {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    margin-bottom: 32px;
  }

  .event-listing__item img {
    width: 100%;
  }

  .event-listing__item .content {
    padding: 16px;
  }
</style>



