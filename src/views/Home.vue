<template>
  <a-row type="flex" justify="space-around" align="middle">
    <login-component />
  </a-row>
</template>

<script lang="ts">
import loginComponent from "@/components/login.vue"

export default {
  components: {
    loginComponent
  }
}
</script>