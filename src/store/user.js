import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", ()=>{
    const user = ref({
        id: 1,
        name: 'Fernanda'
    })

    const login = ()=>{

    }

    return {
        user,
        login,
    }
})