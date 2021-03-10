<template>
  <b-field class="search-navbar" label="Find a Location">
    <b-autocomplete
      rounded
      :data="data"
      icon="search"
      clearable
      placeholder="e.g. Lisbon"
      field="title"
      :loading="isFetching"
      @typing="getAsyncData"
      @select="handleSelect"
      @keyup.native.enter="handleEnter"
    >
      <template slot-scope="props">
        {{ props.option.title }}
      </template>
    </b-autocomplete>
  </b-field>
</template>

<script>
import debounce from 'lodash/debounce'
import HttpService from '../services/httpService'

export default {
  name: 'SearchBar',
  data () {
    return {
      data: [],
      selected: null,
      isFetching: false
    }
  },
  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncData: debounce(function (name) {
      if (!name.length) {
        this.data = []
        return
      }
      this.isFetching = true
      HttpService.get(`location/search/?query=${name}`)
        .then(({ data }) => {
          this.data = data
        })
        .catch((error) => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500),

    handleSelect (item) {
      this.$store.dispatch('weather/getLocation', item.woeid)
    },

    handleEnter () {
      if (this.data.length) this.$store.dispatch('weather/getLocation', this.data[0].woeid)
    }
  }
}
</script>

<style lang="scss" scoped>
    .search-navbar{
        text-align: left;
        .label {
            font-weight: 400!important;
            color: grey;
        }
    }
</style>
