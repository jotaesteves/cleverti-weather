<template>
  <figure class="weather-image-component__icon image" :class="size">
    <img :src="`${url}/${abbr}.svg`">
  </figure>
</template>

<script>
export default {
  name: 'WeatherImage',
  props: ['abbr', 'size'],
  data () {
    return {
      url: 'https://www.metaweather.com/static/img/weather'
    }
  }
}
</script>
