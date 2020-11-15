<template>
  <v-app id="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  background-color: var(--v-background-base);
  font-family: "Avenir";
  min-width: 100%;
}
</style>