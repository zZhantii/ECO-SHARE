import axios from 'axios';
import { ref } from "vue";
import { defineStore } from "pinia";

export const authStore = defineStore("authStore", () => {

    let user = ref({name:''});
    let authenticated = ref(false);

    async function login(data) {
        axios.get('/api/user').then(response => {
            user.value = response.data.data
            authenticated.value = true
        }).catch(error => {
            user.value = {}
            authenticated.value = false
        })
    }
    async function getUser(data) {

        await axios.get('/api/user').then(response => {
            user.value = response.data.data
            authenticated.value = true
            console.log(user.value);
        }).catch(error => {
            user.value = {}
            authenticated.value = false
        })
    }
    function logout() {
        user.value = {}
        authenticated.value = false
    }

    return { user, authenticated, login, getUser, logout};
}, {persist: true});
