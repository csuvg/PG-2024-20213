<template>
    <HeaderApp class="Header"/>
    <body>
        <div class="UpperSide">
            <BackBtn class="back" ruta="/Configuraciones" />
            <FontsCat class="headerh7" type="subtitulo1" text="Listado de Usuarios"/>
        </div>

        <div class="ContainerMain">
            <div class="Container">
                <TableHeadersVue class="ContainerHT" :options="['Nombre de usuario','','Correo electronico','','Rol','']" />
                <div class="InfoConteiner">
                <div class="RowInfo2"  v-for="(element, index) in InfoArr" :key="index" style="cursor: pointer;">
                  <fa class='iconX' icon="fa-solid fa-x" pull="left" @click="EliminarUser(element)" />
                  <FontsCat   type="Text_B"  :text="element[2]" @click="mandar(element)"/>
                  <FontsCat   type="Text_B"  :text="element[1]" @click="mandar(element)"/>
                  <FontsCat   type="Text_B"  :text="element[0].toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase())" @click="mandar(element)" />
                </div>
              </div>
            </div>
        </div>
      <Footer/>
    </body> 
</template>

<style scoped lang="scss">
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

.Container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 80%;
    flex-direction: column;
    margin-top: 2%;
    margin-bottom: 2%;
}

.ContainerMain{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.ContainerHT {
    width: 80%;
}
 
.InfoConteiner{
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden; 
    direction: rtl;
    width: 80%;
  }
  
.RowInfo2 {
    display: grid;
    grid-template-columns: 2fr 14fr 18fr 18fr;
    align-items: center;
    justify-content: space-evenly;
    justify-items: stretch;
    margin-top: -1%;
    margin-left: 0%;
    column-gap: 5px;
  }
  // Style del scrollbar 
  .InfoConteiner::-webkit-scrollbar {
  width: 5px; /* Change size of scrollbar */
  height: auto;
  }
  
  .InfoConteiner::-webkit-scrollbar-thumb {
   background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
   border-radius: 5px; /* Radio de borde del thumb */
  }

  .iconX{
    color:#ad1414;
  }

</style>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import HeaderApp from '@/components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';
import BackBtn from '../components/BackBtn.vue';
import TableHeadersVue from '../components/TableHeaders.vue';
import inputDropDown from '../components/inputDropDown.vue'; 


import { addDoc, doc, getDocs, getDoc, deleteDoc } from 'firebase/firestore';
import { userRef, auth } from '../firebajse'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import InputDropDown from '../components/inputDropDown.vue';

export default defineComponent({
  name: 'CrearUsuarioView',
  emits: ['loggedIn'],
  components: {
    HeaderApp,
    BackBtn,
    FontsCat,
    Footer,
    TableHeadersVue,
  },

  data () {
    return {
      InfoArr: [] as string[][],
    }
  },

  methods: {
    informacion () {
      const data = this.UserPeople
      let arrIn: string[][] = [];
      data.forEach((element) => {
        const info_elem = element.split('/');
        arrIn.push(info_elem);
      });

      this.InfoArr = arrIn
    },

    mandar (element: string[]) {
      const id = element[3].trim()
      this.$router.push({
        name: "actualizarUsuario",
        params: { idDocumento: id }
      });
    },
    
    async EliminarUser (element: string[]) {
      const id = element[3].trim();
      const correo = element[1].trim();

      try {
        const oldDoc = doc(userRef, id);
        const docSnapshot = await getDoc(oldDoc);

        if (!docSnapshot.exists()) {
          this.ToastNoti("Usuario no encontrado");
        } else { 
          await deleteDoc(oldDoc); // Elimina el documento del Firestore
          this.ToastSucces("Usuario eliminado con éxito");
          window.location.reload(); // Recarga la página
        }
      } catch (error) {
        this.ToastError("Error al eliminar la cuenta");
      }
    },

    ToastSucces (title2: string) {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
        icon: "success",
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        title: title2,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }
      Swal.fire(Toast);
    },

    ToastNoti (title1: string) {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 4000,
        icon: "info",
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        title: title1,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }
      Swal.fire(Toast);
    },

    ToastError (title1: string) {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
        icon: "error",
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        title: title1,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }
      Swal.fire(Toast);
    },
  },

  setup (props: any) {
    const UserPeople = ref<string[]>([]);
    const dataUser = async () => {
      const instance = getCurrentInstance();
      if (!instance) return; // Salir de la función si no hay instancia
      
      const { proxy } = instance as unknown as { proxy: { informacion: () => void } };
      
      try {
        Swal.fire({
          title: 'Cargando datos...',
          html: 'Porfavor espere...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        const querySnapshot = await getDocs(userRef);
        const arrUser = querySnapshot.docs.map(doc => ({
          id: doc.id,
          user: doc.data().usuario,
          email: doc.data().correo,
          rol: doc.data().rol
        }))

        UserPeople.value = arrUser.map(item => `${item.user} / ${item.email} / ${item.rol} / ${item.id}`);     
        if (proxy) {
          proxy.informacion();
        }
        Swal.close();
      } catch (error) {
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "error",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Ocurrio un error, intente nuevamente",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
      }
    };
    onMounted(() => {
      dataUser();
    });

    return {
      UserPeople
    }
  }

});
</script>
