<script setup lang="ts">
import ColumnComponent from './ColumnComponent.vue';
import NewColumnComponent from './NewColumnComponent.vue';
import DashboardLayoutComponent from './DashboardLayoutComponent.vue';

defineProps(["board"]);
</script>

<template>
    <dashboard-layout-component>
        <div v-if="board" class="max-w-6xl flex flex-col justify-center">
            <h3 class="board__name">{{ board.name }} | <span id="estimative">{{ board.getEstimative() }}</span></h3>
            <div class="flex flex-wrap pr-8">
                <div class="board__columns">
                    <column-component v-for="column of board.columns" v-bind="{ board, column }" class="board__column" />
                    <new-column-component v-bind="{ board }" />
                </div>
            </div>
        </div>
    </dashboard-layout-component>
</template>

<style scoped>
.board__name {
    @apply text-3xl font-semibold leading-snug text-slate-600 mb-8;
}

.board__columns {
    @apply flex gap-4 min-h-[30rem]
}

.board__column {
    @apply w-60 flex flex-col justify-between gap-2 rounded-lg shadow-lg shadow-slate-200 bg-white
}
</style>