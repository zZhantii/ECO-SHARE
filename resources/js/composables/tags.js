import axios from "axios";
import { ref } from "vue";

export default function useTags() {
    const tag = ref({ id: 0, tag_name: "" });
    const tagList = ref([]);

    const getTags = async () => {
        axios.get("http://localhost:8000/api/tag").then((response) => {
            for (const element of response.data.data) {
                tagList.value.push({
                    id: element.id,
                    tag_name: element.tag_name,
                });
            }
        });
    };

    return { getTags, tagList, tag };
}
