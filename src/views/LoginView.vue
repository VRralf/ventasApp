<template>
    <section class="vh-100 gradient-custom" style=" background: linear-gradient(172deg, rgba(255,172,0,1) 0%, rgba(255,255,255,1) 100%);">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card w-100" style="border-radius: 1rem;  background: linear-gradient(172deg, rgba(255,172,0,1) 0%, rgba(255,255,255,1) 100%); border: none;">
                        <div class="card-body p-5 text-center">

                            <div class="mb-md-5 mt-md-4 pb-5">

                                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                <h4 class="text-white mb-5">Porfavor ingrese usuario!</h4>

                                <div class="form-outline form-white mb-4">
                                    <input type="text" id="typeEmailX" v-model="usuario"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="typeEmailX">Usuario</label>
                                </div>

                                <div class="form-outline form-white mb-4">
                                    <input type="password" id="typePasswordX" v-model="password"
                                        class="form-control form-control-lg" />
                                    <label class="form-label" for="typePasswordX">Contraseña</label>
                                </div>

                                <button @click="login"  class="btn btn-outline btn-lg px-5" type="submit" style="border:solid .5px; border-radius: 1px;">Login</button> 
                                                                 

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  
 
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2'



const usuario = ref('')
const password = ref('')


function login() {
    if (usuario.value == 'admin' && password.value == 'admin') {
        window.location.href = '/home'
    } else{
        mostrarSweetAlert()
    }

}
function mostrarSweetAlert() {
    Swal.fire({
      title: 'Ingreso',
      text: 'Ahí lo tenes al pelotudo!',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
  }


</script>
<style>

.container{
 left: 0;
  min-height: 100vh;
  min-width: 100vw;
}
</style>

