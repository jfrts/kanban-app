<script setup lang="ts">
import { inject, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import BoardComponent from "../components/BoardComponent.vue";
import { Board } from "../entities/Board";
import { DomainEvent } from "../events/DomainEvent";
import { BoardService } from "../services/BoardService";

const data: { board: Board | undefined } = reactive({ board: undefined });

const route = useRoute();

const boardId = Number(route.params.idBoard);

onMounted(async () => {
    const boardService = inject("boardService") as BoardService;
    const board = await boardService.getBoard(boardId);
    board.on("addColumn", async function (event: DomainEvent) {
        await boardService.saveColumn(event.data);
    });
    board.on("deleteColumn", async function (event: DomainEvent) {
        const { idBoard, idColumn } = event.data;
        await boardService.deleteColumn(idBoard, idColumn);
    });
    board.on("addCard", async function (event: DomainEvent) {
        const idCard = await boardService.saveCard(event.data);
		event.data.card.idCard = idCard;
    });
    board.on("deleteCard", async function (event: DomainEvent) {
        const { idBoard, idColumn, idCard } = event.data;
        await boardService.deleteCard(idBoard, idColumn, idCard);
    });
    board.on("updatePositionMap", async function (event: DomainEvent) {
        await boardService.updatePositionMap(event.data);
    });
    data.board = board;
});
</script>

<template>
    <board-component :board="data.board"></board-component>
</template>


