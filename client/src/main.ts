import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import "./index.css";
import { AxiosAdapter } from './infra/http/AxiosAdapter';
import { AuthServiceHttp } from './services/AuthServiceHttp';
import { BoardServiceHttp } from './services/BoardServiceHttp';
import { useAuthStore } from './stores/AuthStore';
import BoardViewVue from './views/BoardView.vue';
import BoardsViewVue from './views/BoardsView.vue';
import LoginViewVue from './views/LoginView.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/boards", component: BoardsViewVue },
        { path: "/boards/:idBoard", component: BoardViewVue },
        { path: "/login", component: LoginViewVue },
        { path: "/", redirect: "/login" },
    ]
});

const httpClient = new AxiosAdapter(router);

const authService = new AuthServiceHttp("https://app-branas-course.onrender.com", httpClient);

const pinia = createPinia();
pinia.use(({ store }) => {
    store.$router = router,
    store.authService = authService
});
app.use(router);
app.use(pinia);
useAuthStore().init(); 
app.provide("boardService", new BoardServiceHttp("http://localhost:3001", httpClient));
app.mount('#app');
