<script setup lang="ts">
import { useAuthStore } from "../stores/AuthStore";

const authStore = useAuthStore();
let username = "";
if (localStorage.getItem("token")) {
    username = JSON.parse(localStorage.getItem("token") as string).user.name;
}
</script>

<template>
    <div class="flex flex-col top-0 left-0 w-64 bg-white h-screen border-r">
        <div class="flex items-center ml-6 h-14 border-b gap-2">
            <img src="https://i.pravatar.cc/28" class="rounded-full border-2 border-slate-900 shadow-sm">
            <div>{{ username }}</div>
        </div>
        <div class="overflow-y-auto overflow-x-hidden flex-grow">
            <ul class="flex flex-col py-4 space-y-1">
                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-slate-500">Menu</div>
                    </div>
                </li>
                <li>
                    <router-link to="/boards" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-slate-50 text-slate-600 hover:text-slate-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                                </path>
                            </svg>
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">
                            Boards
                        </span>
                    </router-link>
                </li>
                <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                        <div class="text-sm font-light tracking-wide text-slate-500">Settings</div>
                    </div>
                </li>
                <li>
                    <a @click="authStore.logout()" class="relative cursor-pointer flex flex-row items-center h-11 focus:outline-none hover:bg-slate-50 text-slate-600 hover:text-slate-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span class="inline-flex justify-center items-center ml-4">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                </path>
                            </svg>
                        </span>
                        <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>