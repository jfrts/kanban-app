<script setup lang="ts">
import { ref } from 'vue';

defineProps(["board", "column"]);
let cardTitle = ref("");

function submitCard(board: any, column: any, title: string) {
    board?.addCard(column.name, title, 0);
    cardTitle.value = "";
}
</script>

<template>
    <div class="flex items-start">
        <input @keyup.enter="submitCard(board, column, cardTitle)" v-model="cardTitle" type="text" class="addcard__input">
        <button @click="submitCard(board, column, cardTitle)" class="addcard__button">add card</button>
    </div>
</template>

<style scoped>
.addcard__input {
    @apply bg-white border-2 px-2 text-xs border-indigo-100 mb-2 py-2 w-full
}

.addcard__button {
    @apply w-28 mx-auto text-xs text-center bg-indigo-100 py-2 border-2 border-indigo-100 text-slate-600 h-full block
}
</style>