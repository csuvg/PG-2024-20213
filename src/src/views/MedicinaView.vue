<template>
    <Header class="Header"/>
    <body>
      <div class="conteiner">
        <div class="Options">
          <div class = "UpperSide4">
          <BackBtn class ="back" ruta="/buscar"/>
          <FontsCat class ="nameTitle" type="subtitulo1" text="Medicamentos a recetar"/>
          </div>
          
          <div class = "DownSide">
          <SubMenu3 :VistaFicha="collection" :idDocumento="id"/>
          </div>
        </div>
  
         <div class="ConteinerInfo">
              <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Medicamento'/>
                  <InputBox type="text" placeholder="Ingrese dato..." minWidth="80%" maxWidth="90%" v-model="Medicamento"/>
              </div>
               <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Dosis'/>
                  <InputBox type="text" placeholder="Ingrese dato..." minWidth="80%" maxWidth="90%" v-model="Dosis"  @keypress.enter="addMedicine"/>
              </div>
               <fa class='icons' icon="fa-solid fa-check" pull="left"  @click="addMedicine"/>
          </div>
          <div class ="HeaderTable">
              <FontsCat class="fuente" text='Medicamento' type="BoldText"/>
              <FontsCat class="fuente" text='Dosis' type="BoldText" />
            </div>
          <div class="Cline">
            <div class="Line" />
          </div>
          <div class="Resumen">
              <div class="TextResumen">
                <div class="RowInfo"  v-for="(element, index) in InfoArr" :key="index">
                  <FontsCat   type="Text_B"  :text="element[0]"/>
                  <FontsCat   type="Text_B"  :text="element[1]"/>
                </div>
              </div>
          </div>
          <div class="ConteinerInfo2">
              <div class="ConTextInput2">
                  <FontsCat class ="headerh5" type="Text_B" text='Eliminar un Medicamento'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="160%" maxWidth="75%" margin-left="-30%" v-model="Num"  @keypress.enter="eliminateMedicine" />
              </div>
              <fa class='icons2' icon="fa-solid fa-x" pull="left" @click="eliminateMedicine"/>
          </div>
            <div class = "tempCont">
              <div v-if="outRangeCUI" class="error-message">
                <FontsCat type="Error" text='Nota: Para eliminar debes de ingresar el número en el que se encuentra ubicado el medicamento' class="errortext"/>
              </div>
            </div>
        <div class = "BTNCon">
          <Button class="BTn" buttonText="Ir a receta" actionType="saveData" @click="irReceta" ></Button>
        </div>
      </div>  
    </body>
    <Footer/>
</template>
  
  <!------------------  STYLE -------------------->
