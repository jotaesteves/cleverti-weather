<template>
  <div
    class="card"
    :style="`background-image: url(${getBackgroundImage});
      background-blend-mode: multiply;
      background-repeat: no-repeat;
      background-size: cover;`"
  >
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div
            class="column is-one-third"
            style="padding-left: 7%; margin: auto"
          >
            <WeatherImage :abbr="weather.weather_state_abbr" />
          </div>
          <div
            class="column"
            style="
              display: flex;
              flex-direction: column;
              flex: 1;
              text-align: left;
              margin: 3rem 5rem 2rem;
            "
          >
            <h1 style="color: white; font-size: 3rem">
              {{ weather.weather_state_name }}
            </h1>
            <time style="font-size: 1.5rem" :datetime="weather.applicable_date">
              {{ weather.applicable_date | getDayOfWeekAndToday }},
              {{ weather.applicable_date | dateWeatherCard }}
            </time>
            <h1
              class="weather-card__temperature"
              style="margin-top: auto !important; color: white"
            >
              {{ weather.the_temp | round }}ºC
            </h1>
          </div>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <div class="card-footer-item level" style="margin: 0; text-align: left">
        <div class="level-item">
          <b-icon icon="wind" size="is-large" />
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Wind</p>
          <p class="weather-card__footer-value">
            {{ weather.wind_speed | roundTwoDecimals }} mph
          </p>
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Direction</p>
          <p class="weather-card__footer-value">
            {{ weather.wind_direction_compass }}
            {{ weather.wind_direction | round }}º
          </p>
        </div>
      </div>

      <div class="card-footer-item level" style="margin: 0; text-align: left">
        <div class="level-item">
          <b-icon icon="thermometer-full" size="is-large" />
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Max</p>
          <p class="weather-card__footer-value">
            {{ weather.max_temp | round }}ºC
          </p>
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Min</p>
          <p class="weather-card__footer-value">
            {{ weather.min_temp | round }}ºC
          </p>
        </div>
      </div>
    </footer>
    <footer class="card-footer">
      <div class="card-footer-item level" style="margin: 0; text-align: left">
        <div class="level-item">
          <b-icon icon="sun" size="is-large" />
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Sunrise</p>
          <p class="weather-card__footer-value">
            {{ weather.sun_rise | formatDate }}
          </p>
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Sunset</p>
          <p class="weather-card__footer-value">
            {{ weather.sun_set | formatDate }}
          </p>
        </div>
      </div>

      <div class="card-footer-item level" style="margin: 0; text-align: left">
        <div class="level-item">
          <b-icon icon="tachometer-alt" size="is-large" />
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Pressure</p>
          <p class="weather-card__footer-value">
            {{ weather.air_pressure }} mbar
          </p>
        </div>
        <div class="level-item column">
          <p class="weather-card__footer-title">Humidity</p>
          <p class="weather-card__footer-value">{{ weather.humidity }}%</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import WeatherImage from '@/components/WeatherImage'

export default {
  name: 'WeatherCard',
  components: {
    WeatherImage
  },
  computed: {
    weather () {
      return this.$attrs.weather
    },
    getBackgroundImage () {
      const reference = {
        sn: 'https://images.unsplash.com/photo-1547754980-3df97fed72a8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80',
        sl: 'https://images.unsplash.com/photo-1613522645145-aa83afabf111?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1066&q=80',
        h: 'https://images.unsplash.com/photo-1606193059849-bfa6ce30da02?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        t: 'https://images.unsplash.com/photo-1564343921985-91ced954364a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        hr: 'https://images.unsplash.com/photo-1437624155766-b64bf17eb2ce?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        lr: 'https://images.unsplash.com/photo-1489781879256-fa824b56f24f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        s: 'https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80',
        hc: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=967&q=80',
        lc: 'https://images.unsplash.com/photo-1493364391862-bb90969a4cc1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        c: 'https://images.unsplash.com/photo-1517495306984-f84210f9daa8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
      }
      return reference[this.weather.weather_state_abbr] ? reference[this.weather.weather_state_abbr] : null
    }
  }
}
</script>

<style lang="scss" scoped>
.weather-card {
  &__temperature {
    font-size: 5rem;
    margin: 0 !important;
  }
  &__footer-title {
    color: #c2d2fd;
    font-weight: 200;
  }
  &__footer-value {
    color: #f8fafd;
    font-weight: 600;
  }
}
</style>
