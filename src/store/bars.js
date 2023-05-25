import { ref, computed } from "vue";
import { defineStore } from "pinia";

/* export const useBarStore = defineStore("bars", {
    state: () => ({
        bar: null,
        bars:[
            {
                id: 1,
                name: 'Barra 1',
            },
            {
                id: 2,
                name: 'Barra 2',
            },
            {
                id: 3,
                name: 'Barra 3',
            },
        ]
    }),
    actions:()=>{

    },
    getters: ()=>{
        
    }
}) */
export const useBarStore = defineStore("bars", ()=>{

    const bar = ref(null)

    const bars = ref([
        {
            id: 1,
            name: 'Barra 1',
        },
        {
            id: 2,
            name: 'Barra 2',
        },
        {
            id: 3,
            name: 'Barra 3',
        },
    ])

    const barSelect = (barS) =>{
        bar.value = barS
    }

    return {
        bar,
        bars,
        barSelect
    }
})