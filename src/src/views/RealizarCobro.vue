<template>
    <Header class="header"/>
    <body>
      <div class="conteiner">
        <div class="menu">
          <MainMenu class="MenuC"/>
        </div>
        <div class="Contenido"> 
          <div class="MainTitle">
            <FontsCat class="tituloPagina" type="subtitulo1" text="Realizar un cobro"></FontsCat> 
          </div>
          <div class="Cobro">
            <div class ="DP">
              <InputBox class= "inpt inptM4" placeholder="Ingrese nombre del paciente" minWidth="100%" maxWidth="90%" margin-left="-3%" v-model="Nombre"></InputBox>
              <InputBox class= "inpt inptM5" placeholder="Ingrese motivo de visita" minWidth="100%" maxWidth="90%" margin-left="1%" v-model="Motivo"></InputBox>
            </div>
             <div class ="DP">
              <InputBox class= "inpt inptM4" type= "number" placeholder="Ingrese monto total en Quetzales" minWidth="100%" maxWidth="90%" margin-left="-3%" v-model="Monto"></InputBox>
              <DropDown class= "inpt inptM5" placeholder="Ingrese método de pago" :opciones="listaOpciones" minWidth="100%" maxWidth="90%" margin-left="1%" v-model="Metodo"/>
            </div>
          </div>
          <div class="Seguro">
            <div class = "Texb">
              <FontsCat class ="headerh1" type="Text_B" text='¿Cuenta con seguro? *'/>
            </div>
            <div class= "OptInp">
              <div class= "OptSeg">
                <CircleOption :options="['Si', 'No']" v-model="Tseguro"/>
              </div>
              <div class ="DP4">
                <DropDown class= "inpt inptM4" placeholder="Ingrese nombre del seguro" :opciones="NameSeguro" minWidth="100%" maxWidth="76.5%" margin-left="-2%" v-model="Seguro"/>
              </div>
            </div>
          </div>
        <div class = "CBTN">
          <Button buttonText="Ingresar cobro" @click="crearDocumento"></Button>
        </div>
        </div>
      </div>
    <Footer class="ft"/>
    </body>
</template>
  
