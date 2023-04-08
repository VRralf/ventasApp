import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category",()=>{
    const categories = ref([
        {
            id: 1,
            name: 'Cervezas',
            image:"../assets/images/cervezas.jpg",
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
            id: 1,
            name: 'Gaseosas',
            image:'../assets/images/gaseosas.jpg',
            owner: 'bar1',
            products:[
                {
                    id:1,
                    name: 'Coca-Cola',
                    price: 100,
                    stock: 8,
                },
                {
                    id:2,
                    name: 'Pepsi',
                    price: 200,
                    stock: 10,
                },
                {
                    id:3,
                    name: 'Paso de los Toros',
                    price: 300,
                    stock: 5,
                },
                {
                    id:3,
                    name: 'Mirinda',
                    price: 300,
                    stock: 5,
                }, {
                    id:3,
                    name: 'Seven-Up',
                    price: 300,
                    stock: 5,
                },
            ]
        },
        {
            id: 1,
            name: 'Cervezas',
            image:'../assets/images/tragos.jpg',
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
            id: 1,
            name: 'Cervezas',
            image:'../assets/images/yogurt.jpg',
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
    ])

    return {
        categories,

    }
})