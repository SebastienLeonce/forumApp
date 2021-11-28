<template>
  <navbarComponent />
  <a-row type="flex" justify="space-around" align="middle" :gutter="[0,32]">
    <postsComponent />
  </a-row>
</template>

<script lang="ts">
import postsComponent from "@/components/posts.vue"
import navbarComponent from "@/components/navbar.vue"
export default {
  components: {
    postsComponent,
    navbarComponent
  },
  setup() {
    
  }
}
</script>