<style scoped lang="scss" >
  .header {
    margin-bottom: 30px; // margen para abajo
  }

  .conteiner {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .Contenido {
    display: grid;
    width:100%;
    height: 100%;
    margin-left: 5%;
    margin-right: 3%;
    margin-top: -2%;
  }
  
  .tituloPagina {
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    align-items: flex-start;
    //margin-top: 25px;
    margin-left: -0.4%; // corre la parte del titulo 
    width: 100%;
    margin-bottom: 3%;
  }
  
  .DP{
    width:90%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 3fr 3fr ;
    grid-gap: 5px;
    margin-left: 4.5%;
    margin-bottom: 1.5%;
  }
  
  .CBTN{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top: 4.5%;
    padding: 10px;
    margin-left: -5%;
  }
  
  .OptInp{
    width:90%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 7fr 10fr ;
    grid-gap: 5px;
    margin-left: 9%;
    align-items: center;
  }
  
  .headerh1{
    margin-left: -1%;
  }
  
  .Texb{
    display:flex;
    height:40px;
    align-items: center;
    justify-content: start;
    margin-left: 6.6%;
  }
  
  @media screen and (max-width: 600px) {
  
  body {
      height: 100%;
      margin: 0;
      display: flex;
      flex-direction: column;
  }
  
  .DP{
    width:90%;
    display: grid;
    grid-template-rows:  50px;
    grid-template-columns: 4fr ;
  }
  
  .DP4{
    width:100%;
    display: grid;
    margin-left: -3%;
    justify-items: center;
  
  }
  
  .OptInp{
    width:90%;
    display: grid;
    grid-template-rows:  50px;
    grid-template-columns: 4fr;
  }
  
  .boxOpt{
    margin-left: 10%;
  }
  
  .Tblack{
    width: 90%;
    display: flex;
    margin-left: 25%;
    align-items: flex-start;
  }
  
  .inptM4{
    width: 100%;
    margin-left: 3%;
  }
  
  .inptM5{
    margin-left: -0.9%;
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
    margin-bottom: 4%;
    margin-top: 4%;
  }
  .conteiner{
      flex-direction: column;
    }
  
  .Contenido{
    margin-top: 2%;
  }
  
  .ft{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  
  .Seguro{
    margin-top: 5%;
  }
  .CBTN{
    margin-top: 7%;
  }
  }
  
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import Button from '../components/ButtonsApp.vue';
import InputBox from '../components/InputBox.vue';
import FontsCat from '../components/FontsCat.vue';
import MainMenu from '../components/MainMenu.vue';
import CircleOption from '../components/CircleOption.vue';
import DropDown from '../components/inputDropDown.vue';
  
import { addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FinanzasRef, ConfiRef, auth } from '../firebajse'; 
  
  
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
  
export default defineComponent({
  name: 'CitaActual',
  components: {
    Header,
    Footer,
    MainMenu,
    FontsCat,
    InputBox,
    Button,
    CircleOption,
    DropDown,
  },  
  props: {
    idDocumento: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      Nombre: '' as string,
      Motivo: '' as string,
      Metodo: '' as string,
      Seguro: '' as string,
      Monto: '' as string,
      Tseguro: '' as string,
      listaOpciones: ['Efectivo', 'Tarjeta', 'Cheque', 'Transferencia'],
    }
  },
  methods: {
    PropSucces (title2: string) {
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
    PropError (title2: string) {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
        icon: "error",
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
    PropNoti (title2: string) {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
        icon: "warning",
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
    CheckNulls () { 
      if (this.Nombre !== '' && this.Motivo !== '' && this.Metodo !== '' && this.Monto !== '') {
        return false
      } else {
        return true 
      }
    },
    CheckText () {
      if (this.Nombre.includes(',')) {
        this.Nombre = this.Nombre.replace(/,/g, '-');
      }
      if (this.Motivo.includes(',')) {
        this.Motivo = this.Motivo.replace(/,/g, '-');
      }
    },
    async crearDocumento () {
      try {
        const Historico_Arr: string[][] = [];
        const Historico_Arr2 = this.historial_arr_temp;
        
        if (this.CheckNulls() == false) {
          this.CheckText()
          const fechaCrea = new Date();
          const FechaCreacion = fechaCrea.toLocaleDateString('en-CA')
          if (this.Seguro == '') {
            this.Seguro = '--'
          }
          if (this.Tseguro == '') {
            this.PropNoti("Verifique la opción del seguro")
          } else { 
            const MontoNum = Number(this.Monto).toFixed(2)
            Historico_Arr.push([
              FechaCreacion.toString(), 
              this.Nombre.toLowerCase(), 
              this.Motivo.toLowerCase(), 
              this.Metodo.toLowerCase(), 
              MontoNum, 
              this.Tseguro, 
              this.Seguro
            ]);
            const HistArr = Historico_Arr.map(subArray => subArray.join('$')).toString();
            Historico_Arr2.push(HistArr)   
            const docRef = doc(FinanzasRef, "cajaDia")
            // Datos del nuevo documento, izquerda campo y derecha info
            await updateDoc(docRef, {
              Historico_RC: Historico_Arr2
            })
            this.PropSucces("Cobro ingresado correctamente")
            this.Nombre = "";
            this.Motivo = "";
            this.Metodo = "";
            this.Seguro = "";
            this.Tseguro = "";
            this.Monto = "";
            // redirigir a la pagina 
          }
        } else {
          this.PropNoti('Campos obligatorios vacios')
        }
      } catch (error) {
        this.PropError('Algo salio mal, error al guardar cobro')
      }
    },
  }, 
  setup (props) {
    const historial_arr_temp = ref<any[]>([]);  
    const NameSeguro = ref<string[]>([]);
    
    const obtenerDocumentos = async () => {
      try {
        const docRef = doc(FinanzasRef, "cajaDia")
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          for (let el in data.Historico_RC) {
            historial_arr_temp.value.push(data.Historico_RC[el])
          }
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se han encontrado datos ',
          };
          Swal.fire(swalOptions);
        }
      } catch (error) {
        const swalOptions: SweetAlertOptions = {
          timer: 1800,
          icon: 'error',
          position: 'center',
          showConfirmButton: false,
          cancelButtonText: "No, cancel!",
          title: 'Ha ocurrido un error',
        };
        Swal.fire(swalOptions);
      }
    }
    const obtenerSeguros = async () => {
      const docRef = doc(ConfiRef, 'Seguros')
      const querySnapshot = await getDoc(docRef)
      if (querySnapshot.exists()) {
        const data = querySnapshot.data();
        const name = data.nombre_S

        if (Array.isArray(name)) {
          NameSeguro.value.push(...name);
        } else {
          NameSeguro.value.push(name);
        }
      }
    }

    onMounted(() => {
      obtenerDocumentos();
      obtenerSeguros();
    });
    return {
      historial_arr_temp,
      NameSeguro,

    }
  },
})
</script>