<style scoped lang="scss" >
  .UpperSide4{
    display:flex;
    align-items: center;
    justify-content: start;
    margin-left: 10%;
    width: auto;
    margin-bottom: 2%;
    margin-top: 1%;
  }
  
  .nameTitle{
    margin-left: 4%;
    // margin-top: 1.5%;
    margin-top: 4%;
  }
  
  .ConteinerInfo{
    display: grid;
    grid-template-rows: 80%;
    grid-template-columns: 40% 40% 10%;
    align-items: center;
    justify-content: center;
    margin-left: 10%;
  }
  
  .ConteinerInfo2{
      display: flex;
      margin-left: -1%;
      align-items: center;
  }
  
  .DownSide{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4%;
  }
  
  .ConTextInput{
      display: grid;
      justify-content: start;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 25px;
  }
  
  .ConTextInput2{
      display: grid;
    //   justify-items: center;
      justify-content: start;
      grid-template-columns: 300px 300px;
      grid-column-gap: 25px;
    //   margin-left: 13%;
    //   margin-top: 5%;
      margin: 5% 0% 2% 13%;
      align-items: center;
  }
  
  .headerh1 {
      width: 110%; /* Fija un ancho para el texto */
      text-align: end; 
      white-space: nowrap;
  }
  
  .icons{
      color:#20ad14;
      height:30px;
      width: auto;
      cursor: pointer;
  }
  
  .icons2{
      color:#ad1414;
      height:28px;
      width: auto;
      cursor: pointer;
      margin-top: 3%;
      margin-left: -5%;
  }
  
  .Resumen{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow-y: auto;
      overflow-x: hidden; 
  }
  
  .TextResumen{
      width: 60%;
      display: flex;
      justify-content: center;
      flex-direction: column;
  }
  
  .BTNCon{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top: 2%;
    margin-bottom: 2%;
    column-gap: 80px;
  }
  
  .InfoConteiner{
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden; 
  }
  
  .RowInfo {
    display: grid;
    grid-template-columns: 60% 60%;
    align-items: center;
    justify-content: space-evenly;
    justify-items: start;
    margin-top: -1%;
    margin-left: 18%;
  }
  
  .HeaderTable {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1%;
  }
  
  .Line{
    width: 60%;
    margin-left: 2%;
    border-bottom: 1px solid #524F6C;
  }
  
  .Cline {
    display: flex;
   justify-content: center
  }

  .tempCont{
    display: flex;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
  
  .error-message{
    margin-left: 15%;
    margin-top: -3%;
  }

  .errortext{
    color:#AE3C2D;
  }
  @media screen and (max-width: 600px) {
  .Btns  {
    display: flex;
    flex-direction: column;
    margin-top: 2%;
    justify-content: space-evenly;
    align-content:center;
    align-items: center;
  }
  .button{
      margin-bottom: 3%;
  }
  
  .ConteinerInfo{
      display: grid;
      grid-template-rows: 30%;
      justify-content: center;
      grid-template-columns: auto;
  }
  
  .headerh1 {
      width: 80px; /* Fija un ancho para el texto */
  }
  
  .icons{
      margin-top: -20%;
      margin-left: 98%;
      height:20px;
  }
  
  .icons2{
      margin-left: 10%;
      height:18px;
  }
  }
  
</style>

// ------------------  SCRIPT -------------------
<script lang="ts">
import { defineComponent, ref, provide, onMounted } from 'vue';

import BackBtn from '../components/BackBtn.vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import Button from '../components/ButtonsApp.vue';
import FontsCat from '../components/FontsCat.vue';
import InputBox from '../components/InputBox.vue';
import SubMenu3 from '../components/SubMenu3.vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CryptoJS from 'crypto-js';

import { pediaRef, CitaActualRef } from "../firebajse";
import { addDoc, doc, getDocFromCache, getDocs, where, query, QuerySnapshot } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

export default defineComponent({
  name: 'Medicamentos_Recetar',
  components: {
    Header,
    Footer,
    Button,
    BackBtn,
    InputBox,
    FontsCat,
    SubMenu3,
  },
  props: {
    idDocumento: {
      type: String, 
      required: true
    },
  },
  
  setup (props, { emit }) {
    const store = useStore();
    const id = ref(props.idDocumento);
    const Medicamento = ref('');
    const Dosis = ref('');
    const Num = ref('');
    const collection = ref('');
    const InfoArr = ref<string[][]>([]); // Proporcionar tipo explícito
    const router = useRouter();
    const secretKey = 'secretKey123!@';
    const outRangeCUI = true;
    
    const addMedicine = () => {
      const med: string[] = [Medicamento.value, Dosis.value];
      InfoArr.value.push(med);
      Medicamento.value = '';
      Dosis.value = '';
    };

    const eliminateMedicine = () => {
      const index = parseInt(Num.value, 10) - 1;
      if (index >= 0 && index < InfoArr.value.length) {
        InfoArr.value.splice(index, 1);
      }
      Num.value = '';
    };
    const getCollection = async (id: any) => {
      try {
        // Primero, intenta obtener documentos de la colección "pediaRef"
        const querySnapshot = await getDocs(query(pediaRef, where('__name__', '==', id)));
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0]; 
          const name = docSnapshot.data().Nombres; 
          collection.value = 'pediatria';
        } else {
          // Si no se encontró el documento en ninguna de las dos colecciones, muestra un mensaje de error
          const Toast: SweetAlertOptions = {
            toast: true,
            timer: 6000,
            icon: 'error',
            position: 'top-end',
            timerProgressBar: true,
            showConfirmButton: false,
            title: 'No se encontró expediente',
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          };
          Swal.fire(Toast);
        }
      } catch (error) {
        // Manejo de errores
        console.error('Error obteniendo documentos:', error);
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: 'error',
          position: 'top-end',
          timerProgressBar: true,
          showConfirmButton: false,
          title: 'Error al obtener documentos',
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        };
        Swal.fire(Toast);
      }
    };

    const irReceta = () => {
      store.dispatch('updateArrayMed', InfoArr.value);
      router.push({ 
        name: 'RecetaMedica', 
        params: { idDocumento: props.idDocumento } 
      });
    };

    onMounted(() => {
      getCollection(props.idDocumento);
    });


    return {
      Medicamento,
      id,
      Dosis,
      Num,
      InfoArr,
      collection,
      addMedicine,
      eliminateMedicine,
      irReceta,
      getCollection,
      outRangeCUI
    };
  },
});
</script>
