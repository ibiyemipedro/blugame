<template>
  <div class="loading-modal">
    <v-card>
      <v-layout justify-center>
        <v-flex xs12 sm10 justify-center>
          <v-layout justify-center class="mt-6 mb-4">
            <v-spacer></v-spacer>
            <v-icon>mdi-loading mdi-spin mdi-48px</v-icon>
            <v-spacer></v-spacer>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "LoadingModal",
};
</script>

<style scoped>
</style>
