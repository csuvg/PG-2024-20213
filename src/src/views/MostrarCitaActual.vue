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
          <div class="ConteinerFull">
            <div class="ConteinerInfo">
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='Fecha'/>
                    <ShowingBox class="Show1" :text="Fecha_CA" minWidth="75%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='Edad *'/>
                    <ShowingBox class="Show1" :text="Edad_CA" minWidth="75%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='Alimentación *'/>
                    <ShowingBox class="Show1" :text="alimentacion_CA" minWidth="75%" maxWidth="90%" />
                </div>
            </div>
          </div>
          <div class="BigBoxTitle">
            <div class ="Title">
                <FontsCat class ="subtitle" type="Text_B" text='Motivos de consulta'/> 
            </div>
            <div class="BoxConteiner">
              <BoxComplete class="Show2" :text="textoDetalle_CA" minWidth="80%" maxWidth="85%" />
            </div>
            </div>
      </div>
      <div class="Examen_Fisio">
          <div class = "Title">
              <FontsCat class ="titleG" type="subtitulo2" text='Examen Fisico E/F'/> 
          </div>
          <div class ="Title">
          <FontsCat class ="subtitle" type="Text_B" text='Signos vitales'/> 
          </div>
          
          <div class="ConteinerFull">
            <div class="ConteinerInfo">
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='FC'/>
                    <ShowingBox class="Show1" :text="FC_CA" minWidth="70%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='Temperatura'/>
                    <ShowingBox class="Show1" :text="temperatura_CA" minWidth="70%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='FR'/>
                    <ShowingBox class="Show1" :text="FR_CA" minWidth="70%" maxWidth="90%" />
                </div>
            </div>
            <div class="ConteinerInfo">
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='P/A'/>
                    <ShowingBox class="Show1" :text="PA_CA" minWidth="70%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='Glucometro'/>
                    <ShowingBox class="Show1" :text="glucometro_CA" minWidth="70%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='SAT'/>
                    <ShowingBox class="Show1" :text="SAT_CA" minWidth="70%" maxWidth="90%" />
                </div>
            </div>
            <div class="ConteinerInfo">
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='Peso (lb) '/>
                    <ShowingBox class="Show1" :text="peso_CA" minWidth="70%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='Talla (cm)'/>
                    <ShowingBox class="Show1" :text="talla_CA" minWidth="70%" maxWidth="90%" />
                </div>
                <div class="ConTextInput">
                    <FontsCat class ="headerh1" type="Text_B" text='CC'/>
                    <ShowingBox class="Show1" :text="CC_CA" minWidth="70%" maxWidth="90%" />
                </div>
            </div>
          </div>

          <div class="BigBoxTitle">
            <div class ="Title">
                <FontsCat class ="subtitle" type="Text_B" text='Hallazgos'/> 
            </div>
            <div class="BoxConteiner">
              <BoxComplete class="Show2" :text="EF_CA" minWidth="80%" maxWidth="85%" />
            </div>
          </div>
      </div>
      <div class="Diagnostico">
          <div class = "Title">
              <FontsCat class ="titleG" type="subtitulo2" text='Evaluación'/> 
          </div>
          <div class="ConTextInput6">
              <FontsCat class ="diagnosticT" type="Text_B" text='Diagnostico *'/>
              <ShowingBox class="Show1" :text="diagnostico_CA" minWidth="80%" maxWidth="87%" />
          </div>
          <div class="BigBoxTitle">
            <div class ="Title">
                <FontsCat class ="subtitle" type="Text_B" text='Tratamiento'/> 
            </div>
            <div class="BoxConteiner">
            <BoxComplete class="Show2" :text="TX_CA" minWidth="80%" maxWidth="85%" />
          </div>
          </div>
          <div class="BigBoxTitle">
            <div class ="Title">
                <FontsCat class ="subtitle" type="Text_B" text='Reconsulta'/> 
            </div>
            <div class="BoxConteiner">
            <BoxComplete class="Show2" :text="reconsulta_CA" minWidth="80%" maxWidth="85%" />
          </div>
          </div>
      </div>
      <div class="Btns">
          <Button class ="button" buttonText="Regresar al historial"  @click="IrAhistorial"/>
          <Button class ="button" buttonText="Editar"  @click="ActCitaActual"/>
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
  .ConteinerFull {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ConteinerInfo{
      display: grid;
      grid-template-rows: 80%;
      justify-content: space-evenly;
      grid-template-columns: auto auto auto ;
      gap: 3%;
      width: 90%;
  }
  
  .ConTextInput{
      display: grid;
      justify-content: start;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 25px;
  }
  
  .ConTextInput6{
      display: grid;
      justify-content: start;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 25px;
      margin-left: 1%
  }

  .headerh1 {
      width: 100px; /* Fija un ancho para el texto */
      text-align: center; 
      white-space: nowrap;
  }
  
  .diagnosticT {
      width: 100px; /* Fija un ancho para el texto */
      text-align: center; 
      white-space: nowrap;
      margin-left: 27%
  }

  .headerh3{
    display:flex;
    align-items: start;
    justify-content: start;
    margin-left: 0%;
  }
  
  .DatosGenerales{
      margin-bottom: 3%;
  }
  
  .Examen_Fisio{
      margin-bottom: 3%;
  }

  .BigBoxTitle{
    display: flex;
    flex-direction: column;
  }
  .BBTitle{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .Btns  {
    display: flex;
    flex-direction: row;
    margin-top: 3%;
    justify-content: space-evenly;
    align-content:center;
    align-items: center;
  }


  .Show2 {
    margin-left: 7%;
    margin-top: 0%;
    margin-bottom: 2%;
  }
  
  .headerh3 {
  margin-top: -1%;
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
import { defineComponent, ref, onMounted, toHandlers } from 'vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import Button from '../components/ButtonsApp.vue';
import FontsCat from '../components/FontsCat.vue';
import ShowingBox from '@/components/ShowingBox.vue';
import BoxComplete from '@/components/BoxComplete.vue';
  
import { CitaActualRef, pediaRef } from "../firebajse";
import { getDocs, Timestamp, doc, where, query, getDocFromServer, getDoc, collection } from 'firebase/firestore';
  
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';
  
  
export default defineComponent({
  name: 'MostarCitaActual',
  components: {
    Header,
    Footer,
    FontsCat,
    BoxComplete,
    Button,
    ShowingBox,
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
    const receta_CA = ref('');
    const talla_CA = ref('');
    const temperatura_CA = ref('');
    const textoDetalle_CA = ref('');
    const reconsulta_CA = ref('');
    const TX_CA = ref('');
    const EF_CA = ref('');
    const fechasCitas = ref(props.Fecha); 
    const id = ref(props.idDocumento);
    const fullName = ref('');

    // funcion para obtener el indice de la fecha. 
    function obtenerIndice (fechasCitas: string, fechas: string[]): number {
      for (let i = 0; i < fechas.length; i++) {
        if (fechas[i] == fechasCitas) {
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

    onMounted(async () => {
      obtenerNombre();
      try { 
        const PersonaDoc = await getDocs(query(CitaActualRef, where('__name__', '==', props.idDocumento)));
        if (!PersonaDoc.empty) { 
          const doc = PersonaDoc.docs[0]; 
          const data = doc.data(); // obtener los datos del documento.
          // Edad_CA.value = data.Fecha_CA
          // INICIO DE AREA DE PRUEBAS... 
          // const fechaBuscada = '2024-05-09'; // esta es la fecha que se esta buscando, CAMBIERLO A PARAMETRO.
          const indice: number = obtenerIndice(fechasCitas.value, data.Fecha_CA); // funcion para obtener el inidice.
          Edad_CA.value = data.Edad_CA[indice]; 
          // FINALIZACION AREA DE PRUEBAS... 
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
          // receta_CA.value = data.receta_CA[indice]; si este esta vacio no muestra todos los que esta a continuacion...
          talla_CA.value = data.talla_CA[indice];
          temperatura_CA.value = data.temperatura_CA[indice];
          textoDetalle_CA.value = data.textoDetalle_CA[indice];
          reconsulta_CA.value = data.reconsulta_CA[indice];
          TX_CA.value = data.TX_CA[indice];
          EF_CA.value = data.EF_CA[indice];
        } // el del if 
        // try 
      } catch (error) {
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "error",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Error al obtener las citas",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
      }
    }); // onMounted
    return {
      fullName,
      id,
      fechasCitas,
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
      receta_CA,
      talla_CA,
      temperatura_CA,
      textoDetalle_CA,
      reconsulta_CA,
      TX_CA,
      EF_CA
    }
  }, // setup
  methods: {
    IrAhistorial () {
      this.$router.push({
        name: 'HistorialMedico', 
        params: { 
          idDocumento: this.id
        }
      });
    }, 
    ActCitaActual () {
      this.$router.push({
        name: 'ActualizarCitaActual',
        params: {
          idDocumento: this.id, 
          Fecha: this.fechasCitas
        }
      });
    }
  }
}) // todo el script.
</script>
