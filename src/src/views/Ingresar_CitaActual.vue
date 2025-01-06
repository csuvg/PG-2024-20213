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
                <InputBoxDate placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="fecha"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='Edad *'/>
                <InputBox type="text" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="edad"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='Alimentación *'/>
                <InputBox placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="alimentacion"/>
            </div>
            
        </div>
        <div class ="TitleExam">
            <FontsCat class ="subtitle" type="Text_B" text='Motivos de consulta'/> 
          </div>
          <InputBoxBiggerVue placeholder="Ingrese información..." minWidth="85%" v-model="textoDetalle"/>
 
    </div>
    <div class="Examen_Fisio">
        <div class = "Title">
            <FontsCat class ="titleG" type="subtitulo2" text='Exámen Físico E/F'/> 
        </div>
        <div class ="Title">
        <FontsCat class ="subtitle" type="Text_B" text='Signos vitales'/> 
        </div>
        <div class="ConteinerInfo">
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='FC'/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="FC"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='Temperatura'/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="temperatura"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='FR'/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="FR"/>
            </div>
        </div>
        <div class="ConteinerInfo">
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='P/A'/>
                <InputBox  placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="PA"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='Glucometro'/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="glucometro"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='SAT'/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="sat"/>
            </div>
        </div>
        <div class="ConteinerInfo">
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='Peso (lb) '/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="peso"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='Talla (cm)'/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="talla"/>
            </div>
            <div class="ConTextInput">
                <FontsCat class ="headerh1" type="Text_B" text='CC'/>
                <InputBox type="number" placeholder="Ingrese valor..." minWidth="80%" maxWidth="90%" v-model="CC"/>
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
        <div class="ConTextInput">
            <FontsCat class ="headerh4" type="Text_B" text='Diagnostico *'/>
              <InputBox placeholder="Ingrese información..." minWidth="80%" maxWidth="70%" v-model="diagnostico"/>
          </div>
        <div class ="TitleExam">
          <FontsCat class ="subtitle" type="Text_B" text='Tratamiento'/> 
        </div>
        <InputBoxBiggerVue placeholder="Ingrese información..." minWidth="85%" v-model="TX_detalle"/>
        <div>
          <div class ="TitleExam">
            <FontsCat class ="subtitle" type="Text_B" text='Reconsulta'/> 
          </div>
          <InputBoxBiggerVue placeholder="Ingrese información..." minWidth="85%" v-model="ReconsultaDetalle"/>
        </div>
    </div>
    <div class="Btns">
          <Button class ="button" buttonText="Regresar a Ficha"  @click="IrMostrarFicha"/>
          <Button class ="button" buttonText="Guardar"  @click="addCitaActual"/>
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

.TitleExam{
  display:flex;
  align-items: start;
  justify-content: start;
  margin-left: 10%;
}

.ConteinerInfo{
    display: grid;
    grid-template-rows: 80%;
    justify-content: center;
    grid-template-columns: auto auto auto ;
    margin-left: 2%;
    margin-right: 2%;
}

.ConTextInput{
    display: grid;
    justify-content: start;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 25px;
    margin-left: 10%;
}

.headerh1 {
    width: 100px; /* Fija un ancho para el texto */
    text-align: center; 
    white-space: nowrap;
}

.headerh4 {
    width: 100px; /* Fija un ancho para el texto */
    text-align: center; 
    white-space: nowrap;
}

