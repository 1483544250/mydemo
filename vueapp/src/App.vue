<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  /* overflow: visible; */
  font-size: calc(1000vw / 375);
}
</style>
