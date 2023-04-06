import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category",()=>{
    const categories = ref([
        {
            id: 1,
            name: 'Cerveza',
            owner: 'bar1',
            products:[
                {
                    id:1,
                    name: 'Quilmes',
                    price: 100,
                    stock: 8,
                },
                {
                    id:2,
                    name: 'Stella',
                    price: 200,
                    stock: 10,
                },
                {
                    id:3,
                    name: 'Heineken',
                    price: 300,
                    stock: 5,
                },
            ]
        }
    ])

    return {
        categories,

    }
})