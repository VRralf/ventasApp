<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const usuario = ref('Fernanda')
const barras = ref([
  'BARRA 1',
  'BARRA 2',
  'BARRA 3',
  'BARRA 4',
  'BARRA 5',
  'BARRA 6',
  'BARRA 7',
  'BARRA 8',
])

function atender(barra) {
  Swal.fire({
    title: 'Seleccion:',
    text: 'Atender ' + barra,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, atender!'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '/ventas'
    }
  })
}
</script>

<template>
 <!-- <nav class="navbar navbar-dark bg-dark" aria-label="First navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ usuario }}</a>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01"
        aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse collapse" id="navbarsExample01" style="">
        <ul class="navbar-nav me-auto mb-2">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>       
      </div>
    </div>
  </nav>  -->
  <div class="container py-5 h-100">
    <div class="d-flex justify-content-center flex-column p-3 gap-2" >
      <h2 style="text-align: center;">Selecciona la barra a atender</h2>
      <button @click="atender(barra)" class="btn  fw-bold mb-2 neon-button " v-for= "barra of barras" style=" padding: 20px 30px;">{{ barra }}</button>
    </div>
  </div>
</template>

<style scoped>
.container{
  background-color: #f8f2fc; 
  left: 0;
  min-height: 100vh;
  min-width: 100vw;  
} 
.neon-button {  
 background-color: #391952;
  color: aliceblue;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px; 
 
}





 
</style>