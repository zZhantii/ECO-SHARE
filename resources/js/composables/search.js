import { ref, reactive } from 'vue';
import axios from 'axios';

export default function useSearch() {
    const searchQuery = ref('');
    const searchResults = ref([]);
    const processing = ref(false);
    const validationErrors = ref({});

    const submitSearch = async () => {
        if (processing.value) return;

        processing.value = true;
        validationErrors.value = {};

        await axios.post('/search', { query: searchQuery.value })
            .then(response => {
                searchResults.value = response.data.results;
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors;
                }
            })
            .finally(() => processing.value = false);
    };

    return {
        searchQuery,
        searchResults,
        validationErrors,
        processing,
        submitSearch
    };
}
