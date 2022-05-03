<template>
  <div>
    <div class="bg0e9f64 px-6 py-4">
      <div class="w-6/12 flex items-center justify-between">
        <nuxt-link to="/" v-if="$route.path !== '/'" class="flex items-center">
          <img src="../static/images/arrow-right-w.svg" class="arrow w-auto h-auto"/>
        </nuxt-link>
        <h1 class="c-white text-center">Notes</h1>
      </div>
    </div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
.arrow{
  transform: rotate(-180deg);
}
</style>
