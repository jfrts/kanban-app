<script setup lang="ts">
import SidebarComponent from '../components/SidebarComponent.vue';
</script>

<template>
    <div class="flex gap-12">
        <sidebar-component />
        <slot></slot>
    </div>
</template>