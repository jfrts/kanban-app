<script setup lang="ts">
import { inject, onMounted, reactive } from 'vue';
import DashboardLayoutComponent from '../components/DashboardLayoutComponent.vue';
import { BoardService } from '../services/BoardService';
import { Board } from '../entities/Board';

const data: { boards: Board[] | undefined } = reactive({ boards: undefined });

onMounted(async () => {
    const boardService = inject("boardService") as BoardService;
    const boards = await boardService.getBoards();
    data.boards = boards;
});
</script>

<template>
    <dashboard-layout-component>
        <main class="flex flex-col flex-1">
            <h1 class="board__name">Boards</h1>
            <router-link v-for="board of data.boards" :to="`boards/${board.id}`">
                <article class="bg-gradient-to-r from-blue-500 to-indigo-600 w-9/12 p-12 rounded-xl shadow-md mb-8 ease-linear transition-all hover:scale-[1.005]">
                    <h2 class="text-xl font-semibold text-white">{{ board.name }}</h2>
                </article>
            </router-link>
            <router-link to="/boards/2">
                <article class="">
                    <h2 class="text-xl font-semibold text-white">Projeto 2</h2>
                </article>
            </router-link>
        </main>
    </dashboard-layout-component>
</template>

<style scoped>
.board__name {
    @apply text-3xl font-semibold leading-snug text-slate-600 mb-8 mt-20
}
</style>