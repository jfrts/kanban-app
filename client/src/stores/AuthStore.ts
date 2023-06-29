import { defineStore } from "pinia";

export const useAuthStore = defineStore("authstore", {
    state() {
        return {
            session: {} as any
        }
    },
    actions: {
        async login(username: string, password: string) {
            this.session = await this.authService.login(username, password);
            const loginData = JSON.stringify(this.session);
            if (loginData !== '""') {
                localStorage.setItem("token", loginData);
                this.$router.push("/boards");
            }
        },
        logout() {
            this.session = {};
            localStorage.removeItem("token");
            this.$router.push("/login");
        },
        init() {
            const token = localStorage.getItem("token");
            if (token) {
                this.session.token = token;
            }
        }
    }
});