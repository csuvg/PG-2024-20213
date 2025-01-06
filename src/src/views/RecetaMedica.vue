<template>
    <Header class="Header"/>
    <body>
      <div class="conteiner">
        <div class="Options">
          <div class = "UpperSide5">
          <BackBtn class ="back" @click="gotoHistorial"/>
          <FontsCat class ="nameTitle" type="subtitulo1" text="Receta Médica"/>
          </div>
        </div>
        <div v-if="cargar" class="loading">Cargando...</div>
        <div v-else class="Receta">
          <div class="RecetaConteiner"> 
            <div class="Circle"/>
            <div class="HeaderReceta">
              <div class="ConteinerLogo">
                <img src="../assets/logo_t2.png" alt="Logo de la aplicacion" class="logo" />
              </div>
              <div class="TextConteiner">
                <FontsCat type="HeaderReceta" :text="'CLÍNICA PEDRIATICA ' + C_name.toLocaleUpperCase() "/>
                <FontsCat type="Text_P" class="valText" :text="D_name"/>
                <FontsCat type="Text_P" class="valText" :text="'Télefono: ' + C_Tel"/>
              </div>
            </div>
            <hr class="line"/>
            <div class="MainContainer">
              <div class="Info">
                <div class="Data">
                  <div class="FechaIn">
                    <FontsCat type="Text_B" text="Guatemala,"/>
                    <FontsCat type="Text_B" :text="FechaVisita"/>
                  </div>
                  <div class="PascienteIN">
                    <FontsCat type="Text_B" text="Paciente:"/>
                    <FontsCat type="Text_B" :text="fullNameReceta"/>
                  </div>  
                </div>
                <div class="Containter_square">
                  <div class="Square">
                    <div class="InfoConteiner">
                      <div class="RowInfo" v-for="(element, index) in medicamento" :key="index">
                        <FontsCat class="med" type="Text_B" :text="medicamento[index]" />
                        <FontsCat class="dos" type="Text_B" :text="dosis[index].toLowerCase()" style="margin-top: -19px; margin-left: 5%;" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="TextFot">
                <div class="IconText">
                    <fa class='iconConf' icon="fa-location-dot"  />
                    <FontsCat type="Text_P" class="valText" :text="C_Ubicacion"/>
                    <fa class='iconConf' icon="fa-phone"  />
                    <FontsCat type="Text_P" class="valText" :text="D_Tel"/>
                </div>
                <div class="IconText">
                    <fa class='iconConf' icon="fa-clock"  />
                    <FontsCat type="Text_P" class="valText" :text="'Lunes a Viernes de ' + C_horarioLV + ' horas'"/>
                </div>
                <div class="IconText">
                    <fa class='iconclock2' icon="fa-clock"  />
                    <FontsCat type="Text_P" class="valText" :text="'Sábado de ' + C_horarioS + ' horas'"/>
                </div>
            </div>
            <div class="Circle2"/>
            <div class="Circle3"/>
          </div>
        </div>
        <div class = "BTNCon2">
          <ButtonApp class="BTn" buttonText="Imprimir" actionType="saveData" @click="imprimir" />
          <ButtonApp class="BTn" buttonText="Actualizar Historial" actionType="saveData" @click="updateCA"/>
        </div> 
      </div>  
    </body>
    <Footer/>
</template>

// ------------------  STYLE -------------------
<style scoped lang="scss" >
.UpperSide5{
  display:flex;
  align-items: center;
  justify-content: start;
  margin-left: 10%;
  width: auto;
  flex-direction: row;
  margin-bottom:2%;
}

.DownSide{
  display:flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
}

.nameTitle{
  margin-left: 5%;
  margin-top: 4%;
}

