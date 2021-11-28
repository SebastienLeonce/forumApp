<template>
  <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="Title">
      <a-input />
    </a-form-item>
    <a-form-item label="Content">
        <a-textarea placeholder="Basic usage" :rows="4" />
    </a-form-item>
    <a-form-item label="Description">
        <a-textarea placeholder="Basic usage" :rows="4" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import { Form } from 'ant-design-vue';

const useForm = Form.useForm;
export default defineComponent({
  setup() {
    const modelRef = reactive({
      name: '',
      region: undefined,
      type: [],
    });
    const rulesRef = reactive({
      name: [
        {
          required: true,
          message: 'Please input name',
        },
      ],
      region: [
        {
          required: true,
          message: 'Please select region',
        },
      ],
      type: [
        {
          required: true,
          message: 'Please select type',
          type: 'array',
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
      onValidate: (...args: any[]) => console.log(...args),
    });
    const onSubmit = () => {
      validate()
        .then(() => {
          console.log(toRaw(modelRef));
        })
        .catch((err : Error) => {
          console.log('error', err);
        });
    };
    return {
      labelCol: { span: 7 },
      wrapperCol: { span: 14, offset: 4 },
      validateInfos,
      resetFields,
      modelRef,
      onSubmit,
    };
  },
});
</script>