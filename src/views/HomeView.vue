<template>
  <div class="home-view">
    <NavBar />

    <div v-if="todayForecast && nextFiveDayForecast.length">
      <WeatherCard v-if="nextFiveDayForecast.length"
        :weather="nextFiveDayForecast[active]"
      />
      <div class="home-five-day columns scrolling-wrapper">
        <Weather
          v-for="(item, index) in nextFiveDayForecast"
          :key="index"
          :weather="item"
          :isActive="index === active"
          class="column"
          @click.native="handleClick(index)"
        />
      </div>
    </div>
    <div v-else class="no-data-container">
      <NoData />
    </div>

    <!--<div v-if="locationSearch.length > 0" class="city-names">
        <h3>Cities nearby</h3>
        <a
          v-for="(item, index) in locationSearch"
          :key="index"
          class="link__mouse-over"
          @click="handleCity(item)"
        >
          {{item.title}}
        </a>
    </div> -->
  </div>
</template>

<script>
import Weather from '@/components/WeatherComponent.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import NavBar from '@/components/NavBar.vue'
import NoData from '@/components/NoData.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    WeatherCard,
    Weather,
    NavBar,
    NoData
  },
  mounted () {
    this.handleData()
    this.timer = setInterval(this.handleData, 300000)
  },
  watch: {
    defaultLocation (newValue, oldValue) {
      if (newValue) {
        this.$store.dispatch(
          'weather/getLocation',
          this.locationSearch[0].woeid
        )
      }
    }
  },
  computed: {
    ...mapGetters('weather', [
      'locationSearch',
      'defaultLocation',
      'todayForecast',
      'nextFiveDayForecast',
      'loading'
    ]),

    locationList () {
      return this.locationSearch.map((location) => location.title)
    }
  },
  data () {
    return {
      timer: null,
      active: 0
    }
  },

  methods: {
    handleData () {
      this.$store.dispatch('weather/getFirstLocation')
    },

    handleCity (item) {
      this.$store.dispatch('weather/getLocation', item.woeid)
    },

    handleClick (index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu {
  text-align: left;
}

.home {
  &-view {
    width: 60vw;
    margin: 2rem auto;
  }
  &-five-day {
    display: flex;
    flex: 1 0 0;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 1rem 0;
  }

  &-navbar {
    &__title {
      color: white;
      font-size: 3rem;
      line-height: 2.9rem;
    }
    &__column {
      display: flex;
      align-items: flex-end;
      text-align: left;
    }
  }
}

.city-names {
  a {
    padding: 10px;
  }
}

.home-five-day .card{
  margin: 1rem;
  min-width: 150px;

  &.active {
    background-color: #4A73FC;
    color: #F8FAFD;
    cursor: pointer;
    box-shadow: 0 1em 1.5em -0.1em rgb(10 10 10 / 10%), 0 0px 0 2px rgb(10 10 10 / 6%);
  }
  &:hover{
    background-color: #4A73FC;
    color: #F8FAFD;
    cursor: pointer;
    box-shadow: 0 1em 1.5em -0.1em rgb(10 10 10 / 10%), 0 0px 0 2px rgb(10 10 10 / 6%);
  }
  &:first-child{
    margin-left: 0;
  }
  &:last-child{
    margin-right: 0;
  }
}

.no-data-container {
  background-color: #A1ADCE;
  border-radius: 20px;
}
</style>
