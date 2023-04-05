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
const total = computed(() => {
    return pedido.value.reduce((acc, prod) => {
        return acc + prod.total
    }, 0)
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

function mostrarProductos(categoria) {
    estado.value = 'productos'
    productosF.value = productos.value.filter(prod => prod.category == categoria)
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
    <div class="ventana ventas py-5">
        <header>
            <h1 style="text-align: center;">Ventas</h1>
            <h3>Barra {{ numeroBarra }}</h3>
        </header>
        <main>
            <button @click="volver" id="volver" class=" neon-button">Volver</button>
            <div class="input-group d-flex justify-content-center m-1">
                <div class="form-outline">
                    <input type="search" id="form1" class="form-control" />
                </div>
                <button type="button" class="btn " style="background-color:#ba80e6 ;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
                <!-- <button type="button" class="btn btn-primary">
                            <i class="fas fa-search"></i>
                        </button> -->
            </div>
            <div class="d-flex justify-content-around flex-wrap w-100" v-if="estado == 'categorias'" id="categorias">
                <button class=" btn-category " @click="mostrarProductos(categoria)" v-for="categoria of categorias">{{
                    categoria }}</button>
                <button class=" btn-category " v-if="categorias.length % 2 == 1">😎</button>
            </div>
            <div id="productos" v-if="estado == 'productos'" class="d-flex justify-content-around flex-wrap w-100">
                <div class="card mb-3 " style="max-width: 540px;" v-for="producto of productosF">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://fotos.perfil.com/2019/06/24/4-recetas-de-tragos-para-invierno-744958.jpg"
                                class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body" style="background-color:#ecba92e7 ;">
                                <h5 class="card-title" style="text-align: center;">{{ producto.name }}</h5>
                                <button @click="mostrarProducto(producto)"
                                    style="background-color:#462361 ; color: #ba80e6;border-radius:20px ;">Comprar</button>
                                <button v-if="productos.length % 2 == 1">😎</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="estado == 'venta'" id="venta" class="card mb-3 mt-5" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://fotos.perfil.com/2019/06/24/4-recetas-de-tragos-para-invierno-744958.jpg"
                            class="img-fluid rounded-start h-100" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body" style="background-color:#ecba92e7 ;">
                            <h2 class="card-title" style="text-align: center;">{{ productoPedido.name }}</h2>
                            <h5>${{ productoPedido.price }}</h5>
                            <h5>Cantidad: {{ productoPedido.amount }}</h5>
                            <button @click="productoPedido.plus"
                                style="background-color:#462361 ; color: #ba80e6;border-radius:20px ;"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg></button>
                            <button @click="productoPedido.minus"
                                style="background-color:#462361 ; color: #ba80e6;border-radius:20px ;"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-dash-circle-dotted" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                </svg></button>
                            <button :disabled="!productoPedido.amount" @click="agregarProducto"
                                style="background-color:#462361 ; color: #ba80e6;border-radius:20px ;">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
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
    background-color: #462361;
    color: #ba80e6;
    min-height: 5vh;
    padding: 0.5rem;
    width: 100vw;
    position: absolute;
    top: 0;
    /* position: sticky;
    top: 0;  */
}

.neon-button {
    background-color: #ba80e6;
    color: #462361;
    margin-top: 4rem;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 20px;
    height: 3rem;
    width: 90vw;
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
    flex-wrap: wrap;
    padding-bottom: 5vh;

}

.btn-category {
    background-color: #ecba92e7;
    height: 7rem;
    width: 30%;
    margin: 1rem;
    border-radius: 8px;
    border: none;
}

/* #venta {
    width: 100vw;
} */

#venta button {
    width: 6rem;
    height: 2rem;
    font-size: 16px;
    font-weight: 600;
}

/* #productos {
    margin: 1rem;
}
 */
footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color: #391952;
    color: #ba80e6;
    min-height: 5vh;
    padding: 0.5rem;
}</style>