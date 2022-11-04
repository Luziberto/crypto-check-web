import { createApp } from "vue"
// import './style.css'
import App from "./App.vue"
import "./index.css"
import router from "./router"
import  { createPinia } from "pinia"
import { useLocaleStore } from "@/store/locale"

const app = createApp(App)

app.use(createPinia())
app.use(router)

useLocaleStore()

app.mount("#app")


