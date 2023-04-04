<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { computed } from '@vue/reactivity';

const estado = ref('categorias')
const numeroBarra = ref('2')
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
const total = computed(()=>{
    return pedido.value.reduce((acc,prod)=>{
        return acc + prod.total
    },0)
})

const categorias = ref([
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
])

const productosF = ref([])
const productoPedido = ref({
    name: '',
    price: 0,
    amount: 0,
    total: 0,
    plus(){
        this.amount++
        this.calc()
    },
    minus(){
        if(this.amount){
            this.amount--
        }
        this.calc()
    },
    calc(){
        this.total = this.amount * this.price
    }
})

function mostrarProductos(categoria){
    estado.value = 'productos'
    productosF.value = productos.value.filter(prod => prod.category == categoria)
}

function mostrarProducto(producto){
    productoPedido.value.name = producto.name
    productoPedido.value.price = producto.price
    estado.value = 'venta'
}

function agregarProducto(){
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
    <div class="ventana ventas">
        <header>
            <h1>Ventas</h1>
            <p>Barra {{ numeroBarra }}</p>
        </header>
        <main>
            <button @click="volver" id="volver">Volver</button>
            <div v-if="estado == 'categorias'" id="categorias">
                <button @click="mostrarProductos(categoria)" v-for="categoria of categorias">{{ categoria }}</button>
                <button v-if="categorias.length % 2 == 1">😎</button>
            </div>
            <div id="productos" v-if="estado == 'productos'">
                <button @click="mostrarProducto(producto)" v-for="producto of productosF">{{ producto.name }}</button>
                <button v-if="productos.length % 2 == 1">😎</button>
            </div>
            <div v-if="estado == 'venta'" id="venta">
                <h2>Producto: {{ productoPedido.name }}</h2>
                <p>Precio: ${{ productoPedido.price }}</p>
                <p>Cantidad: {{ productoPedido.amount }}</p>
                <button @click="productoPedido.plus" class="btn btn-secondary">+</button>
                <button @click="productoPedido.minus" class="btn btn-secondary">-</button>
                <button :disabled="!productoPedido.amount" @click="agregarProducto" class="btn btn-secondary">Agregar</button>
            </div>
        </main>
        <footer>
            <h2>Total: ${{ total }}</h2>
        </footer>
    </div>
</template>
<style scoped>
.ventas {
    color: white;
    background-color: red;
}

header {
    background-color: green;
    min-height: 5vh;
    padding: 0.5rem;
    width: 100vw;
    position: sticky;
    top: 0;
}

#volver {
    width: 100vw;
    height: 3rem;
}

main {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5vh;
}

button {
    height: 10rem;
    width: 50%;
}

#venta {
    width: 100vw;
}

#venta button {
    width: 5rem;
    height: 5rem;
}

footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color: green;
    min-height: 5vh;
    padding: 0.5rem;
}
</style>