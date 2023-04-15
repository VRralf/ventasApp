<script setup>
const props = defineProps({
    category:{}
})

</script>

<template>
    <button class="col-5 flex-grow-1 btn-category">{{ props.category.name }}</button>
</template>

<style scoped>
.btn-category {
    background-color: #ecba92e7;
    height: 7rem;
    margin: 1rem;
    border-radius: 8px;
    border: none;
}
</style>