<template>
    <div class="header-container">
      <div class="content">
        <img src="@/assets/logo_t2.png" alt="Logo de la aplicacion" class="logoApp" />
        <FontsCat class ="headerh1" type="titulo" text='Clinica " Just Kids "'></FontsCat>
        <div  class="circuloP"></div>
        <div  class="circuloG"></div>
      </div>
      <!-- ... -->
    </div>
</template>
<style scoped lang="scss">
   .header-container {
    background-color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 1em;
    z-index: -1;
    position: relative; /* Establece un contexto para el posicionamiento absoluto */
    overflow: hidden; 
  }

  .circuloG {
    width: 125px;
    height: 125px;
    background-color: #F14457;
    border-radius: 50%;
    position: absolute;
    top: -10px;
    right: -28px; /* Ajusta la posición según sea necesario */
  }
  .circuloP {
    width: 80px;
    height: 80px;
    background-color: #E5BE01;
    border-radius: 50%;
    position: absolute;
    top: -15px;
    right: 68px; /* Ajusta la posición según sea necesario */
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap; /* Permite que los elementos se envuelvan cuando la pantalla es pequeña */
    width: 80%;
  }

  .logoApp {
    max-width: 100%;
    height: auto;
    max-height: 11em;
    margin-left: -17%;
  }

  .headerh1 {
    max-width: 100%;
    border-bottom: 2px solid #333;
    width: 45%;
    margin-left: -7%;
    box-sizing: border-box;
  }

  //Biger screen
@media screen and (min-width: 601px) {
 .content {
      align-items: center;
    }

    .logoApp {
      margin-right: 19.2%; /* Restablece el margen derecho en pantallas más grandes */
      order: -1; /* Cambia el orden para que la imagen esté al principio en pantallas más grandes */
    }
}

//Smaller screen
@media screen and (max-width: 600px) {
  .logoApp {
      max-width: 100%;
      height: 5em;
      margin-left: -0px;
      margin-right: 1em; /* Añade margen derecho para separar la imagen del texto en pantallas pequeñas */
    }

  .content {
    width: 100%;
  }

  .headerh1 {
    margin-left: 0px;
    box-sizing: border-box;
    margin-right: 1em; /* Añade margen derecho para separar la imagen del texto en pantallas pequeñas */
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import FontsCat from './FontsCat.vue'; // immport fontscat
export default defineComponent({
  name: 'Header-app',
  components: {
    FontsCat
  }
});
</script>
