<template>
  <div class="weather-day-component">

    <div class="weather-day-component__humidity">
      <p>Humidity</p>
      <h1>{{ weather.humidity }} <span class="superscript">%</span></h1>
    </div>

    <div class="weather-day-component__temperature">
      <p>Temperature</p>
      <h1>{{ weather.the_temp | tempRound }} <span class="superscript">ºC</span></h1>
      <p><span class="temp-max">{{ weather.max_temp | tempRound }}º</span> | <span class="temp-min">{{ weather.min_temp | tempRound }}º</span></p>
    </div>

    <WeatherImage :abbr="weather.weather_state_abbr"/>

    <div class="weather-day-component__date">
      <p>{{ weather.applicable_date | getDayOfWeek}}</p>
      <p>{{ weather.applicable_date}}</p>
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

  .temp {
    &-max {
      color: #921903;
    }
    &-min {
      color: #478f8f;
    }
  }
</style>
