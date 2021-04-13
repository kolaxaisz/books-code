<template>
  <div>
    <ul class="menu">
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li><nuxt-link to="/form">Form</nuxt-link></li>
      <li><nuxt-link to="/motion-ui">Motion UI</nuxt-link></li>
    </ul>
    <Nuxt />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$getCurrentScreenSize()
  },
}
</script>
