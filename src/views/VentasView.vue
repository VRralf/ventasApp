<script setup>
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import { useCategoryStore } from '../store/categories'
import { useBarStore } from '../store/bars';

const barStore = useBarStore()
const categoryStore = useCategoryStore()
const estado = ref('categorias')
const indiceCategoria = ref(0)
const pedido = ref([
    /* {
        name: 'Producto',
        valor: 100,
        cantidad: 3,
        total: 300
    },
    {
        name: 'Producto',
        valor: 100,
        cantidad: 3,
        total: 300
    },
    {
        name: 'Producto',
        valor: 100,
        cantidad: 3,
        total: 300
    }, */
])
const total = computed(() => {
    return pedido.value.reduce((acc, prod) => {
        return acc + prod.total
    }, 0)
})

/* const categorias = ref([
    'CATEGORIA 1',
    'CATEGORIA 2',
    'CATEGORIA 3',
    'CATEGORIA 4',
    'CATEGORIA 5',
    'CATEGORIA 6',
    'CATEGORIA 7',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
    'CATEGORIA 8',
])
const productos = ref([
    {
        name: 'Producto 1',
        price: 100,
        category: 'CATEGORIA 1'
    },
    {
        name: 'Producto 2',
        price: 200,
        category: 'CATEGORIA 1'
    },
    {
        name: 'Producto 3',
        price: 300,
        category: 'CATEGORIA 1'
    },
    {
        name: 'Producto 1',
        price: 100,
        category: 'CATEGORIA 2'
    },
    {
        name: 'Producto 2',
        price: 200,
        category: 'CATEGORIA 2'
    },
    {
        name: 'Producto 3',
        price: 300,
        category: 'CATEGORIA 2'
    },
]) */

const productosF = ref([])
const productoPedido = ref({
    id:0,
    name: '',
    price: 0,
    amount: 0,
    total: 0,
    plus() {
        this.amount++
        this.calc()
    },
    minus() {
        if (this.amount) {
            this.amount--
        }
        this.calc()
    },
    calc() {
        this.total = this.amount * this.price
    }
})

function mostrarProductos(index){
    indiceCategoria.value = index
    estado.value = 'productos'
    /* productosF.value = productos.value.filter(prod => prod.category == categoria) */
}

function mostrarProducto(producto) {
    productoPedido.value.name = producto.name
    productoPedido.value.price = producto.price
    estado.value = 'venta'
}

