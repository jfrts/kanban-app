<script setup lang="ts">
import CardComponent from './CardComponent.vue';
import NewCardComponent from './NewCardComponent.vue';
import DeleteComponent from './DeleteComponent.vue';

defineProps(["board", "column"]);
</script>

<template>
    <div @dragover="board.moveCardTo(column)" class="relative">
        <delete-component @click="board.deleteColumn(column.idColumn)" class="scale-90"/>
        <div class="p-4">
            <h3 class="board__column__name">
                {{ column.name }} | <span id="estimative">{{ column.getEstimative() }}</span>
            </h3>
            <card-component v-for="card of column.cards" :key="card.title" v-bind:="{ board, column, card }" class="board__card" />
        </div>
        <div class="board__column__addcardarea p-4">
            <new-card-component v-bind="{ board, column }" />
        </div>
    </div>
</template>

<style scoped>
.board__column__name {
    @apply text-lg font-semibold text-slate-600 mt-2 mb-4
}
.board__card {
    @apply border-b-2 mb-4 p-3 flex rounded-md justify-between items-center bg-gray-50 border-blue-300
}
.board__column__addcardarea {
    @apply bg-slate-50 border-t-2
}
</style>