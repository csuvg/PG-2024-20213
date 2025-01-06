<template>
    <div class="agendar">
      <Header class="Header"/>
      <div class="ConteinerPrincipal">
        <div class = "UpperSide1">
          <BackBtn class ="back" ruta="/buscar" />
          <FontsCat class ="headerh1" type="subtitulo1" :text="fullNameUp"></FontsCat>
        </div>
        <div class="BodyConteinter">
          <SubMenu3 class="SubM3" :VistaFicha="collection" :idDocumento="id_temp"/>
          <div class="TextConteiner">
            <div class ="HeaderTable">
              <FontsCat class="fuente" text='Fecha de consulta' type="BoldText" :for="`opt${index}`" />
              <FontsCat class="fuente" text='Diagnostico' type="BoldText" :for="`opt${index}`" />
              <FontsCat class="fuente" text='Medicamento recetado' type="BoldText" :for="`opt${index}`" />
            </div>
             <div class="InfoConteiner">
                <div class="RowInfo"  v-for="(element, index) in InfoArr" :key="index" @click="mandar(element)" style="cursor: pointer;">
                  <FontsCat   type="Text_B"  :text="element[2]"/>
                  <FontsCat   type="Text_B"  :text="element[1]"/>
                  <FontsCat   type="Text_B"  :text="element[0]" style="margin-left: 20px;"/>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
</template>
  
<style scoped lang="scss">

  
  .headerh1{
    margin-left: 5%;
    margin-top: 4%;
  }
  
  .UpperSide1{
    display:flex;
    align-items: center;
    justify-content: start;
    margin-left: 10%;
    width: auto;
    margin-top: 1%;
  }
  
  .BodyConteinter{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .TextConteiner{
    margin-top: 3%;
    width: 90%;
  }
  
  .HeaderTable {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  
  .SubM3{
    margin-top: 2%;
  }
  
  .fuente{
    color: #000000;
  }
  
  .InfoConteiner{
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    direction: rtl;
    justify-items: center;
    display: flex;
    flex-direction: column;
    align-items: center
  }
  
  .RowInfo {
    display: grid;
    grid-template-columns: 18fr 15fr 15fr;
    align-items: center;
    justify-content: space-evenly;
    justify-items: end;
    margin-top: -1%;
    margin-left: 10%;
    width: 80%;
    column-gap: 5%;
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
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, getCurrentInstance } from 'vue';
import Header from '../components/HeaderApp.vue';
import FontsCat from '../components/FontsCat.vue';
import Footer from '../components/FooterApp.vue';
import BackBtn from '../components/BackBtn.vue';
import SubMenu3 from '../components/SubMenu3.vue'; 

import { pediaRef, CitaActualRef } from "../firebajse";
import { addDoc, doc, getDocFromCache, getDocs, where, query, QuerySnapshot } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import MostrarCitaActual from './MostrarCitaActual.vue';

const externalState = reactive({
  infoObteined: []
});


export default defineComponent({
  name: 'HistorialMedico',
  components: {
    SubMenu3,
    Header,
    Footer,
    FontsCat,
    BackBtn,
  },
  props: {
    idDocumento: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      InfoArr: [] as string[][],
      fullNameUp: '' as string, 
      collection: '' as string, 
      index: 0 as number,
    }
  },

  setup (props: any) {
    const id_temp = ref(props.idDocumento);
    const infoObteined = ref<string[]>([]);
    
    const obtenerData = async () => {
      const instance = getCurrentInstance();
      if (!instance) return; // Salir de la función si no hay instancia

      const { proxy } = instance as unknown as { proxy: { DataArray: () => void } };
      try {
        Swal.fire({
          title: 'Cargando datos...',
          html: 'Porfavor espere...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });
        const querySnapshot = await getDocs(query(CitaActualRef, where('__name__', '==', props.idDocumento)));
        const arrData = querySnapshot.docs.map(doc => ({
          codigo: doc.id,
          fecha: doc.data().Fecha_CA,
          diagnostico: doc.data().diagnostico_CA,
          receta: doc.data().receta_CA,
        })
        );
        infoObteined.value = arrData.map(item => `${item.fecha} / ${item.diagnostico} / ${item.receta}`);
        if (proxy) {
          proxy.DataArray();
        }
        Swal.close(); 
      } catch (error) {
        const ToastE: SweetAlertOptions = {
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
        Swal.fire(ToastE);
      }
    }

    onMounted(() => {
      obtenerData();
    });

    return {
      infoObteined,
      id_temp,
    };
  },

  methods: {
    DataArray () {
      this.getName()
      // Se obtiene el array con la info
      const CA_array = this.infoObteined;
      let arrIn: string[][] = [];
      let arrFinal: string[][] = [];
      // let partes = CA_array[0].split('/');
      CA_array.forEach((element) => {
        let info_elem = element.split('/');
        for (let i = 0; i < info_elem.length; i++) {
          let info_elem2 = info_elem[i].split(',');
          arrIn.push(info_elem2);
        }
      });
      for (let i = 0; i < arrIn[0].length; i++) {
        let primerosElementos = arrIn.reduce((acc, subArr) => {
          acc.push(subArr[i].trim());
          return acc;
        }, []);
        arrFinal.push(primerosElementos);
      }
      this.InfoArr = arrFinal
    },
    mandar (element: string[]) {
      // acceder a los datos.
      const fecha = element[0].trim();
      this.$router.push({
        name: 'MostrarCA',
        params: {
          idDocumento: this.id_temp, 
          Fecha: fecha
        }
      })
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
    async getName () {
      const id = this.id_temp;
      const querySnapshot = await getDocs(query(pediaRef, where('__name__', '==', id)));
      if (!querySnapshot.empty) {
        const docSnapshot = querySnapshot.docs[0]; // Suponiendo que solo hay un documento con ese ID
        const name = docSnapshot.data().NombresPa;
        const lastname = docSnapshot.data().ApellidosPa;
        
        const fullName = lastname.concat(' , ', name);
        this.fullNameUp = fullName.toUpperCase()
        this.collection = 'pediatria'
      }
    },
  }
});
</script>
