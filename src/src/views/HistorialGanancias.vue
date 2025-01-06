<!-- HTML PART -->
<template>
  <div class="agendar">
    <HeaderApp class="Header"/>
    <div class="conteiner">
      <div class="menu">
        <MainMenu class="MenuC"/>
      </div>
      <div class="Contenido"> 
        <div class="MainTitle">
          <FontsCat class="tituloPagina" type="subtitulo1" text="Historial"></FontsCat> 
        </div>
        <div class="DivBuscarConteiner">
          <div class="DivBuscar">
              <InputBox class="Buscar" placeholder="Buscar por medio de un filtro" minWidth="80%" maxWidth="85%" v-model="Search"  @keypress.enter="choseSearch"/>
              <fa class='icon_Search' icon="fas-solid fa-magnifying-glass" pull="left"  @click="choseSearch"/>
          </div> 
        </div>
        <div class="ShowConteiner">
          <div class="TableConteiner">
            <TableHeadersVue :options="['Fecha','','Método de pago','', 'Total']" />
            <div class="InfoConteiner">
              <div class="RowInfo"  v-for="(element, index) in InfoArr" :key="index">
                <FontsCat   type="Text_B"  :text="element[2]"/>
                <FontsCat   type="Text_B"  :text="element[1]"/>
                <FontsCat   type="Text_B"  :text="element[0]"/>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  <Footer/>
  </div>
    
</template>
  
  <!-- STYLE PART -->
