<script setup lang="ts">
import { ref } from 'vue';

defineProps(["board"]);
let columnName = ref("");
</script>

<template>
    <div class="board__column--add">
        <input id="input_new_column" type="text" v-model="columnName">
        <button id="add_new_column" @click="board?.addColumn(columnName, false)">add</button>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F00" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="column--add__icon">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span class="column--add__text">add column</span>
    </div>
</template>

<style scoped>
.board__column--add {
    @apply w-60 p-4 mr-4 flex flex-col rounded-lg border-2 justify-center items-center gap-3 border-dashed border-slate-300 bg-slate-100
}

.column--add__icon {
    @apply stroke-slate-400 scale-[1.2];
}

.column--add__text {
    @apply text-base text-slate-400 my-1
}
</style>