function agregarProducto() {
    let newProduct = {
        name: productoPedido.value.name,
        price: productoPedido.value.price,
        total: productoPedido.value.total,
    }
    pedido.value.push(newProduct)
    Swal.fire({
        title: 'Exito!',
        text: 'Producto agregado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    volver()
}

function volver() {
    switch (estado.value) {
        case 'categorias': {
            Swal.fire({
                title: 'Advertencia!',
                text: 'No se puede volver mas atras.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            break
        }
        case 'productos': {
            estado.value = 'categorias'
            break
        }
        case 'venta': {
            estado.value = 'productos'
        }
    }
}
</script>

<template>
    <div class="ventana ventas ">
        <header>
            <h1 style="text-align: center;">Ventas</h1>
            <h3>Barra {{ barStore.bar }}</h3>
        </header>
        <main>
            
                <button @click="volver" id="volver" class=" neon-button d-flex justify-content-center">Volver</button>
            <div class="input-group d-flex justify-content-center mt-1">
                <div class="form-outline">
                    <input type="search" id="form1" class="form-control"  placeholder="Buscar..."/>               
                
            </div>
               
            </div>
            <div class="d-flex flex-wrap w-100" v-if="estado == 'categorias'" id="categorias">
                <button class=" btn-category " @click="mostrarProductos(indice)" v-for="(categoria,indice) of categoryStore.categories" :style= "'background-image: url('+categoria.image+')'" >{{
                    categoria.name }}</button>
                <button class=" btn-category " v-if="categoryStore.categories.length % 2 == 1"><i class="bi bi-search"></i></button>
            </div>
            <div id="productos" v-if="estado == 'productos'" class="d-flex justify-content-around flex-wrap w-100">
               
                <div class="card w-90 mt-1 " style="max-width: 540px;" @click="mostrarProducto(producto)" v-for="producto in categoryStore.categories[indiceCategoria].products">
                    <div class="row ">
                        <div class="col">
                            <img src="https://fotos.perfil.com/2019/06/24/4-recetas-de-tragos-para-invierno-744958.jpg"
                                class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col">
                            <div class="card-body" >
                                <h3 class="card-title" style="text-align: center;">{{ producto.name }}</h3>                              
                                 <p style="color: #F18805;"> Price: $ {{ producto.price }}</p>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <!-- <button v-if="categoryStore.categories[indiceCategoria].products.length % 2 == 1">😎</button> -->
            <div v-if="estado == 'venta'" id="venta" class="card mb-3 mt-5" style="max-width: 540px;">
                <div class="row ">
                    <div class="col">
                        <img src="https://fotos.perfil.com/2019/06/24/4-recetas-de-tragos-para-invierno-744958.jpg"
                            class="img-fluid rounded-start h-100" alt="...">
                    </div>
                    <div class="col">
                        <div class="card-body" >
                            <h2 class="card-title" style="text-align: start;">{{ productoPedido.name }}</h2>
                            <h5 style="text-align: start;">${{ productoPedido.price }}</h5>
                            
                            <div class="d-flex justify-content-evenly">
                                <button @click="productoPedido.plus">
                                <i class="bi bi-plus-circle" style="font-size: 25px;"></i></button>
                                <h5 style="padding: 10px;">{{ productoPedido.amount }}</h5>
                            <button @click="productoPedido.minus">
                                <i class="bi bi-dash-circle" style="font-size: 25px;"></i></button>    
                            </div>                       
                        </div>                        
                    </div>
                </div>
            </div>
            <button class=" neon-button" :disabled="!productoPedido.amount" @click="agregarProducto"
                                >Agregar</button>
            <!--  <div v-if="estado == 'venta'" id="venta">
                    <h2>Producto: {{ productoPedido.name }}</h2>
                    <p>Precio: ${{ productoPedido.price }}</p>
                    <p>Cantidad: {{ productoPedido.amount }}</p>
                    <button @click="productoPedido.plus" class="btn btn-secondary">+</button>
                    <button @click="productoPedido.minus" class="btn btn-secondary">-</button>
                    <button :disabled="!productoPedido.amount" @click="agregarProducto"
                        class="btn btn-secondary">Agregar</button>
                </div> -->



        </main>
        <footer>
            <h2>Total: ${{ total }}</h2>
        </footer>
    </div>
</template>
<style scoped>
.ventas {
    background-color: #f8f2fc;
   min-height: 100vh;
    min-width: 100vw;
}

header {
    background-color:#ffac00;
    color: #0E1428;
    min-height: 5vh;
    padding: 0.5rem;
    width: 100vw;  

}

.neon-button {    
    background: linear-gradient(0deg,#f8a476 0%,#f4b999  100%);
    color: #fff;
    margin-top: 1rem;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 20px;
    height: 3rem;
    width: 70%; 
    
     
}

/* #volver {
    width: 100vw;
    height: 3rem;
}
 */
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
    /* flex-direction: column;
    justify-content: center;
    align-items: center; */
    flex-wrap: wrap;
    /* padding-bottom: 8vh; */

}

.btn-category {    
    background-repeat:no-repeat;
    background-position:center;
    color: #f8f2fc;
    font-size: 20px;
    font-weight: bold;
    text-shadow: black 1px 0 10px;
    height: 7rem;
    width: 48%;
    margin: .5%;
    border: none;
    
   
    
}

#categorias{
    margin: 0%;
}
/* #venta {
    width: 100vw;
} */

#venta button {
    width: 3rem;
    height: 3rem;
    font-size: 16px;
    font-weight: 600;
    border: none;
    background-color: white;
}
.card uno{
    height:7rem ;
    width: 80%;
}

/* #productos {
    margin: 1rem;
}
 */
footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color:#ffac00;
    color: #0E1428;
    min-height: 5vh;
    padding: 0.5rem;
}</style>