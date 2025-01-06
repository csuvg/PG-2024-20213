<template>
    <HeaderApp class="Header"/>
    <body>
        <div class="UpperSide">
            <BackBtn class="back" ruta="/Configuraciones" />
            <FontsCat class="headerh7" type="subtitulo1" text="Listado de seguros"/>
        </div>

        <div class="ContainerMain">
            <div class="Container">
                <TableHeadersVue class="ContainerHT" :options="['Nombre del seguro','','Precio por consulta', '','']" />
                <div class="InfoConteiner">
                <div class="RowInfo2"  v-for="(element, index) in InfoArr" :key="index" style="cursor: pointer;">
                  <fa class='iconX' icon="fa-solid fa-x" pull="left" @click="DeteSeg(element)" style="color: red;" />
                  <fa class='iconPe' v-if="Act === false"  icon="fa-solid fa-pen" pull="left" @click="Act = true" />
                  <fa class='iconc' v-if="Act === true"  icon="fa-solid fa-check" pull="left" @click="UpdateSeg(element)" style="color: #55A112;"/>
                  <FontsCat v-if="Act === false" type="Text_B"  :text="`Q. ${element[1]}`"/>
                  <InputBox class= "inpt inptM2" v-if="Act === true" placeholder="Ingrese monto" minWidth="100%" maxWidth="40%" margin-left="0%" v-model="element[1]" />
                  <FontsCat   type="Text_B"  :text="element[0]"/>
                </div>
              </div>
            </div>
        </div>

        <div class="ContainerMain">
          <div class="Conteiner2">
            <div class="Subt1" >
              <FontsCat type="Text_N"  text="Agregar un nuevo seguro"/>
            </div>
              <div class="RowInfo3">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del seguro" minWidth="100%" maxWidth="80%" margin-left="110px" v-model="N_Seguro" />
                  <InputBox class= "inpt inptM2" placeholder="Ingrese monto" minWidth="100%" maxWidth="40%" margin-left="-80px" v-model="M_seguro" @keypress.enter="addSeg()" />
                  <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addSeg()" style="margin-left: -250%; color: #55A112;"/>
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

.Conteiner2{
  display: flex;
  flex-direction: column;
  width: 90%;
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

.Subt1 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10%;
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
    grid-template-columns:  5fr 5fr 18fr 18fr;
    align-items: center;
    justify-content: space-evenly;
    justify-items: stretch;
    margin-top: 0%;
    margin-left: 0%;
    column-gap: 5px;
  }

  .RowInfo3 {
    display: grid;
    grid-template-columns: 18fr 18fr 5fr;
    align-items: center;
    justify-content: space-evenly;
    justify-items: stretch;
    margin-top: 0%;
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
  .iconP{
    font-size: 25px;
  }

</style>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import HeaderApp from '@/components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';
import BackBtn from '../components/BackBtn.vue';
import TableHeadersVue from '../components/TableHeaders.vue';
import InputBox from '../components/InputBox.vue'; 


import { addDoc, doc, getDocs, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ConfiRef, auth } from '../firebajse'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import InputDropDown from '../components/inputDropDown.vue';

export default defineComponent({
  name: 'SwgurosInfo',
  components: {
    HeaderApp,
    BackBtn,
    FontsCat,
    Footer,
    TableHeadersVue,
    InputBox
  },

  data () {
    return {
      InfoArr: [] as string[][],
      N_Seguro: '' as string,
      M_seguro: '' as string,
      NA_seg: [] as string[],
      MA_seg: [] as string[],
      Act: false,
    }
  },

  methods: {
    informacion () {
      const dataNS = this.NameSeguro
      const dataMS = this.MontoSeguro
      let arrIn: string[][] = [];

      
      for (let i = 0; i < dataNS[0].length; i++) {
        const nsEl = dataNS[0][i]; 
        const msEl = dataMS[0][i]; 
        arrIn.push([nsEl, msEl])
        this.NA_seg.push(nsEl)
        this.MA_seg.push(msEl)
      }
      this.InfoArr = arrIn
    },

    async addSeg () {
      if (this.N_Seguro !== '' && this.M_seguro !== '') {
        this.NA_seg.push(this.N_Seguro);
        this.MA_seg.push(this.M_seguro);
        
        const docRef = doc(ConfiRef, "Seguros")
        await updateDoc(docRef, {
          nombre_S: this.NA_seg,
          precio_S: this.MA_seg
        })
        this.ToastSucces('El seguro ha sido añadido exitosamente')
        window.location.reload();
      } else {
        this.ToastError("No ha sido posible agregar el seguro")
      }
    },

    async UpdateSeg (element: string[]) {
      const name = element[0] 
      const index = this.NA_seg.indexOf(name);
      if (index != -1) {
        this.MA_seg[index] = element[1] 
        const docRef = doc(ConfiRef, "Seguros")
        await updateDoc(docRef, {
          nombre_S: this.NA_seg,
          precio_S: this.MA_seg
        })
        this.ToastSucces('El seguro ha sido actualizado exitosamente')
        window.location.reload();
        this.Act = false;
      } else {
        this.ToastError("No ha sido posible actualizar el seguro")
      }
    },

    async DeteSeg (element: string[]) {
      const name = element[0] 
      const index = this.NA_seg.indexOf(name);

      if (index != -1) {
        this.NA_seg.splice(index, 1);
        this.MA_seg.splice(index, 1);

        const docRef = doc(ConfiRef, "Seguros")
        await updateDoc(docRef, {
          nombre_S: this.NA_seg,
          precio_S: this.MA_seg
        })
        this.ToastSucces('El seguro ha sido eliminado exitosamente')
        window.location.reload();
      } else {
        this.ToastError("No ha sido posible eliminar el seguro")
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
    const NameSeguro = ref<string[]>([]);
    const MontoSeguro = ref<string[]>([]);
    const ListSeguros = ref<string[]>([]);

    const dataSeguros = async () => {
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
        const docRef = doc(ConfiRef, 'Seguros')
        const querySnapshot = await getDoc(docRef)

        if (querySnapshot.exists()) {
          const data = querySnapshot.data();
          const name = data.nombre_S
          const valor = data.precio_S

          NameSeguro.value.push(name);
          MontoSeguro.value.push(valor);
        }

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
      dataSeguros();
    });

    return {
      NameSeguro,
      MontoSeguro,
    }
  }

});
</script>
