<template>
  <a-modal
    v-model:visible="visible"
    title="Add a new Post"
    centered
    @ok="emit('close')"
    @cancel="emit('close')"
  >
    <addPostFormComponent />
  </a-modal>
</template>

<script setup lang="ts">
import addPostFormComponent from '@/components/addPostForm.vue'
defineProps({
  visible: Boolean
});

const emit = defineEmits<{
  (event: 'close'): void
}>(); 
</script>