.Receta{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.RecetaConteiner{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width:  215.9mm;
  height: 278.0mm;
  border: 1px solid black;
  position: relative;
  overflow: hidden;
}

.HeaderReceta{
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 27% 65%;
  width: 90%;
  margin-top: 3%;
  margin-left: 7%;
}

.logo {
  max-width: 100%;
  max-height: 12em;
  margin-left: -9%;
}

.iconclock2{
  color:white;
}

.TextConteiner{
  display: grid;
  width: 95%;
  grid-template-rows: 40px 30px 30px;
  justify-items: start;
  margin-left: 12%;
}

.TextFot {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 10%;
  margin-top: 0%;
}

.IconText{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 4%;
  margin-top: -3%;
  margin-left: 8%;
}

.TextC{
  display: grid;
  align-items: center;
  margin-top: 3%;
  justify-items: start;
  grid-template-columns: 70% 7% 46%;
}

.Circle{
  height: 105px;
  width: 105px;
  background-color: #E5BE01;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  margin: -3% 0% 0% -91%;
}

.Circle2{
  height: 125px;
  width: 125px;
  background-color: #F14457;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  margin: 120% 0% 0% 90%;
}

.Circle3{
  height: 100px;
  width: 100px;
  background-color: #55A112;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  margin: 110% 0% 0% 101%;
}

.line{
    border: 1px solid #545454;
    width: 90%;
}

.valText{
  font-size: 16px;
}

.MainContainer {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  height: auto;
  margin-top: 2%;
  justify-content: center;
}

.Doctors{
  height: auto;
  width: auto;
}

.Info{
  display: flex;
  flex-direction: column;
  height: auto;
  width: 80%;
}

.Containter_square{
  display: flex;
  height: 80%;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: -5%;
}

.Square{
  height: 95%;
  width: 95%;
  border: 1px solid black;
  border-radius: 25px;
}

.Data {
  height: auto;
  width: 100%;
  margin-top: 0%;
}

.PascienteIN{
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 40px;
  margin-bottom: 5%;
}

.FechaIn{
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 20px;
  margin-bottom: -3%;
}

.BTNCon2{
  display:flex;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
  margin-bottom: 4%;
  column-gap: 80px;
}

.InfoConteiner{
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden; 
  direction: rtl;
}

.med{
  font-weight: bold;
}

.RowInfo {
  display: grid;
  grid-template-rows: repeat(2, auto); 
  justify-items: end;
  margin-top: -1%;
  width: 95%;
  row-gap: 2px;
}

.dos {
  font-size: 17px;
}
 // Opcion para quitar los margenes de la pagina al darle print
@page {
    margin: 0;
 }

@media screen and (max-width: 600px) {
  .BTNCon{
    flex-direction: column;
    row-gap: 10px;
  }
  .MainContainer{
    margin-top: 10% ;
  }
  .PascienteIN{
    column-gap: 5%;
  }
  .TextConteiner{
    grid-template-rows: 20px 50px 50px 50px 20px;
    align-items: center;
  }
  .logo {
    width: 100px;
    height: 100px;
    margin-left: -9%;
  }
  .valText{
  font-size: 14px;
  }
  .HeaderReceta{
  grid-template-columns: 25% 78%;
  }
}

// opcion para que aparezcan los background graphics y quite los elementos 
@media print {
  body * {
    visibility: hidden; 
    -webkit-print-color-adjust: exact; 
    print-color-adjust: exact; 
  }

  .RecetaConteiner, .RecetaConteiner * {
    visibility: visible; /* Haz visible el contenedor y su contenido */
  }

  .RecetaConteiner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}

</style>

// ------------------  SCRIPT -------------------
<script lang="ts">
import { defineComponent, ref, onMounted, computed, inject, getCurrentInstance } from 'vue';

import BackBtn from '../components/BackBtn.vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import ButtonApp from '../components/ButtonsApp.vue';
import FontsCat from '../components/FontsCat.vue';
import InputBox from '../components/InputBox.vue';

import { useStore } from 'vuex';
import { getDocs, where, query, updateDoc, doc, getDoc } from 'firebase/firestore';
import { pediaRef, CitaActualRef, ConfiRef } from "../firebajse";

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

import CryptoJS from 'crypto-js';
import { useRoute } from 'vue-router';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';

export default defineComponent({
  name: 'RecetaMedica',
  components: {
    Header,
    Footer,
    ButtonApp,
    BackBtn,
    FontsCat,
  },

  props: {
    idDocumento: {
      type: String, 
      required: true
    },
  },

  data () {
    return {
      medicamento: [] as string[],
      dosis: [] as string[],
      fullNameReceta: '' as string,
      cargar: false as boolean,
      FechaVisita: '' as string,
      
    }
  }, 

  methods: {
    PropSucces (title1: string) {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
        icon: "success",
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

    ToastNoti (title1: string) {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
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
    
    gotoHistorial () {
      const id = this.idDocumento
      this.$router.push({
        name: 'Medicamentos_Recetar',
        params: {
          idDocumento: id
        }
      });
    },

    imprimir () { 
      window.print(); 
    }, 

    async getName () {
      const id = this.idDocumento;
      const fechaENG = new Date().toISOString().split('T')[0];
      const [year, month, day] = fechaENG.split('-');
      this.FechaVisita = `${day}/${month}/${year}`;
    
      try {
        const querySnapshot = await getDocs(query(pediaRef, where('__name__', '==', id)));
        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0]; // Suponiendo que solo hay un documento con ese ID
          const name = docSnapshot.data().NombresPa;
          const lastname = docSnapshot.data().ApellidosPa;
          const NombreReceta = name.concat(' ', lastname);
          this.fullNameReceta = NombreReceta.toUpperCase(); 
        } 
      } catch (error) {
        this.ToastError('Error al obtener nombre');
      } finally {
        this.cargar = false; // Update the loading state here
      }
    },

    ChangeFormat (fechaOriginal: string) {
      const partes = fechaOriginal.split('/');
      const dia = partes[0];
      const mes = partes[1];
      const año = partes[2];

      return `${año}-${mes}-${dia}`;
    },

    getIndex (fecha: string, fechas: string[]) {
      const dateF = this.ChangeFormat(fecha)
      for (let i = 0; i < fechas.length; i++) {
        if (fechas[i] == dateF) {
          return i; 
        }
      }
      return -1; 
    },

    dataClean () {
      const dataArr = this.arrayMed;
      dataArr.forEach((subArray: any) => {
        this.medicamento.push(subArray[0]);
        this.dosis.push(subArray[1])
      });
      this.getName()
    },

    async updateCA () {
      const id = this.idDocumento
      try {
        const docSnapshot = await getDocs(query(CitaActualRef, where('__name__', '==', id)));
        if (!docSnapshot.empty) {
          const data = docSnapshot.docs[0].data()
          const fechas = data.Fecha_CA
          const receta = data.receta_CA
          const newData = { ...data };
          const index = this.getIndex(this.FechaVisita, fechas)

          if (index !== -1) {
            const medicamentoString = this.medicamento.toString().replaceAll(',', '-');
            newData.receta_CA[index] = medicamentoString;
            await updateDoc(doc(CitaActualRef, id), newData);
            this.PropSucces("Documento actualizado con éxito")
            // this.$router.push({
            //   name: 'HistorialMedico',
            //   params: {
            //     idDocumento: this.idDocumento, 
            //   }
            // })
          } else {
            this.ToastNoti("No existe un cita actual para la fecha ingresada")
          }
        }
      } catch (error) {
        this.ToastError("Ocurrio un error al actualizar cita actual")
      }
    }
  },

  setup (props: any) {
    const id = ref(props.idDocumento);
    const C_name = ref(''); 
    const C_Ubicacion = ref(''); 
    const C_horarioLV = ref(''); 
    const C_horarioS = ref(''); 
    const C_Tel = ref(''); 
    const D_name = ref(''); 
    const D_Tel = ref(''); 
    const D_coleg = ref(''); 

    const store = useStore();
    const instance = getCurrentInstance();
    const arrayMed = computed(() => store.getters.getArrayMed);

    const obtenerClinica = async () => {
      try {
        if (!instance) return; // Salir de la función si no hay instancia
        const { proxy } = instance as unknown as { proxy: { dataClean: () => void } };
        const docRef = doc(ConfiRef, "ClinicaInfo")
        const docSnapshot = await getDoc(docRef); 
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          C_name.value = data.N_Clinica,
          C_Ubicacion.value = data.Ubicacion,
          C_horarioLV.value = data.Horario_LV,
          C_horarioS.value = data.Horario_S,
          C_Tel.value = data.Tel_Clinica,
          D_name.value = data.N_Doctor,
          D_Tel.value = data.Tel_doc,
          D_coleg.value = data.Colegiado
        }
        if (proxy) {
          proxy.dataClean();
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
    };
    
    onMounted(() => {
      obtenerClinica()
    });

    return {
      C_name,
      C_Ubicacion,
      C_horarioLV,
      C_horarioS,
      C_Tel,
      D_name,
      D_Tel,
      D_coleg,
      arrayMed
    };
  }
});

</script>
