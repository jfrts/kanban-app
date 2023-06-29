<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";

const username = ref("demo@example.com");
const password = ref("password123");

const authstore = useAuthStore();
</script>

<template>
    <section class="flex flex-col md:flex-row h-screen items-center">

        <div class="bg-white hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" alt="" class="w-full h-full object-cover">
        </div>

        <div
            class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">

            <div class="w-full h-100">
                <h1 class="text-xl md:text-2xl font-bold leading-tight mb-6">Log in to your account</h1>
                    <div>
                        <label class="block text-gray-700">Username</label>
                        <input v-model="username" type="text" placeholder="Enter Username" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autofocus required>
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700">Password</label>
                        <input v-model="password" type="password" placeholder="Enter Password" minlength="6" class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required>
                    </div>

                    <button @click="authstore.login(username, password)" class="w-full block bg-slate-800 hover:bg-slate-700 focus:bg-slate-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">Log In</button>
            </div>
        </div>
    </section>
</template>