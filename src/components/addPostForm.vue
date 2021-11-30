<template>
<a-form :label-col="{ span: 6 }" >
    <a-form-item label="Title" v-bind="validateInfos.name" style="align-items: flex-end;">
        <a-input 
            placeholder="Title ..."
            v-model:value="modelRef.name" />
    </a-form-item>
    <a-form-item label="Description" v-bind="validateInfos['sub.name']">
        <a-input 
            placeholder="Content ..."
            v-model:value="modelRef.sub.name" />
    </a-form-item>
    <a-form-item label="Content" v-bind="validateInfos['sub.name']">
        <a-textarea
            placeholder="Autosize height with minimum and maximum number of lines"
            :auto-size="{ minRows: 5, maxRows: 5 }"
        />
    </a-form-item>
</a-form>
</template>


<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;

const modelRef = reactive({
  name: '',
  sub: {
    name: '',
  },
});
const { resetFields, validate, validateInfos } = useForm(
  modelRef,
  reactive({
    name: [
      {
        required: true,
        message: 'Please input name',
      },
    ],
    'sub.name': [
      {
        required: true,
        message: 'Please input sub name',
      },
    ],
  }),
);

const onSubmit = () => {
  validate()
    .then(res => {
      console.log(res, toRaw(modelRef));
    })
    .catch(err => {
      console.log('error', err);
    });
};
const reset = () => {
  resetFields();
};
</script>