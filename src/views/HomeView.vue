<template>
  <div class="home-view">
    <h1 class="home-view__title">{{ title }}</h1>
    <div class="home-five-day">
      <Weather
        v-for="(item, index) in location.consolidated_weather"
        :key="index"
        :weather="item"
      />
    </div>

    <div class="city-names">
        <a
          v-for="(item, index) in locationSearch"
          :key="index"
          class="link__mouse-over"
          @click="handleCity(item)"
        >
          {{item.title}}
        </a>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Weather from '@/components/WeatherComponent.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Weather
  },
  mounted () {
    this.handleData()
  },
  watch: {
    defaultLocation (newValue, oldValue) {
      if (newValue) this.$store.dispatch('weather/getLocation', this.locationSearch[0].woeid)
    }
  },
  computed: {
    ...mapGetters('weather', [
      'locationSearch',
      'location',
      'locationDay',
      'defaultLocation',
      'title',
      'loading'
    ]),

    locationList () {
      return this.locationSearch.map(location => location.title)
    }
  },

  methods: {
    handleData () {
      this.$store.dispatch('weather/getSearchLocationLattLong')
    },

    handleCity (item) {
      this.$store.dispatch('weather/getLocation', item.woeid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    &-five-day{
      display: flex;
      flex-wrap: wrap;
      flex: 1 0 0;
      align-items: center;
      justify-content: center;
    }
  }

  .city-names {
    a {
      padding: 10px;
    }
  }
</style>
