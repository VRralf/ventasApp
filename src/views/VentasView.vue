<script setup>
import { ref, computed, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useCategoryStore } from '../store/categories'
import { useBarStore } from '../store/bars';
import ItemCategory from '../components/ItemCategory.vue';
import ItemProduct from '../components/ItemProduct.vue';
import ItemProductExpand from '../components/ItemProductExpand.vue';

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
])

const total = computed(() => {
    return pedido.value.reduce((acc, prod) => {
        return acc + prod.total
    }, 0)
})

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
            <div class="d-flex justify-content-around flex-wrap w-100 p-3 gap-3" v-if="estado == 'categorias'" id="categorias">
                <ItemCategory :category="categoria" @click="mostrarProductos(indice)" v-for="(categoria, indice) of categoryStore.categories"/>
            </div>
            <div id="productos" v-if="estado == 'productos'" class="d-flex flex-wrap justify-content-center gap-3">
                <ItemProduct @click="mostrarProducto(producto)" :product="producto" v-for="producto in categoryStore.categories[indiceCategoria].products"/>
            </div>
            <div v-if="estado == 'venta'" id="venta" class="card mb-3 mt-5" style="max-width: 540px;">
                <!-- <div class="row g-0">
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
                </div> -->
                <ItemProductExpand @agregar="agregarProducto" :product="productoPedido"/>
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



#venta button {
    width: 6rem;
    height: 2rem;
    font-size: 16px;
    font-weight: 600;
}

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