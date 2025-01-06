<template>
  <HeaderApp class="Header"/>
    <body>
      <div class="UpperSide">
            <BackBtn class="back" ruta="/Configuraciones" />
            <FontsCat class="headerh7" type="subtitulo1" text="Administración de la Clínica"/>
      </div>
      <div class="ContainerPrincipal">   
          <div class="DataDocF" style="margin-bottom: 3%;">
            <div class="DatosDoc">
              <div class = "TitleDP">
                <FontsCat class ="headerh1" type="subtitulo2" text='Datos del doctor'/> 
            </div>
            <div class="ContData">
              <div class="Data1">
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Nombre:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del doctor" minWidth="100%" maxWidth="354%" margin-left="-4%" v-model="NameDoc"></InputBox>
                </div>
              </div>
              <div class="Data">
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Colegiado:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese número de colegiado" minWidth="100%" maxWidth="135%" margin-left="-12%" v-model="ColegDoc"></InputBox>
                </div>
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Telefono:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese el número telefonico" minWidth="100%" maxWidth="140%" margin-left="-10%" v-model="TelDoc"></InputBox>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div class="DataCliF">
            <div class="DatosDoc">
              <div class = "TitleDP">
                <FontsCat class ="headerh1" type="subtitulo2" text='Datos de la Clinica'/> 
            </div>
            <div class="ContData">
              <div class="Data1">
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Nombre:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre de la clinica" minWidth="100%" maxWidth="354%" margin-left="-4%" v-model="NameCli"></InputBox>
                </div>
              </div>
              <div class="Data">
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Ubicación:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese Direccion" minWidth="100%" maxWidth="140%" margin-left="-12%" v-model="UbicacionC"></InputBox>
                </div>
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Telefono:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese número telefonico de la clinica" minWidth="100%" maxWidth="140%" margin-left="-12%" v-model="TelCli"></InputBox>
                </div>
              </div>
              <div class="Data">
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Horario 1:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese el horario de Lunes a Viernes" minWidth="100%" maxWidth="140%" margin-left="-6%" v-model="HLV"></InputBox>
                </div>
                <div class="IT">
                  <FontsCat class ="headerh1" type="Text_B" text='Horario 2:'/>
                  <InputBox class= "inpt inptM2" placeholder="Ingrese el horario del Sábado" minWidth="100%" maxWidth="136%" margin-left="-10%" v-model="HS"></InputBox>
                </div>
                
              </div>
            </div>
            </div>
          </div>
          <div class = "Botones">
            <ButtonApp buttonText="Actualizar datos" actionType="saveData" @click="ActualizarInfoClinica"></ButtonApp>
          </div>
      </div>      
    </body>
  <Footer class="footer"/>  
</template>

<style scoped lang="scss">
  .footer{
    margin-top: 1%;
  }
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
  .ContainerPrincipal{
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .tituloPagina {
   display: flex;
   align-content: flex-start;
   justify-content: flex-start;
   align-items: flex-start;
   margin-top: 5%;
   margin-left: 3%; // corre la parte del titulo 
   margin-bottom: 1%;
  }
  .DatosDoc{
    margin-top: -1%;
    display: flex;
    flex-direction: column;
  }

  .TitleDP{
    display:flex;
    align-items: start;
    justify-content: start;
    margin-left: 8%;
    margin-bottom: -2%;
  }

  .Data {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: 5%;
  }

  .Data1 {
    display: flex;
    width: 100%;
    flex-direction: row;
    // align-items: center;
    // justify-content: center;
    margin-left: 10%;
  }

  .IT{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 9%;
    width: 45%;
  }
  .ContData{
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .Botones  {
    display: flex;
    flex-direction: row;
    margin-top: 3%;
    justify-content: center;
    align-content:center;
    align-items: center;
}
.DataDocF, .DataCliF {
  width: 80%;
  justify-content: center;
  align-content:center;
  align-items: center;
}
  
</style>

<script lang="ts"> 
import { defineComponent, ref, onMounted } from 'vue';
import HeaderApp from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';
import InputBox from '../components/InputBox.vue';
import ButtonApp from '../components/ButtonsApp.vue';
import BackBtn from '../components/BackBtn.vue';

import { addDoc, doc, getDoc, updateDoc, query } from 'firebase/firestore';
import { FinanzasRef, ConfiRef } from '../firebajse'; 

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

export default defineComponent({
  name: 'InformacionClinica',
  components: {
    HeaderApp,
    FontsCat,
    Footer,
    InputBox,
    ButtonApp,
    BackBtn
  }, 
  setup (props: any) {
    const TelDoc = ref('');
    const NameDoc = ref('');
    const ColegDoc = ref('');
    const NameCli = ref('');
    const UbicacionC = ref('');
    const TelCli = ref('');
    const HLV = ref('');
    const HS = ref('');

    const dataCC = async () => {
      try {        
        const docRef = doc(ConfiRef, 'ClinicaInfo')
        const docSnapShot = await getDoc(docRef)

        if (docSnapShot.exists()) {
          // const doc = docSnapShot.doc(); // Obtén el primer documento (debería ser solo uno)
          const data = docSnapShot.data();
          TelDoc.value = data.Tel_doc;
          NameDoc.value = data.N_Doctor;
          ColegDoc.value = data.Colegiado;
          NameCli.value = data.N_Clinica;
          UbicacionC.value = data.Ubicacion;
          TelCli.value = data.Tel_Clinica;
          HLV.value = data.Horario_LV;
          HS.value = data.Horario_S;
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
    }

    
    const ActualizarInfoClinica = async () => {
      try {
        const docRef = doc(ConfiRef, 'ClinicaInfo')
        const docSnapShot = await getDoc(docRef)

        if (docSnapShot.exists()) {
          const data = docSnapShot.data(); // Obtener los datos del documento
          const newData = { ...data }; // copia los datos originales.

          newData.Colegiado = ColegDoc.value
          newData.Horario_LV = HLV.value
          newData.Horario_S = HS.value
          newData.N_Clinica = NameCli.value
          newData.N_Doctor = NameDoc.value
          newData.Tel_Clinica = TelCli.value
          newData.Tel_doc = TelDoc.value
          newData.Ubicacion = UbicacionC.value
          // se actualiza el documento
          await updateDoc(doc(ConfiRef, 'ClinicaInfo'), newData);

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

    onMounted(() => {
      dataCC();
    });

    return {
      TelDoc,
      NameDoc,
      ColegDoc,
      NameCli,
      UbicacionC,
      TelCli,
      HLV,
      HS,
      ActualizarInfoClinica
    }
  }
}); 
</script>
