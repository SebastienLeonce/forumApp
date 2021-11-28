<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal">
    <a-menu-item key="mail">
      <template #icon>
        <mail-outlined />
      </template>
      All Posts
    </a-menu-item>
    <a-menu-item key="app">
      <template #icon>
        <appstore-outlined />
      </template>
      Best Posts
    </a-menu-item>
    
    <a-menu-item key="add" style="margin-left: auto; cursor: default;" disabled>
        <a-button 
            type="primary"
            data-cy="addPost"
            @click="addPost"
        >
            <template #icon><PlusOutlined /></template>
                Add Post
            </a-button>
    </a-menu-item>
    <a-menu-item key="logout" style="cursor: default;" disabled>
        <a-button 
            @click="logout" 
            data-cy="logout"
            type="primary"
        >
            <template #icon><LogoutOutlined /></template>
            Logout
        </a-button>
    </a-menu-item>
  </a-menu>
  
  <a-popover v-model:visible="showAddForm" title="Add Post" trigger="click">
    <template #content>
      <a-card >
        <addPostComponent />
      </a-card>
    </template>
  </a-popover>
</template>
<script lang="ts">
import addPostComponent from "@/components/addPost.vue"

import { defineComponent, inject, Ref, ref } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { AxiosStatic } from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    PlusOutlined,
    LogoutOutlined,
    addPostComponent
  },
  setup() {
        const current = ref<string[]>(['mail']);
        const axios: AxiosStatic | undefined = inject("axios")
        const router = useRouter()

        const showAddForm : Ref<boolean> = ref(false);

        const logout = () => {
            (axios as AxiosStatic)
                .get("auth/logout")
                .then(() => {
                router.push("/")
                })
                .catch((error: Error) => {
                    alert(error.message)
                });
        }

        const addPost = () => {
          showAddForm.value = true;
        }
        
        return {
            current,
            logout,
            addPost,
            showAddForm
        };
  },
});
</script>