<style scoped lang="scss" >
  .conteiner {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .Header {
    margin-bottom: 30px; // margen para abajo
  }
  
  .Contenido {
    display: grid;
    width:100%;
    height: 100%;
    margin-left: 5%;
    margin-right: 3%;
  }
  
  .tituloPagina {
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    // margin-top: -20px;
    margin-left: -0.3%; // corre la parte del titulo 
    width: 100%;
  }
  
  .DivBuscarConteiner{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
  }
  
  .DivBuscar {
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 60fr 4fr ;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0;
    justify-self: stretch;
  }
  
  .icon_Search{
    height: 40%;
    margin-left: -45%;
    cursor: pointer;
  }
  
  .ShowConteiner{
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
  }
  
  .TableConteiner{
    width: 100%;
  }
  
  .InfoConteiner{
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden; 
    direction: rtl;
  }
  
  .RowInfo {
    display: grid;
    grid-template-columns: 20fr 20fr 20fr;
    align-items: center;
    justify-content: space-evenly;
    justify-items: center;
    margin-top: -1%;
    margin-left: 0%;
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
  
  
  //Smaller screen
  @media screen and (max-width: 600px) {
    .conteiner{
      flex-direction: column;
    }
  
    .tituloPagina{
      margin-left: 3%; // corre la parte del titulo 
      width: 100%;
    }
  
    .menu{
      display: flex;
      background: #9e9cb5;
      width: 90%;
      height: 60px;
      padding: 5px ;
      border-radius: 5%;
      overflow-x: hidden;
      overflow-y: auto;
      justify-content: center;
    }
  
    .icon_Search{
      margin-left: -85%;
    }
  
    .AlfabetList{
      display: none;
    }
  
    .RowInfo{
       grid-template-columns: 10fr 10fr 15fr;
       margin-left: 0px;
       gap: 15px 10px;
    }
  
    // Style del scrollbar 
  .menu::-webkit-scrollbar {
    width: 5px; /* Change size of scrollbar */
    height: auto;
  }
  
  .menu::-webkit-scrollbar-thumb {
    background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
    border-radius: 5px; /* Radio de borde del thumb */
  }
  
  }
  
</style>
  
<!-- SCRIPT PART -->
<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import HeaderApp from '../components/HeaderApp.vue';
import MainMenu from '../components/MainMenu.vue';
import FontsCat from '../components/FontsCat.vue';
import InputBox from '../components/InputBox.vue';
import Footer from '../components/FooterApp.vue';
import TableHeadersVue from '../components/TableHeaders.vue';
import { addDoc, doc, getDocs, updateDoc, query } from 'firebase/firestore';
import { FinanzasRef } from '../firebajse'; 

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';


export default defineComponent({
  name: 'BuscarExpediente', 
  components: {
    HeaderApp,
    MainMenu,
    FontsCat,
    InputBox,
    Footer,
    TableHeadersVue,
  }, 
  
  props: {
    receivedText: String, // Definir la prop para recibir el texto
  },
  
  data () {
    return {
      InfoArr: [] as string[][],
      copyArr: [] as string[][],
      Search: '' as string,
    }
  }, 
  
  methods: {
    choseSearch () {
      let formatoFecha = /^\d{2}-\d{2}-\d{4}$/; // formato para evaluar como es que debe de venir la fecha
      try {
        if (formatoFecha.test(this.Search)) {
          this.getFecha()
        } else {
          this.getMetodo()
        }
      } catch {
        this.ToastError('Ha ocurrido un error')
      }
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

    DataArray () {
      const InfoArray = this.infoObteined;
      InfoArray.shift();
      let arrIn: string[][] = [];

      InfoArray.forEach((element) => {
        const info_elem = element.split('/');
        const fechas = info_elem[0].split(',').map(fecha => fecha.trim());
        const id = info_elem[1].trim(); 
        const montos = info_elem[2].split(',').map(monto => `Q. ${monto.trim()}`);

        const maxElementos = Math.max(fechas.length, montos.length); // obtener tamaño de los arrays 

        // Recorre y agrupa las fechas, id y montos
        for (let i = 0; i < maxElementos; i++) {
          arrIn.push([fechas[i] || '', id, montos[i] || '']);
        }
      });

      this.InfoArr = arrIn
      this.copyArr = this.InfoArr
    }, 

    getFecha () {
      try {
        let searchArr: string[][] = [];
  
        if (this.Search !== '') {
          this.copyArr.forEach((element) => {
            const partes = this.Search.split('-'); // Divide la fecha
            const fechaInvertida = `${partes[2]}-${partes[1]}-${partes[0]}`; // poner en yyyy-mm-dd

            if (typeof element[0] === 'string') {
              const Search_First = element[0].includes(fechaInvertida)

              if (Search_First == true) {
                const alreadyExists = searchArr.some(arr => JSON.stringify(arr) === JSON.stringify(element));
  
                if (!alreadyExists) {
                  const normalArray = Array.from(element);
                  searchArr.push(normalArray);
                }
              }
            }
          });
          
          if (searchArr.length > 0) {
            this.InfoArr = searchArr;
          } else {
            this.ToastNoti('No hay registros con la fecha ingresada')
          } 
        } else {
          this.InfoArr = this.copyArr
        }
      } catch (error) {
        this.ToastError('Ha ocurrido un error, buscando por fecha')
        // console.log(error)
      }
    },
    getMetodo () {
      try {
        let searchArr: string[][] = [];
        if (this.Search !== '') {
          this.copyArr.forEach((element) => {
            if (typeof element[1] === 'string') {
              const Search_el = element[1].includes(this.Search.toLowerCase())
              if (Search_el == true) {
                const alreadyExists = searchArr.some(arr => JSON.stringify(arr) === JSON.stringify(element));
                if (!alreadyExists) {
                  const normalArray = Array.from(element);
                  searchArr.push(normalArray);
                }
              }
            }
          });

          // Condicional para renderizar los datos
          if (searchArr.length > 0) {
            this.InfoArr = searchArr;
          } else {
            this.ToastNoti('No hay registros con método de pago ingresado')
          } 
        } else {
          this.InfoArr = this.copyArr
        }
      } catch {
        this.ToastError('Ha ocurrido un error, buscando por método de pago')
        // console.log(error)
      }
    }
  }, 
  
  setup () {
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
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });

        const querySnapshot = await getDocs(FinanzasRef);
        
        const infoFin = querySnapshot.docs.map(doc => ({ 
          codigo: doc.id,
          fecha: doc.data().Fecha_F,
          monto: doc.data().Monto_F,
        })
        );

        infoObteined.value = infoFin.map(item => `${item.fecha} / ${item.codigo} / ${item.monto}`);

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
      infoObteined
    };
  },
  
  watch: {
    Search (newSearch, oldSearch) {
      if (newSearch === '') {
        this.InfoArr = this.copyArr;
      }
    },
  }

});
</script>
