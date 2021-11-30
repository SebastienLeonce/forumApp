<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal">
    <a-menu-item key="all">
      <template #icon>
        <mail-outlined />
      </template>
      All Posts
    </a-menu-item>
    <a-menu-item key="fav">
      <template #icon>
        <appstore-outlined />
      </template>
      Best Posts
    </a-menu-item>
    
    <a-menu-item key="add" style="margin-left: auto; cursor: default;" disabled>
        <a-button 
            type="primary"
            data-cy="addPost"
            @click="emit('addPost')"
        >
            <template #icon><PlusOutlined /></template>
                Add Post
            </a-button>
    </a-menu-item>
    <a-menu-item key="logout" style="cursor: default;" disabled>
        <a-button 
            @click="emit('logout')" 
            data-cy="logout"
            type="primary"
        >
            <template #icon><LogoutOutlined /></template>
            Logout
        </a-button>
    </a-menu-item>
  </a-menu>
</template>
<script setup lang="ts">
import { 
  MailOutlined, 
  AppstoreOutlined, 
  PlusOutlined, 
  LogoutOutlined 
} from '@ant-design/icons-vue';
import { ref } from 'vue';

const current = ref<string[]>(['all']);
const emit = defineEmits<{
  (event: 'logout'): void
  (event: 'addPost'): void
}>();        
</script>