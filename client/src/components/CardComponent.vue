<script setup lang="ts">
import DeleteComponent from './DeleteComponent.vue';
defineProps(["board", "column", "card"]);
</script>

<template>
    <div 
        draggable="true" 
        @dragstart="board.selectCard(column, card)" 
        @dragend="board.resetCard()"
        @dragover="board.swap(card)"
        class="relative cursor-pointer"
    >
        <delete-component @click="board.deleteCard(column, card.idCard)" class="scale-[0.65]" />
        <h5 class="board__card__title">
            {{ card.title }}
        </h5>
        <span class="estimative">
            <button id="decrease-estimative" @click="board.decreaseEstimative(card)">-</button>
            <span id="card-estimative" class="board__card__estimative">{{ card.estimative }}</span> min
            <button id="increase-estimative" @click="board.increaseEstimative(card)">+</button>
        </span>
    </div>
</template>

<style scoped>
.board__card__title {
    @apply text-sm leading-none font-semibold text-slate-600
}

.estimative {
    @apply text-xs px-4 py-1 rounded-full border border-dashed border-blue-400 bg-blue-100 text-blue-500
}

.board__card__estimative {
    @apply mx-1
}
</style>