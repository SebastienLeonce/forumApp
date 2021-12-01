<template>
  <a-list item-layout="vertical" size="large" :loading="loading" :data-source="listData">
    <template #loadMore>
      <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="loadMore">loading more</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component :is="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="../assets/grizly.png"
          />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
          <template #avatar><a-avatar :src="item.avatar" /></template>
        </a-list-item-meta>
        <p style="text-align: justify">{{ item.content }}</p>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts">
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { defineComponent, Ref, ref, inject } from 'vue';
import { AxiosStatic } from "axios"

export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  setup() {
    const axios: AxiosStatic | undefined = inject("axios");
    const listData: Record<string, string>[] = [];
    const loading : Ref<boolean> = ref(true);
    const loadingMore : Ref<boolean> = ref(false);
    const listData2: Ref<Record<string, string>[]> = ref([]);

    const actions: Record<string, string>[] = [
      { type: 'StarOutlined', text: '156' },
      { type: 'LikeOutlined', text: '156' },
      { type: 'MessageOutlined', text: '2' },
    ];

    (axios as AxiosStatic)
      .get("posts/all")
      .then((response: { data: { posts: [] } }) => {
        listData.push(...response.data.posts.reverse())
        listData2.value.push(...listData.splice(0, 5));
        loading.value = false;
      })
      .catch((error: Error) => {
        alert(error.message)
      })

    const loadMore = () => {
        loadingMore.value = true;
        setTimeout(() => {
            loadingMore.value = false;
            listData2.value.push(...listData.splice(0, 5));
        }, 1000);
    };

    return {
      listData : listData2,
      actions,
      loading,
      loadMore,
      loadingMore
    };
  },
});
</script>