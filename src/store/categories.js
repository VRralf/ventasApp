import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category",()=>{
    const categories = ref([
        {
            id: 1,
            name: 'Cervezas',
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
        },
        {
            id: 2,
            name: 'Gaseosas',
            owner: 'bar1',
            products:[
                {
                    id:1,
                    name: 'Coca Cola',
                    price: 100,
                    stock: 8,
                },
                {
                    id:2,
                    name: 'Fanta',
                    price: 200,
                    stock: 10,
                },
                {
                    id:3,
                    name: 'Sprite',
                    price: 300,
                    stock: 5,
                },
            ]
        },
        {
            id: 3,
            name: 'Tragos',
            owner: 'bar1',
            products:[
                {
                    id:1,
                    name: 'Margarita',
                    price: 100,
                    stock: 8,
                },
                {
                    id:2,
                    name: 'Semen de pitufo',
                    price: 200,
                    stock: 10,
                },
                {
                    id:3,
                    name: 'Fernet',
                    price: 300,
                    stock: 5,
                },
            ]
        },
    ])

    return {
        categories,

    }
})