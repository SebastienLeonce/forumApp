<template>
  <h1>This is a restricted page</h1>
  <a-row type="flex" justify="space-around" align="middle" :gutter="[0,32]">
    <postsComponent />
  </a-row>
  <button @click="logout" data-cy="logout">Logout</button>
</template>

<script lang="ts">
import postsComponent from "@/components/posts.vue"
import { useRouter } from "vue-router"
import { inject } from "vue"
import { AxiosStatic } from "axios"

export default {
  components: {
    postsComponent
  },
  setup() {
    const axios: AxiosStatic | undefined = inject("axios")

    const router = useRouter()

    const logout = () => {
      (axios as AxiosStatic)
        .get("auth/logout")
        .then(() => {
          router.push("/")
        })
        .catch((error: Error) => {
          alert(error.message)
        })
    }

    return {
      logout
    }
  }
}
</script>
