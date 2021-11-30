<template>
  <navbarComponent @logout="logout" @addPost="showAddPost = true" />
  <a-row type="flex" justify="space-around" align="middle" :gutter="[0,32]">
    <postsComponent />
  </a-row>
  <addPostComponent 
    :visible="showAddPost" 
    @close="showAddPost = false"
  />
</template>

<script lang="ts">
import postsComponent from "@/components/posts.vue"
import navbarComponent from "@/components/navbar.vue"
import addPostComponent from "@/components/addPost.vue"
import { AxiosStatic } from 'axios';
import { inject, Ref, ref } from 'vue'
import { useRouter } from 'vue-router';

export default {
  components: {
    postsComponent,
    navbarComponent,
    addPostComponent
  },
  setup() {
    const axios: AxiosStatic | undefined = inject("axios")
    const router = useRouter()
    const showAddPost: Ref<Boolean> = ref(false);

    const logout = () => {
      axios
        .get("auth/logout")
        .then(() => {
        router.push("/")
        })
        .catch((error: Error) => {
            alert(error.message)
        });
    }

    return {
      logout,
      showAddPost
    }
  }
}
</script>
