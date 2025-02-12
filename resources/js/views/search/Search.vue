<template>
    <div class="search-container">
        <input v-model="searchQuery" type="text" placeholder="Search..." />
        <button @click="submitSearch">Search</button>
        <div v-if="processing">Searching...</div>
        <div v-if="validationErrors.query">{{ validationErrors.query[0] }}</div>
        <ul v-if="searchResults.length">
            <li v-for="result in searchResults" :key="result.id">{{ result.name }}</li>
        </ul>
    </div>
</template>

<script setup>
import useSearch from '@/composables/search';

const { searchQuery, searchResults, validationErrors, processing, submitSearch } = useSearch();
</script>

<style scoped>
.search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
