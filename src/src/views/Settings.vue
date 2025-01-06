<!-- HTML PART --> 
<template>
  <div class="agendar">
    <HeaderApp />
    <div class="BodyContainer">
      <div class="Menu">
          <MainMenu/>
      </div>
      <div class="ContainerSquares">
        <div class="MainTitle">
            <FontsCat class="tituloPage" type="subtitulo1" text="Configuraciones"></FontsCat> 
        </div>
        <div class="ContainerBody">
            <div class="ContainerData">
              <div class="SquareTitle" style="cursor: pointer;">
                <div class="square" style="background-color: #55A112; opacity: 80%;" @click="irALaRuta('/InformacionGeneral')">
                  <fa class='iconConf' icon="circle-info"  />
                </div>
                <FontsCat text="Administración de Clínica" type="Text_B"/>
              </div>
              <div class="SquareTitle" style="cursor: pointer;">
                <div class="square" style="background-color: #F14457; opacity: 80%;"  @click="irALaRuta('/InformacionUsuarios')">
                  <fa class='iconConf' icon="fa-user"  />
                </div>
                <FontsCat text="Administración de Usuarios" type="Text_B"/>
              </div>
              <div class="SquareTitle" style="cursor: pointer;">
                <div class="square" style="background-color: #B57EDC; opacity: 80%;" @click="irALaRuta('/crearUsuario')">
                  <fa class='iconConf' icon="fa-user-plus"  />
                </div>
                <FontsCat text="Registro de Usuarios" type="Text_B"/>
              </div>
              <div class="SquareTitle" style="cursor: pointer;">
                <div class="square" style="background-color: #009FE3; opacity: 80%;" @click="irALaRuta('/ConfigSeguros')">
                  <fa class='iconConf' icon="list"  />
                </div>
                <FontsCat text="Gestión de Aseguradoras" type="Text_B"/>
              </div>
              <!-- <div class="SquareTitle" style="cursor: pointer;">
                <div class="square" style="background-color: #FFD200; opacity: 80%;" @click="irALaRuta('/ControlVistas')">
                  <fa class='iconConf' icon="fa-users-gear"  />
                </div>
                <FontsCat text="Control de Acceso a Vistas" type="Text_B"/>
              </div> -->
              <div class="SquareTitle" style="cursor: pointer;">
                <div class="square" style="background-color: #991d5d; opacity: 80%;" @click="irALaRuta('/ConfigFichas')">
                  <fa class='iconConf' icon="fa-pen-to-square"  />
                </div>
                <FontsCat text="Campos de Expedientes" type="Text_B"/>
              </div>
              
            </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>  
</template>

<style scoped lang="scss">
  .BodyContainer {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .ContainerSquares {
    display: grid;
    width:100%;
    height: 100%;
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 1.5%;
  }
  .tituloPage {
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: -5px;
    margin-left: -0.3%; // corre la parte del titulo 
    width: 100%;
  }

  .ContainerBody{
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .ContainerData {
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    gap: 50px;
    align-items: center;
    justify-content: flex-start;
    
  }
  .square{
    width: 150px;
    height: 150px;
    border-radius: 10px;
    display:flex;
    align-items: center;
    justify-content: center;
    
  }
  .SquareTitle{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .iconConf{
    color:white;
    height:55px;
    width: auto;
  }

  
</style>

<!-- SCRIPT PART-->
<script lang="ts"> 
import { defineComponent } from 'vue';
import HeaderApp from '../components/HeaderApp.vue';
import MainMenu from '../components/MainMenu.vue'; 
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';

//   import { pediaRef, MinterRef, CitaActualRef } from "../firebajse";
import { getDocs, setDoc, deleteDoc, doc, where, query, updateDoc, getDocFromServer, getDoc, collection } from 'firebase/firestore';


export default defineComponent({
  name: 'Settings',
  components: {
    HeaderApp,
    MainMenu,
    Footer,
    FontsCat
  }, 
  methods: {
    irALaRuta (ruta: string) {
      // Navegar a la ruta proporcionada utilizando Vue Router
      this.$router.push(ruta);
    },
  }
}); 
</script>
