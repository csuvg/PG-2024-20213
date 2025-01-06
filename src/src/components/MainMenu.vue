// ----------- HTML PART ---------------------
<template>
    <div class= "ContainerMenu">
        <div class ="lines"/>
        <div class="pairMenu" ref="agendaMenu" @click="irALaRuta('/agendar')">
            <fa class='icons' icon="fa-solid fa-calendar-days" pull="left" />
            <FontsCat class= 'Fcat' text="Agenda" type="WhiteText" />
        </div>
        <div class ="lines"/>

        <div class="pairMenu"  ref="expedientesMenu" @click="toggleDropdown('expedientesMenu')">
            <fa class='icons' icon="fa-users" pull="left" />
            <FontsCat class= 'Fcat' text="Expedientes" type="WhiteText" />
        </div>
        <div v-if="showExpedientes" class="dropdownContent"> 
              <FontsCat class="Fsub" text="Buscar expediente" type="Text_N" @click="irALaRuta('/buscar')"/>
              <FontsCat class="Fsub" text="Crear nuevo expediente" type="Text_N" @click="irALaRuta('/ficha-medica')"/>
        </div>
        <div class ="lines"/>

        <div class="pairMenu" ref="contaMenu" @click="toggleDropdown('contaMenu')">
            <fa class='icons' icon="fa-credit-card" pull="left" />
            <FontsCat class= 'Fcat' text="Finanzas" type="WhiteText" />
        </div>
        <div v-if="showConta" class="dropdownContent">
              <FontsCat class="Fsub" text="Caja del día" type="Text_N" @click="irALaRuta('/caja-dia')"/>
              <FontsCat class="Fsub" text="Realizar un cobro" type="Text_N" @click="irALaRuta('/realizar-cobro')"/>
              <FontsCat class="Fsub" text="Historial de ganancias" type="Text_N" @click="irALaRuta('/historial-ganancias')" />
        </div>
        <div class ="lines"/>
        <div class="pairMenu" ref="ConfigMenu" @click="irALaRuta('/Configuraciones')" >
            <fa class='icons' icon="fa-cog" pull="left" />
            <FontsCat class= 'Fcat' text="Ajustes" type="WhiteText" />
        </div>
        <div class ="lines"/>
        <div class="pairMenu">
            <fa class='icons' icon="right-from-bracket" pull="left"/>
            <FontsCat class= 'Fcat' text="Salir" type="WhiteText" @click="irALaRuta('/'), logOut()"/>
        </div>
        <div class ="lines"/>
    </div>
</template>

// ----------- STYLE PART ---------------------
<style scoped lang="scss">

.Fcat{
    font-weight: 500;
    margin-left: 15px;
}
.Fsub{
    margin-top: 2%;
    margin-bottom: 3%;
    margin-left: 15px;
    cursor: pointer;
}
.pairMenu{
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    align-items: center;
    width: 80%;
    cursor: pointer;
    padding: 2.5%;
}
.icons{
    color:white;
    height:35px;
    width: auto;
}
.ContainerMenu{
    display: flex;
    overflow: hidden;
    border-radius: 10px;
    background: #DC7829;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    opacity: 0.80;
}

.lines{
  border: 1px solid #AE3C2D;
  width: 95%;
}

.dropdownContent{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content:flex-start;
}
@media screen and (min-width: 601px) {
  .ContainerMenu{
    width: 250px;
    height: 530px;
    margin-left: 35px ;
}
}

@media screen and (max-width: 500px) {
  .ContainerMenu{
    width: 300px;
    height: 500px;
    padding: 5px ;
}
}

</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent } from 'vue';
import FontsCat from './FontsCat.vue';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

// Export component
export default defineComponent({
  name: 'MainMenu',
  // Params to be used
  components: {
    FontsCat,
  },
  data () {
    return {
      showAgenda: false, // Para controlar la visualización del desplegable de Agenda
      showExpedientes: false,
      showConta: false,
      showVentas: false,
      showConfig: false,
    };
  },
  methods: {
    toggleDropdown (menuRef: string) {
      // Usa refs para controlar cada desplegable individualmente
      if (menuRef === 'agendaMenu') {
        this.showAgenda = !this.showAgenda;
        this.showExpedientes = false;
        this.showConta = false;
        this.showVentas = false;
        this.showConfig = false;
      } else if (menuRef === 'expedientesMenu') {
        this.showExpedientes = !this.showExpedientes;
        this.showAgenda = false;
        this.showConta = false;
        this.showVentas = false;
        this.showConfig = false;
      } else if (menuRef === 'contaMenu') {
        this.showConta = !this.showConta;
        this.showAgenda = false;
        this.showVentas = false;
        this.showConfig = false;
        this.showExpedientes = false;
      } else if (menuRef === 'VentasMenu') {
        this.showVentas = !this.showVentas;
        this.showConfig = false;
        this.showAgenda = false;
        this.showConta = false;
        this.showExpedientes = false;
      } else if (menuRef === 'ConfigMenu') {
        this.showConfig = !this.showConfig;
        this.showAgenda = false;
        this.showConta = false;
        this.showVentas = false;
        this.showExpedientes = false;
      } 
    },
    irALaRuta (ruta: string) {
      // Navegar a la ruta proporcionada utilizando Vue Router
      this.$router.push(ruta);
    },

    logOut () {
      const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
    }
  },
});
</script>
