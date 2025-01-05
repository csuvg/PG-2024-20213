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
            <FontsCat class="tituloPagina" type="subtitulo1" text="Buscar expediente"></FontsCat> 
          </div>
          <div class="DivBuscarConteiner">
            <div class="DivBuscar">
                <InputBox class="Buscar" placeholder="Buscar paciente" minWidth="80%" maxWidth="85%" v-model="Search"  @keypress.enter="choseSearch"/>
                <fa class='icon_Search' icon="fas-solid fa-magnifying-glass" pull="left"  @click="choseSearch"/>
            </div> 
          </div>
          <div class="ShowConteiner">
            <AlfabetoListVue class  = 'AlfabetList' @textClicked="handleLetterClick"/>
            <div class="TableConteiner">
              <TableHeadersVue :options="['Nombre del paciente', '', 'Código', 'Primera visita', 'Ultima visita']" />
              <div class="InfoConteiner">
                <div class="RowInfo"  v-for="(element, index) in InfoArr" :key="index" style="cursor: pointer;">
                  <fa class='iconX' icon="fa-solid fa-x" pull="left" @click="EliminarExp(element)" />
                  <FontsCat   type="Text_B"  :text="element[3]" @click="mandar(element)"/>
                  <FontsCat   type="Text_B"  :text="element[2]" @click="mandar(element)"/>
                  <FontsCat   type="Text_B"  :text="element[1]" @click="mandar(element)"/>
                  <FontsCat   type="Text_B"  :text="element[0].toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase())" @click="mandar(element)" />
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
   margin-left: -3%; // corre la parte del titulo 
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
    grid-template-columns: 3fr 16fr 16fr 12fr 32fr;
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
  
  .Smenu{
   display: none;
  }
  
  .iconX{
      color:#ad1414;
     
      cursor: pointer;
     
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
      grid-template-columns: 10fr 10fr 5fr 15fr;
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
import AlfabetoListVue from '../components/AlfabetoList.vue';
import TableHeadersVue from '../components/TableHeaders.vue';
 
import { pediaRef, CitaActualRef } from "../firebajse";
import { addDoc, doc, getDocFromCache, getDocs, getDoc, deleteDoc, query, QuerySnapshot } from 'firebase/firestore';
  
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
  
  
export default defineComponent({
  name: 'BuscarExpediente', 
  components: {
    HeaderApp,
    MainMenu,
    FontsCat,
    InputBox,
    Footer,
    AlfabetoListVue,
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
      clickedText: '' as string,
    }
  }, 

  methods: {
    informacion () {
      const pediaInfo = this.PediaPeople;
      let arrIn: string[][] = [];

      pediaInfo.forEach((element) => {
        const info_elem = element.split('/');
        arrIn.push(info_elem);
      });

      this.InfoArr = arrIn.sort((a, b) => a[1].localeCompare(b[1]))
      this.copyArr = this.InfoArr
    },

    getApellido () {
      try {
        let searchArr: string[][] = [];

        if (this.Search.toUpperCase() !== '') {
          this.copyArr.forEach((element) => {
            if (typeof element[0] === 'string') {
              const Search_Name = element[0].includes(this.Search.toUpperCase())
              if (Search_Name == true) {
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
            this.ToastNoti('No hay registros con dichos datos')
          } 
        } else {
          this.InfoArr = this.copyArr
        }
      } catch (error) {
        this.ToastError('Ha ocurrido un error')
        // console.log(error)
      }
    },

    getFecha () {
      try {
        let searchArr: string[][] = [];

        if (this.Search.toUpperCase() !== '') {
          this.copyArr.forEach((element) => {
            const partes = this.Search.split('-'); // Divide la fecha
            const fechaInvertida = `${partes[2]}-${partes[1]}-${partes[0]}`; // poner en yyyy-mm-dd

            if (typeof element[2] === 'string' || typeof element[3] === 'string') {
              const Search_First = element[2].includes(fechaInvertida)
              const Searc_Last = element[3].includes(fechaInvertida)

              if (Search_First == true || Searc_Last == true) {
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
            this.ToastNoti('No hay registros con dichos datos')
          } 
        } else {
          this.InfoArr = this.copyArr
        }
      } catch (error) {
        this.ToastError('Ha ocurrido un error')
        // console.log(error)
      }
    },

    choseSearch () {
      let formatoFecha = /^\d{2}-\d{2}-\d{4}$/;
      try {
        if (formatoFecha.test(this.Search)) {
          this.getFecha()
        } else {
          this.getApellido()
        }
      } catch {
        this.ToastError('Ha ocurrido un error')
      }
    },

    handleLetterClick (text: string) {
      try {
        this.clickedText = text; // letter of alphabet clicked 
        let searchArr: string[][] = [];

        this.copyArr.forEach((element) => {
          const splitElement = element[0].replace(/\s{2,}/g, ' ').split('')
          const FirstElement = splitElement[0].includes(this.clickedText)
          
          // Obtiene la primera letra del nombre y verifia su existencia 
          if (FirstElement == true) {
            const alreadyExists = searchArr.some(arr => JSON.stringify(arr) === JSON.stringify(element));
            if (!alreadyExists) {
              const normalArray = Array.from(element);
              searchArr.push(normalArray);
            }
          }
        })

        // si hay datos se realiza un renderizado al frontend
        if (searchArr.length > 0) {
          this.InfoArr = searchArr;
        } else {
          this.ToastNoti(`No hay registros con la letra ${this.clickedText}`)
          this.InfoArr = this.copyArr
        } 
      } catch (error) {
        this.ToastError('Ah ocurrido un error')
        // console.log(error)
      }
    },

    mandar (element: string[]) {
      // acceder a la informacion contenida en element
      const codigo = element[1].trim(); // obtener id
      let fuente = element[4]; 
      fuente = fuente.trim(); 
      // Determinar la ruta a la pagina de ficha mdica.
      let ruta: string;
      if (fuente === 'Pediatria') {
        ruta = 'MostrarFichaMedica';
      } else {
        console.log('Fuente desconocida')
        return;
      }
      // ir a la siguiente pagina, dependiendo de la ruta.
      this.$router.push({
        name: ruta,
        params: { idDocumento: codigo }
      });
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
    
    async EliminarExp (element: string[]) {
      const codigo = element[1].trim(); // obtener id
      const oldDocFicha = doc(pediaRef, codigo); // obtener doc fichaMedica en base al id
      const oldDocCA = doc(CitaActualRef, codigo); // obtner doc de CA en base al id

      try {
        const docSnapshot = await getDoc(oldDocFicha);
        const docSnapshot2 = await getDoc(oldDocCA);
        
        if (!docSnapshot.exists) {
          this.ToastNoti("El expediente que se busca no existe")
        } else {
          await deleteDoc(oldDocFicha);
          await deleteDoc(oldDocCA);
          this.ToastSucces("Expediente eliminado con exito")
          window.location.reload();
        }
      } catch (error) {
        // console.error("Error al cambiar el ID del documento: ", error);
        this.ToastError("Error al eliminar expediente")
      }
    },


  }, 
  
  setup () {
    const PediaPeople = ref<string[]>([]);

    const obtenerPeople = async () => {
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
        });
  
        const querySnapshot = await getDocs(pediaRef);
        const arrPedia = querySnapshot.docs.map(doc => ({ 
          codigo: doc.id,
          primera: doc.data().Fecha_creacion,
          ultima: doc.data().Fecha_ultimaV,
          user: `${doc.data().ApellidosPa} ${doc.data().NombresPa}`.toUpperCase(),
          fuente: 'Pediatria'
        })
        );
          
        // Asigna la matriz de IDs al ref 
        PediaPeople.value = arrPedia.map(item => `${item.user} / ${item.codigo} / ${item.primera} / ${item.ultima} / ${item.fuente}`);     
        
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
      obtenerPeople();
    });
  
    return {
      PediaPeople, 
    };
  },
  
  watch: {
    Search (newSearch) {
      if (newSearch === '') {
        this.InfoArr = this.copyArr;
      }
    },
  }
  
});
</script>
