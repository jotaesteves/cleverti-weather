<template>
  <div class="card" :class="(isActive) ? 'active': ''">
    <div class="card-content">
      <div class="content">
        <time :datetime="weather.applicable_date">
          {{ weather.applicable_date | getDayOfWeekAndToday}}
        </time>
        <br>
        <time :datetime="weather.applicable_date">
          {{ weather.applicable_date | dateWeatherCard }}
        </time>

        <WeatherImage :abbr="weather.weather_state_abbr" size="is-64x64" />

        <span
          class="weather-component__temperature"
        >
          {{ weather.max_temp | round }}ºC |
          <span class="min-temp"> {{ weather.min_temp | round }}ºC </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherImage from './WeatherImage'

export default {
  name: 'WeatherComponent',
  components: {
    WeatherImage
  },
  computed: {
    weather () {
      return this.$attrs.weather
    },
    isActive () {
      return this.$attrs.isActive
    }
  }
}
</script>

<style scoped lang="scss">
.weather-day-component {
  //border: 1px solid grey;
  border-radius: 7px;
  background-color: #0a123b;
  width: 200px;
  margin: 1rem;
  padding: 1rem;
  color: white;
}

p {
  margin: 0;
  padding: 0;
}

.superscript {
  vertical-align: super;
  font-weight: 500;
  font-size: 1rem;
}

.min-temp {
  opacity: 0.5;
}

.weather-component__temperature{
  font-size: 1rem;
  margin-top: auto!important;
  font-weight: 600;
}

.content time:first-child{
  font-weight: 600;
}

.card {
  background-color: white;
  color: #2c3e50;
}
</style>
