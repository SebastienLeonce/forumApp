<template>
  <a-modal
    v-model:visible="visible"
    title="Add a new Post"
    centered
    @ok="submit=true"
    @cancel="emit('close')"
  >
    <addPostFormComponent 
      :submit="submit" 
      @ok="emit('close');"
      @ko="submit=false;"
    />
  </a-modal>
</template>

<script setup lang="ts">
import addPostFormComponent from '@/components/addPostForm.vue'
import { ref } from 'vue';

defineProps({
  visible: Boolean
});

const emit = defineEmits<{
  (event: 'close'): void
}>(); 

const submit = ref(false);
</script>