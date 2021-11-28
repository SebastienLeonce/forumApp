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
import { defineComponent, Ref, ref } from 'vue';

const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently. We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently. We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
  setup() {
    const actions: Record<string, string>[] = [
      { type: 'StarOutlined', text: '156' },
      { type: 'LikeOutlined', text: '156' },
      { type: 'MessageOutlined', text: '2' },
    ];

    const loading : Ref<boolean> = ref(true);
    const loadingMore : Ref<boolean> = ref(false);
    let listData2: Ref<Record<string, string>[]> = ref(listData.splice(0, 5));

    setTimeout(() => loading.value = false, 2000);

    const loadMore = () => {
        loadingMore.value = true;
        setTimeout(() => {
            loadingMore.value = false;
            listData2.value.push(...listData.splice(0, 5));
        }, 2000);
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