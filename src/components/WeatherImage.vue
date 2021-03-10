<template>
  <div class="weather-day-component__icon">
    <img :src="`${url}/${abbr}.svg`"/>
  </div>
</template>

<script>
export default {
  name: 'WeatherImage',
  props: ['abbr'],
  data () {
    return {
      url: 'https://www.metaweather.com/static/img/weather'
    }
  }
}
</script>
