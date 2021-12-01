<template>
<a-form :label-col="{ span: 6 }" >
    <a-form-item label="Title" v-bind="validateInfos.title" style="align-items: flex-end;">
        <a-input 
            placeholder="Title ..."
            v-model:value="modelRef.title" />
    </a-form-item>
    <a-form-item label="Description" v-bind="validateInfos.description">
        <a-input 
            placeholder="Content ..."
            v-model:value="modelRef.description" />
    </a-form-item>
    <a-form-item label="Content" v-bind="validateInfos.content">
        <a-textarea
            placeholder="Autosize height with minimum and maximum number of lines"
            :auto-size="{ minRows: 5, maxRows: 5 }"
            v-model:value="modelRef.content"
        />
    </a-form-item>
</a-form>
</template>


<script setup lang="ts">
import { reactive, toRaw, watch, inject } from 'vue';
import { Form } from 'ant-design-vue';
import { AxiosStatic } from 'axios';

const axios: AxiosStatic | undefined = inject("axios")
const useForm = Form.useForm;

const props = defineProps({
  submit: Boolean
});

const emit = defineEmits<{
  (event: 'ok'): void
  (event: 'ko'): void
}>(); 

watch(() => props.submit, (submit) => { 
  if (submit) {
    onSubmit();
  }
});

const modelRef = reactive({
  title: '',
  description: '',
  content: '',
  href: "https://www.antdv.com/",
  avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
  author: "seb"
});

const { validate, validateInfos } = useForm(
  modelRef,
  reactive({
    title: [
      {
        required: true,
        message: 'Please input title',
      },
    ],
    description: [
      {
        required: true,
        message: 'Please input description',
      },
    ],
    content: [
      {
        required: true,
        message: 'Please input content',
      },
    ],
    href: [], avatar: [], author: [],
  }),
);

const onSubmit = () => {
  validate()
    .then(res => {
      console.log(res, toRaw(modelRef)); 
      axios
        .post("posts/add", { post: toRaw(modelRef) })
        .then(() => {
          emit('ok')
          emit('ko')
        })
        .catch((error: Error) => {
            alert(error.message)
        });
    })
    .catch(err => {
      console.log('error', err);
      emit('ko')
    });
};

</script>