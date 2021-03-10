<template>
    <div class="no-data">
        <WeatherImage abbr="s"/>
        <h1>Nothing to show, please select a city.</h1>
    </div>
</template>

<script>
import WeatherImage from '@/components/WeatherImage'
export default {
  name: 'NoData',
  components: {
    WeatherImage
  }
}
</script>

<style lang="scss" scoped>
    h1{
        color: white;
        font-size: 2rem;
        margin: 2rem;
    }
    .no-data {
        width: 30rem;
        margin: auto;
        margin-top: 6rem;
        margin-bottom: 6rem;
        filter: brightness(1.4);
        padding: 2rem 0 1rem 0;
    }
</style>
