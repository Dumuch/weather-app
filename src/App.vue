<template>
  <main>
    <weather-widget />
  </main>
</template>


<script>
import WeatherWidget from '@/components/weather-widget-component.vue';

export default {
    name: "App",
    components: { WeatherWidget },
}
</script>

<style scoped lang="scss">

</style>
