import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", ()=>{
    const user = ref(null)

    const login = (userLogin)=>{
        user.value = userLogin
        localStorage.setItem('user',JSON.stringify(user))
    }

    return {
        user,
        login,
    }
})