<template>
  <a-form
    :model="formState"
    @finish="handleFinish"
  >
    <a-form-item>
      <a-input v-model:value="formState.email" placeholder="Email" data-cy="email">
        <template #prefix><MailOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password" data-cy="password">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        data-cy="submit"
        type="primary"
        html-type="submit"
        :disabled="formState.email === '' || formState.password === ''"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { notification } from 'ant-design-vue';
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue';
import { reactive, inject } from 'vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { AxiosStatic } from "axios";

interface FormState {
  email: string;
  password: string;
}

export default {
  components: {
    MailOutlined,
    LockOutlined,
  },
  setup() {
    const axios: AxiosStatic | undefined = inject("axios");
    const router = useRouter();

    if (axios) {
      const formState: UnwrapRef<FormState> = reactive({
        email: 'sean.maxwell@gmail.com',
        password: 'Password@1',
      });

      const handleFinish: FormProps['onFinish'] = (values : any) => {
        axios.post("auth/login", formState)
          .then(() => {
            router.push("restricted")
          })
          .catch((error: Error) => {
            notification['error']({
              message: error.name,
              description: error.message
            });
          });
      };

      return {
        formState,
        handleFinish
      };
    }
  }
}
</script>