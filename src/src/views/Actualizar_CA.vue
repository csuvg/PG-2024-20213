<template>
    <Header />
      <div class = "UpperSide">
        <FontsCat class ="mainTitle" type="subtitulo1" text='Cita Actual'/>
        <FontsCat class ="headerh3" type="BoldText" :text="fullName"/>
      </div>
      <div class="DatosGenerales">
          <div class = "Title">
              <FontsCat class ="titleG" type="subtitulo2" text='Datos Generales'/> 
          </div>
          <div class="ConteinerInfo">
              <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Fecha'/>
                  <InputBoxDate placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="Fecha_CA"/>
              </div>
               <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Edad *'/>
                  <InputBox type="text" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="Edad_CA"/>
              </div>
               <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Alimentación *'/>
                  <InputBox placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="alimentacion_CA"/>
              </div>
          </div>
      </div>
      <div class="Examen_Fisio">
          <div class = "Title">
              <FontsCat class ="titleG" type="subtitulo2" text='Examen Fisio E/F'/> 
          </div>
          <div class ="Title">
          <FontsCat class ="subtitle" type="Text_B" text='Signos vitales'/> 
          </div>
          <div class="ConteinerInfo">
              <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='FC'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="FC_CA"/>
              </div>
               <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Temperatura'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="temperatura_CA"/>
              </div>
               <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='FR'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="FR_CA"/>
              </div>
          </div>
          <div class="ConteinerInfo">
              <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='P/A'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="PA_CA"/>
              </div>
              <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Glucometro'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="glucometro_CA"/>
              </div>
              <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='SAT'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="SAT_CA"/>
              </div>
          </div>
          <div class="ConteinerInfo">
              <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Peso (lb) '/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="peso_CA"/>
              </div>
               <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='Talla (cm)'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="talla_CA"/>
              </div>
               <div class="ConTextInput">
                  <FontsCat class ="headerh1" type="Text_B" text='POD'/>
                  <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="CC_CA"/>
              </div>
          </div>
           <div class ="TitleExam">
              <FontsCat class ="subtitle" type="Text_B" text='Hallazgos'/> 
          </div>
          <InputBoxBiggerVue placeholder="Ingrese información..." minWidth="85%" v-model="EF_detalle"/>
      </div>
      <div class="Diagnostico">
          <div class = "Title">
              <FontsCat class ="titleG" type="subtitulo2" text='Evaluación'/> 
          </div>
          <div class ="TitleExam">
            <FontsCat class ="subtitle" type="Text_B" text='Tratamiento'/> 
          </div>
          <InputBoxBiggerVue placeholder="Ingrese información..." minWidth="85%" v-model="TX_detalle"/>

          <div class="ConTextInput">
              <FontsCat class ="DT" type="Text_B" text='Diagnostico *'/>
              <InputBox placeholder="Ingrese información..." minWidth="80%" maxWidth="90%" margin-left = "-16%" v-model="diagnostico_CA"/>
          </div>
          <div>
            <InputBoxBiggerVue placeholder="Ingrese información..." minWidth="85%" margin-left = "-24%" v-model="textoDetalle_CA"/>
            <div class ="TitleExam">
                <FontsCat class ="subtitle" type="Text_B" text='Reconsulta'/> 
            </div>
            <InputBoxBiggerVue placeholder="Ingrese información..." minWidth="85%" v-model="ReconsultaDetalle"/>
        </div>
      </div>
      <div class="Btns">
          <Button class ="button" buttonText="Regresar a Ficha"  @click="IrMostrarFicha"/>
          <Button class ="button" buttonText="Actualizar"  @click="ActualizarCitaActual"/>
      </div>
      <Footer/>
  
</template>

