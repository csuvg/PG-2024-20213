<template>
    <HeaderApp class="Header"/>
    <body>
      <div class="UpperSide">
            <BackBtn class="back" ruta="/Configuraciones" />
            <FontsCat class="headerh7" type="subtitulo1" text="Control de acceso a vistas"/>
      </div>
      <div class="ConteinerInfo">
         <div class="TableConteiner">
            <TableHeadersVue :options="['Nombre de la vista', 'Usuarios Autorizados' ]" />
              <div class="InfoConteiner">
                <div class="RowInfo"  v-for="(element, index) in InfoArr" :key="index">
                  <FontsCat   type="Text_B"  :text="element[1]" />
                  <FontsCat   type="Text_B"  :text="element[0].toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase())" />
                </div>
              </div> 
         </div> 
      </div>
    </body>
    <Footer class="footer"/>  
</template>

<style scoped lang="scss">
.footer{
  margin-top: 1%;
}

.UpperSide{
  display:flex;
  align-items: start;
  justify-content: start;
  margin-left: 15%;
  width: auto;
}

.back{
  margin-top: 1.5%;
}

.headerh7{
    margin-top: 20px;
    margin-left: 20px;
}

.ConteinerInfo{
 height: 330px;
 display: flex;
 justify-content: center;
}

.TableConteiner{
  width: 80%;
}

.InfoConteiner{
    height: 90px;
    overflow-y: auto;
    overflow-x: hidden; 
    width: 80%;
    margin-left: 3%;
    display: grid;
}

.RowInfo {
    display: grid;
    grid-template-columns: repeat(2, 4fr);
    align-items: center;
    justify-content: space-evenly;
    justify-items: stretch;
    margin-top: -1%;
    margin-left: 0%;
    column-gap: 5px;
  }
</style>

<script lang="ts"> 
import { defineComponent, ref, onMounted } from 'vue';
import HeaderApp from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';
import TableHeadersVue from '../components/TableHeaders.vue';
import ButtonApp from '../components/ButtonsApp.vue';
import BackBtn from '../components/BackBtn.vue';

import { addDoc, doc, getDoc, updateDoc, query } from 'firebase/firestore';
import { FinanzasRef, ConfiRef } from '../firebajse'; 

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

export default defineComponent({
  name: 'ControldeVistas',
  components: {
    HeaderApp,
    Footer,
    BackBtn,
    FontsCat,
    TableHeadersVue
  }, 
  data () {
    return {
      InfoArr: [['k', 'k']],
    }
  }, 
}); 
</script>
