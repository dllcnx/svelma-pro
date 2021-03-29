<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import { addr } from '../utils/china.js'

  const dispatcher = createEventDispatcher()

  let province = ''
  export let province_name = ''
  let provinceData = addr

  let city = ''
  export let city_name = ''
  let cityData = {}

  let county = ''
  export let county_name = ''
  let countyData = {}

  onMount(() => {
    if (province_name) {
      for (let key in addr) {
        if (addr[key].name === province_name) {
          province = key
          cityData = addr[key].child
          break
        }
      }

      if (city_name) {
        for (let key in cityData) {
          if (cityData[key].name === city_name) {
            city = key
            countyData = cityData[key].child
            break
          }
        }

        if (county_name) {
          for (let key in countyData) {
            if (countyData[key] === county_name) {
              county = key
              break
            }
          }
        }
      }
    }
  })

  function checkedProvince() {
    initCity()
    initCounty()
    cityData = provinceData[province].child
    province_name = provinceData[province].name

    postDispatcher()
  }

  function checkedCity() {
    initCounty()
    countyData = cityData[city].child
    city_name = cityData[city].name

    postDispatcher()
  }

  function checkedCounty() {
    county_name = countyData[county]
    // countyData = data;

    postDispatcher()
  }

  function initCity() {
    city = ''
    city_name = ''
    cityData = {}
  }

  function initCounty() {
    countyData = {}
    county = ''
    county_name = ''
  }

  function postDispatcher() {
    dispatcher('checked', {
      province: province_name,
      city: city_name,
      county: county_name,
    })
  }
</script>

<style lang="scss">
  .select {
    width: 30%;
    float: left;

    select {
      width: 100%;
    }
  }

  .province,
  .city {
    margin-right: 5%;
  }
</style>

<div>
  <div class="select province">
    <select bind:value={province} on:change={checkedProvince} style="color: {province ? '' : '#9E9E9E'}">
      <option value="" disabled selected style="display: none">省</option>
      {#each Object.entries(provinceData) as [key, value]}
        <option value={key}>{value.name}</option>
      {/each}
    </select>
  </div>
  <div class="select city">
    <select bind:value={city} on:change={checkedCity} style="color: {city ? '' : '#9E9E9E'}">
      <option value="" disabled selected style="display: none">市</option>
      {#each Object.entries(cityData) as [key, value]}
        <option value={key}>{value.name}</option>
      {/each}
    </select>
  </div>
  <div class="select">
    <select bind:value={county} on:change={checkedCounty} style="color: {county ? '' : '#9E9E9E'}">
      <option value="" disabled selected style="display: none">区县</option>
      {#each Object.entries(countyData) as [key, value]}
        <option value={key}>{value}</option>
      {/each}
    </select>
  </div>
</div>