<style>
  .UpperSide{
    display:flex;
    align-items: start;
    justify-content: start;
    margin-left: 15%;
    width: auto;
    flex-direction: column;
  }
  
  .Title{
    display:flex;
    align-items: start;
    justify-content: start;
    margin-left: 7%;
  }
  
  .ConteinerInfo{
      display: grid;
      grid-template-rows: 80%;
      justify-content: center;
      grid-template-columns: auto auto auto ;
      margin-left: 5%;
  }
  
  .ConTextInput{
      display: grid;
      justify-content: start;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 25px;
  }
  
  .headerh1 {
      width: 100px; /* Fija un ancho para el texto */
      text-align: center; 
      white-space: nowrap;
  }
  
  .DT {
      width: 100px; /* Fija un ancho para el texto */
      text-align: center; 
      white-space: nowrap;
      margin-left: 41%
  }
  
  .DatosGenerales{
      margin-bottom: 5%;
  }
  
  .Examen_Fisio{
      margin-bottom: 5%;
  }
  
  .Btns  {
    display: flex;
    flex-direction: row;
    margin-top: 3%;
    justify-content: space-evenly;
    align-content:center;
    align-items: center;
  }

  .TitleExam{
    display:flex;
    align-items: start;
    justify-content: start;
    margin-left: 10%;
    }
  
  @media screen and (max-width: 600px) {
  .Btns  {
    display: flex;
    flex-direction: column;
    margin-top: 3%;
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
  
  }
</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import Button from '../components/ButtonsApp.vue';
import InputBox from '../components/InputBox.vue';
import FontsCat from '../components/FontsCat.vue';
import InputBoxDate from '../components/InputBoxDate.vue';
import InputBoxBiggerVue from '../components/InputBoxBigger.vue';

import { pediaRef, CitaActualRef } from "../firebajse";
import { getDocs, setDoc, Timestamp, doc, where, query, updateDoc, getDocFromServer, getDoc, collection, connectFirestoreEmulator } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ActualizarCitaActual', 
  components: { 
    Header,
    Footer,
    FontsCat,
    InputBox,
    Button,
    InputBoxBiggerVue,
    InputBoxDate
  }, 
  props: { 
    idDocumento: { 
      type: String,
      required: true
    }, 
    Fecha: {
      type: String,
      required: true
    }
  }, 
  setup (props) {
    const Edad_CA = ref(''); 
    const FC_CA = ref('');
    const FR_CA = ref('');
    const Fecha_CA = ref('');
    const PA_CA = ref('');
    const CC_CA = ref('');
    const SAT_CA = ref('');
    const alimentacion_CA = ref('');
    const diagnostico_CA = ref('');
    const glucometro_CA = ref('');
    const peso_CA = ref('');
    const talla_CA = ref('');
    const temperatura_CA = ref('');
    const textoDetalle_CA = ref('');
    const TX_detalle = ref('');
    const ReconsultaDetalle = ref('');
    const EF_detalle = ref('');
    const fullName = ref('');
    // mandar props
    const id = ref(props.idDocumento); 
    const fecha = ref(props.Fecha);
    const router = useRouter();
   

    // funcion para obtener el indice de la fecha. 
    function obtenerIndice (fecha: string, fechas: string[]): number {
      for (let i = 0; i < fechas.length; i++) {
        if (fechas[i] == fecha) {
          return i; 
        }
      }
      return -1; 
    }

    // funcion para obtener el nombre 
    const obtenerNombre = async () => {
      try {
        const docRef = doc(pediaRef, props.idDocumento)
        const docSnapshot = await getDoc(docRef); 
        if (docSnapshot.exists()) {
          fullName.value = (docSnapshot.data().ApellidosPa + ', ' + docSnapshot.data().NombresPa).toLocaleUpperCase();
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

    const obtenerDatos = async () => {
      try {
        const PersonaDoc = await getDocs(query(CitaActualRef, where('__name__', '==', props.idDocumento)));
        if (!PersonaDoc.empty) {
          const doc = PersonaDoc.docs[0];
          const data = doc.data(); // obtengo los datos.
          // const fechaBuscada = '2024-05-09'; // esta es la fecha que se esta buscando, CAMBIERLO A PARAMETRO.
          const indice: number = obtenerIndice(fecha.value, data.Fecha_CA); // funcion para obtener el inidice.
          // vamos a mostrar los valores en los inputs para saber que actualizar...
          Edad_CA.value = data.Edad_CA[indice]; 
          FC_CA.value = data.FC_CA[indice];
          FR_CA.value = data.FR_CA[indice];
          Fecha_CA.value = data.Fecha_CA[indice];
          PA_CA.value = data.PA_CA[indice];
          CC_CA.value = data.CC_CA[indice];
          SAT_CA.value = data.SAT_CA[indice];
          alimentacion_CA.value = data.alimentacion_CA[indice];
          diagnostico_CA.value = data.diagnostico_CA[indice];
          glucometro_CA.value = data.glucometro_CA[indice];
          peso_CA.value = data.peso_CA[indice];
          talla_CA.value = data.talla_CA[indice];
          temperatura_CA.value = data.temperatura_CA[indice];
          textoDetalle_CA.value = data.textoDetalle_CA[indice];
          TX_detalle.value = data.TX_CA[indice]
          ReconsultaDetalle.value = data.reconsulta_CA[indice]
          EF_detalle.value = data.EF_CA[indice]
        }
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

    const ActualizarCitaActual = async () => {
      try {
        const PersonaDoc = await getDocs(query(CitaActualRef, where('__name__', '==', props.idDocumento)));
        if (!PersonaDoc.empty) {
          const data = PersonaDoc.docs[0].data(); // Obtener los datos del documento
          const newData = { ...data }; // copia los datos originales.
          // const fechaBuscada = '2024-05-09'; // esta es la fecha que se esta buscando, CAMBIERLO A PARAMETRO.
          const indice: number = obtenerIndice(fecha.value, data.Fecha_CA); // funcion para obtener el inidice.
          if (indice !== -1) {
            newData.Edad_CA[indice] = Edad_CA.value;
            newData.FC_CA[indice] = FC_CA.value;
            newData.FR_CA[indice] = FR_CA.value;
            newData.Fecha_CA[indice] = Fecha_CA.value;
            newData.PA_CA[indice] = PA_CA.value;
            newData.CC_CA[indice] = CC_CA.value; 
            newData.SAT_CA[indice] = SAT_CA.value;
            newData.alimentacion_CA[indice] = alimentacion_CA.value;
            newData.diagnostico_CA[indice] = diagnostico_CA.value; 
            newData.glucometro_CA[indice] = glucometro_CA.value;
            newData.peso_CA[indice] = peso_CA.value;
            newData.talla_CA[indice] = talla_CA.value; 
            newData.temperatura_CA[indice] = temperatura_CA.value;
            newData.textoDetalle_CA[indice] = textoDetalle_CA.value;
            newData.TX_CA[indice] = TX_detalle.value;
            newData.reconsulta_CA[indice] = ReconsultaDetalle.value;
            newData.EF_CA[indice] = EF_detalle.value;
            // se actualiza el documento
            await updateDoc(doc(CitaActualRef, props.idDocumento), newData);

            const ToastS: SweetAlertOptions = {
              toast: true,
              timer: 6000,
              icon: "success",
              position: "top-end",
              timerProgressBar: true,
              showConfirmButton: false,
              title: "Datos actualizados con éxito",
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            }
            Swal.fire(ToastS);

            router.push({
              name: 'MostrarCA',
              params: {
                idDocumento: props.idDocumento, 
                Fecha: props.Fecha
              }
            });
          }
        }
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

    onMounted(async () => {
      obtenerNombre();
      obtenerDatos();
    });

    // funcion para actualizar los datos... 
    return {
      fullName,
      fecha, 
      id,
      Edad_CA,
      FC_CA,
      FR_CA,
      Fecha_CA,
      PA_CA,
      CC_CA,
      SAT_CA,
      alimentacion_CA,
      diagnostico_CA,
      glucometro_CA, 
      peso_CA,
      talla_CA,
      temperatura_CA,
      textoDetalle_CA, 
      ActualizarCitaActual,
      TX_detalle,
      ReconsultaDetalle,
      EF_detalle,
    }
  }, 
  methods: {
    IrMostrarFicha () {
      this.$router.push({
        name: 'MostrarFichaMedica',
        params: {
          idDocumento: this.id, 
          Fecha: this.fecha
        }
      });
    }
  }
})
</script>
