<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useUserStore } from '../store/user';
import { useBarStore } from '../store/bars'
import { useRouter } from 'vue-router'


const userStore = useUserStore()
const barStore = useBarStore()
const router = useRouter()

function atender(barra) {
  Swal.fire({
    title: 'Seleccion:',
    text: 'Atender ' + barra.name,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, atender!'
  }).then((result) => {
    if (result.isConfirmed) {
      barStore.barSelect(barra)
      localStorage.setItem('bar',JSON.stringify(barra))
      router.push('/ventas')
    }
  })
}
</script>

<template>
  <div class="container py-5 h-100">
    <div class="d-flex justify-content-center flex-column p-3 gap-2" >
      <h2 style="text-align: center;">Selecciona la barra a atender</h2>
      <button @click="atender(barra)" class="btn  fw-bold mb-2 neon-button " v-for= "barra of barStore.bars" style=" padding: 20px 30px;">{{ barra.name }}</button>
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