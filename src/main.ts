import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import axios from "axios"
import VueAxios from "vue-axios"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

axios.defaults.withCredentials = true
axios.defaults.baseURL = (process.env.NODE_ENV == 'production') ? 'api/' : `http://${process.env.HOST}:${process.env.PORT}/api/`

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .use(Antd)

app.provide("axios", app.config.globalProperties.axios)
app.mount("#app")
