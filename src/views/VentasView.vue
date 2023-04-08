<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useCategoryStore } from '../store/categories'
import { useBarStore } from '../store/bars';

const barStore = useBarStore()

if (!barStore.bar) {
    barStore.barSelect(JSON.parse(localStorage.getItem('bar')))
}

onMounted(() => {
    window.addEventListener('popstate', () => {
        alert('No se puede volver hacia atras!')
    })
})

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
    id: 0,
    name: '',
    price: 0,
    amount: 1,
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
    },
    reset() {

    }
})

function mostrarProductos(index) {
    indiceCategoria.value = index
    estado.value = 'productos'
    /* productosF.value = productos.value.filter(prod => prod.category == categoria) */
}

function mostrarProducto(producto) {
    productoPedido.value.name = producto.name
    productoPedido.value.price = producto.price
    productoPedido.value.calc()
    estado.value = 'venta'
}

function agregarProducto() {
    let newProduct = {
        name: productoPedido.value.name,
        price: productoPedido.value.price,
        cantidad: productoPedido.value.amount,
        total: productoPedido.value.total,
    }
    pedido.value.push(newProduct)
    Swal.fire({
        title: 'Exito!',
        text: 'Producto agregado correctamente.',
        icon: 'success',
        showConfirmButton: false,
    });
    volver()
}

function verPedido() {
    estado.value = 'pedido'
}

function finalizarPedido() {
    Swal.fire({
        title: 'Finalizar pedido',
        html: `<p>Total a pagar: ${total.value}<p/><p>Metodo de pago: Efectivo<p/>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Pagar!'
    }).then((result) => {
        if (result.isConfirmed) {
            estado.value = 'categorias'
            pedido.value = []
            Swal.fire({
                title: 'Exito!',
                text: 'Compra realizada.',
                icon: 'success',
                showConfirmButton: false,
            });
        }
    })
    /* printTicket() */
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

function printTicket() {
    // Crear un elemento HTML con el contenido que deseas imprimir
    const printContent = document.createElement("div");
    printContent.innerHTML = `
    <h1>Ticket de compra</h1>
    <p>Detalles de la compra:</p>
    <ul>
      <li>Producto 1</li>
      <li>Producto 2</li>
      <li>Producto 3</li>
    </ul>
  `;

    // Crear un objeto Window para la impresión
    const printWindow = window.open("", "Print");

    // Agregar el contenido a la ventana de impresión
    printWindow.document.body.appendChild(printContent);

    // Imprimir el contenido
    printWindow.print();

    // Cerrar la ventana de impresión
    printWindow.close();
}
</script>

<template>
    <div class="ventana ventas py-5">
        <header>
            <h1 style="text-align: center;">Ventas</h1>
            <h3>{{ barStore.bar.name }}</h3>
        </header>
        <main>
            <button @click="volver" id="volver" class="neon-button">Volver</button>
            <div class="input-group d-flex justify-content-center my-3">
                <div class="form-outline">
                    <input type="search" id="form1" class="form-control rounded-0 rounded-start" />
                </div>
                <button type="button" class="btn" style="background-color:#ba80e6 ;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
            </div>
            <div class="d-flex justify-content-around flex-wrap w-100" v-if="estado == 'categorias'" id="categorias">
                <button class=" btn-category " @click="mostrarProductos(indice)"
                    v-for="(categoria, indice) of categoryStore.categories">{{
                        categoria.name }}</button>
            </div>
            <div id="productos" v-if="estado == 'productos'" class="d-flex flex-wrap justify-content-center gap-3">
                <div @click="mostrarProducto(producto)" class="card" style="max-width: 540px;"
                    v-for="producto in categoryStore.categories[indiceCategoria].products">
                    <img class="img-fluid rounded-top"
                        src="data:image/jpeg;base64,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"
                        alt="">
                    <div class="card-body">
                        <h5 class="card-title" style="text-align: center;">{{ producto.name }}</h5>
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
            <div v-if="estado == 'pedido'">
                <h2>Pedido:</h2>
                <h2>Medio de pago</h2>
                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="btnradio1">Efectivo</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio2">Tarjeta</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio3">Transferencia</label>
                </div>
                <div class="d-flex flex-wrap">
                    <div class="card" v-for="producto in pedido">
                        <h2>{{ producto.name }}</h2>
                        <h2>Precio unitario: {{ producto.price }}</h2>
                        <h2>Cantidad: {{ producto.cantidad }}</h2>
                        <h2>Total:{{ producto.total }}</h2>
                    </div>
                </div>
            </div>
        </main>
        <footer class="d-flex align-items-center justify-content-between">
            <h2>Total: ${{ total }}</h2>
            <button :disabled="!pedido.length" v-if="estado != 'pedido'" @click="verPedido" class="btn btn-warning">Ver
                pedido</button>
            <button v-else class="btn btn-success" @click="finalizarPedido">Vender</button>
        </footer>
    </div>
</template>
<style scoped>
/* *{
    outline: 1px solid red;
} */
.ventas {
    background-color: #f8f2fc;
    min-height: 100vh;
    min-width: 90vw;
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

.card {
    min-width: 290px;
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
}
</style>