<template>
  <div class="home-navbar columns">
    <div class="home-navbar__column column">
      <h1 class="home-navbar__title">
        {{ city }}
      </h1>
      ,
      <h2 class="home-navbar__subtitle">
        {{ country }}
      </h2>
    </div>

    <div class="column">
      <SearchBar />
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {
    SearchBar
  },
  computed: {
    ...mapGetters('weather', ['city', 'country'])
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-navbar {
    &__title {
      color: #151515;
      font-size: 3rem;
      line-height: 2.9rem;
    }
    &__subtitle {
        font-size: 1.5rem;
        line-height: 1.88rem;
        color: #757575;
    }
    &__column {
      display: flex;
      align-items: flex-end;
      text-align: left;
    }
  }
}
</style>