.headerh3 {
  margin-top: -1%;
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
import { getDocs, setDoc, Timestamp, doc, where, query, updateDoc, getDocFromServer, getDoc, collection } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';


export default defineComponent({
  name: 'CitaActual',
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
    }
  },
  data () {
    return {
      fecha: '' as string,
      edad: '' as string,
      alimentacion: '' as string,
      FC: '' as string,
      temperatura: '' as string,
      FR: '' as string,
      PA: '' as string,
      glucometro: '' as string,
      sat: '' as string,
      peso: '' as string,
      talla: '' as string,
      CC: '' as string,
      diagnostico: '' as string,
      textoDetalle: '' as string,
      ReconsultaDetalle: '' as string,
      EF_detalle: '' as string,
      TX_detalle: '' as string,
    }
  },
  methods: {
    async addCitaActual () {
      try {
        // Llamar a los datos existentes 
        const fecha2Arr = this.fecha_arr_temp;
        const edad2Arr = this.edad_arr_temp;
        const almin2Arr = this.alimentacion_arr_temp;
        const FC2Arr = this.FC_arr_temp;
        const temp2Arr = this.temperatura_arr_temp;
        const FR2Arr = this.FR_arr_temp;
        const PA2Arr = this.PA_arr_temp;
        const gluc2Arr = this.glucometro_arr_temp;
        const SAT2Arr = this.SAT_arr_temp;
        const peso2Arr = this.peso_arr_temp;
        const talla2Arr = this.talla_arr_temp;
        const CC2Arr = this.CC2_arr_temp;
        const diag2Arr = this.diagnostico_arr_temp;
        const txtDiag2Arr = this.txtDiagnostico_arr_temp;
        const EFArr = this.txtEF_arr_temp;
        const TXArr = this.txtTX_arr_temp;
        const reconsultaArr = this.txtReconsulta_arr_temp;
        const id_using = this.id_temp;
        const recetaArr = this.recetaCA_arr_temp;
        const FechaCreacion = new Date().toISOString().split('T')[0];

        // Agregar al array temporal
        if (this.edad !== '' && this.alimentacion !== '' && this.diagnostico !== '') {
          fecha2Arr.push(this.fecha ? this.fecha : FechaCreacion);
          edad2Arr.push(this.edad ? this.edad : '0');
          almin2Arr.push(this.alimentacion ? this.alimentacion : '--');
          FC2Arr.push(this.FC ? this.FC : '0');
          temp2Arr.push(this.temperatura ? this.temperatura : '0');
          FR2Arr.push(this.FR ? this.FR : '0');
          PA2Arr.push(this.PA ? this.PA : '0');
          gluc2Arr.push(this.glucometro ? this.glucometro : '0');
          SAT2Arr.push(this.sat ? this.sat : '0');
          peso2Arr.push(this.peso ? this.peso : '0');
          talla2Arr.push(this.talla ? this.talla : '0');
          CC2Arr.push(this.CC ? this.CC : '0');
          diag2Arr.push(this.diagnostico ? this.diagnostico : '--')
          txtDiag2Arr.push(this.textoDetalle ? this.textoDetalle : '--')
          recetaArr.push('--');
          EFArr.push(this.EF_detalle ? this.EF_detalle : '--')
          TXArr.push(this.TX_detalle ? this.TX_detalle : '--')
          reconsultaArr.push(this.ReconsultaDetalle ? this.ReconsultaDetalle : '--')

          // Agregar a la base de datos dependiendo de su coleccion
          const docRef = doc(CitaActualRef, id_using)
          
          // Agregar a la base de datos
          await updateDoc(docRef, {
            Fecha_CA: fecha2Arr,
            Edad_CA: edad2Arr,
            alimentacion_CA: almin2Arr,
            FC_CA: FC2Arr,
            temperatura_CA: temp2Arr,
            FR_CA: FR2Arr,
            PA_CA: PA2Arr,
            glucometro_CA: gluc2Arr,
            SAT_CA: SAT2Arr,
            peso_CA: peso2Arr,
            talla_CA: talla2Arr,
            CC_CA: CC2Arr,
            diagnostico_CA: diag2Arr,
            textoDetalle_CA: txtDiag2Arr,
            receta_CA: recetaArr,
            TX_CA: TXArr,
            EF_CA: EFArr,
            reconsulta_CA: reconsultaArr,

          })
          this.PropSucces('Se ha creado cita actual con exito')
          this.IrCA()
          // this.IrMostrarFicha()
        } else {
          this.PropError('Uno o más campos obligatorios están vacíos')
        }
      } catch (error) {
        this.PropError('No se ha podido guardar cita actual, ha ocurrido un error')
      }
    },

    IrCA () {
      this.$router.push({
        name: 'MostrarCA',
        params: {
          idDocumento: this.id_temp, 
          Fecha: this.fecha
        }
      })
    },
    
    IrMostrarFicha () {
      const id_using = this.id_temp;
      if (this.collection_temp == 'pediaRef') {
        this.$router.push(`/FichaMedica/${id_using}`);
      }
    },

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

  }, 
  setup (props) {
    // Variables temporales para guardar data de la bd
    const fecha_arr_temp = ref<string[]>([]);
    const edad_arr_temp = ref<string[]>([]);
    const alimentacion_arr_temp = ref<string[]>([]);
    const FC_arr_temp = ref<string[]>([]);
    const temperatura_arr_temp = ref<string[]>([]);
    const FR_arr_temp = ref<string[]>([]);
    const PA_arr_temp = ref<string[]>([]);
    const glucometro_arr_temp = ref<string[]>([]);
    const SAT_arr_temp = ref<string[]>([]);
    const peso_arr_temp = ref<string[]>([]);
    const talla_arr_temp = ref<string[]>([]);
    const CC2_arr_temp = ref<string[]>([]);
    const diagnostico_arr_temp = ref<string[]>([]);
    const txtDiagnostico_arr_temp = ref<string[]>([]);
    const txtReconsulta_arr_temp = ref<string[]>([]);
    const txtEF_arr_temp = ref<string[]>([]);
    const txtTX_arr_temp = ref<string[]>([]);
    const recetaCA_arr_temp = ref<string[]>([]);
    const id_temp = ref(props.idDocumento);
    const collection_temp = ref(''); 
    const fullName = ref('');

    // extraer datos de la bd 
    const obtenerDocumentos = async () => {
      try {
        const docRef = doc(CitaActualRef, props.idDocumento)
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          for (let el in data.Fecha_CA) {
            fecha_arr_temp.value.push(data.Fecha_CA[el])
            edad_arr_temp.value.push(data.Edad_CA[el])
            alimentacion_arr_temp.value.push(data.alimentacion_CA[el])
            FC_arr_temp.value.push(data.FC_CA[el])
            temperatura_arr_temp.value.push(data.temperatura_CA[el])
            FR_arr_temp.value.push(data.FR_CA[el])
            PA_arr_temp.value.push(data.PA_CA[el])
            glucometro_arr_temp.value.push(data.glucometro_CA[el])
            SAT_arr_temp.value.push(data.SAT_CA[el])
            peso_arr_temp.value.push(data.peso_CA[el])
            talla_arr_temp.value.push(data.talla_CA[el])
            CC2_arr_temp.value.push(data.CC_CA[el])
            diagnostico_arr_temp.value.push(data.diagnostico_CA[el])
            txtDiagnostico_arr_temp.value.push(data.textoDetalle_CA[el])
            recetaCA_arr_temp.value.push(data.receta_CA[el])
            txtReconsulta_arr_temp.value.push(data.reconsulta_CA[el])
            txtEF_arr_temp.value.push(data.EF_CA[el])
            txtTX_arr_temp.value.push(data.TX_CA[el])
          }
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se ha encontrado una ficha',
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

    const obtenerColeccion = async () => {
      try {
        const docRef = doc(pediaRef, props.idDocumento)
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          collection_temp.value = 'pediaRef'
          fullName.value = (docSnapshot.data().ApellidosPa + ', ' + docSnapshot.data().NombresPa).toLocaleUpperCase();
        } else {
          const Toast: SweetAlertOptions = {
            toast: true,
            timer: 6000,
            icon: "error",
            position: "top-end",
            timerProgressBar: true,
            showConfirmButton: false,
            title: "Paciente no ha sido encontrado",
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }
          Swal.fire(Toast);
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
    // llamar a la funcion al entrar a la vista
    onMounted(() => {
      obtenerDocumentos();
      obtenerColeccion();
    });

    return {
      fecha_arr_temp,
      edad_arr_temp,
      alimentacion_arr_temp,
      FC_arr_temp,
      temperatura_arr_temp,
      FR_arr_temp,
      PA_arr_temp,
      glucometro_arr_temp,
      SAT_arr_temp,
      peso_arr_temp,
      talla_arr_temp,
      CC2_arr_temp,
      recetaCA_arr_temp,
      diagnostico_arr_temp,
      txtDiagnostico_arr_temp,
      txtReconsulta_arr_temp,
      txtEF_arr_temp,
      txtTX_arr_temp,
      id_temp,
      collection_temp,
      fullName,
    }
  }
})
</script>
