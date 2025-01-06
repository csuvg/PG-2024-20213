<template>
  <Header />
    <body>
      <div class="Options">
          <div class = "UpperSide">
              <BackBtn class ="back" ruta="/agendar"/>
              <FontsCat class ="headerh1" type="subtitulo1" text='Nuevo Expediente'/>
          </div>
      </div>

      <div class = "DatosPersonales">
        <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Datos personales'/>
        </div>
        <div class = "CDP">
            <div class ="DP">
            <InputBox class= "inpt inptM"  placeholder="Ingrese los nombres del paciente *" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="NombresPaciente"></InputBox>
            <InputBox class= "inpt inptM2" placeholder="Ingrese los apellidos del paciente *" minWidth="100%" maxWidth="80%" margin-left="1%" v-model="ApellidosPaciente"></InputBox>
            </div>
            <div class ="DP2">
            <InputBox class= "inpt" placeholder="Ingrese sexo *" minWidth="100%" maxWidth="77%" v-model="Sexo"></InputBox>
            <InputBox class= "inpt" type="text" placeholder="Ingrese edad *" minWidth="100%" maxWidth="77%" v-model="Edad"></InputBox>
            <InputBoxDate class="inpt"  type="text"  placeholder="Fecha de nacimiento *" minWidth="100%" maxWidth="77%" v-model="FechaNacimiento"></InputBoxDate>
            </div>
            <div class="DP1">
              <InputBox class= "inpt2" placeholder="Direción de residencia *" minWidth="90%" maxWidth="81%" margin-left="-2%" v-model="Direccion"></InputBox>
            </div>
        </div>
        <div class="DEC">
          <div class="DPECont">
            <div class ="DPE" v-for="(element, index) in valuesDP" :key="index">
              <InputBox class= "inpt inptM"  :placeholder="`Ingrese valor de ${element}`" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="inputValuesDP[element]"/>
            </div>
          </div>
        </div>
      </div>

      <div class = "DatosEncargados">
        <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Datos del encargado'/>
        </div>
        <div class = "ENC">
            <div class ="DP">
              <InputBox class= "inpt inptM4" placeholder="Ingrese los nombres del encargado *" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="NombreEncargado"></InputBox>
              <InputBox class= "inpt inptM5" placeholder="Ingrese los apellidos del encargado *" minWidth="100%" maxWidth="80%" margin-left="1%" v-model="ApellidoEncargado"></InputBox>
            </div>
            <div class ="DP">
            <InputBox class= "inpt inptM4" type="number" placeholder="Ingrese edad del encargado" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="EdadEncargado"></InputBox>
            <InputBox class= "inpt inptM5" placeholder="Ingrese parentesco del encargado" minWidth="100%" maxWidth="80%" margin-left="1%" v-model="ParentescoEncargado"></InputBox>
            </div>
            <div class ="DP">
              <InputBox class= "inpt inptM7"  type="number" placeholder="Ingrese número telefonico del encargado" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="TEL"></InputBox>
              <InputBox class= "inpt inptM2" type="number" placeholder="Ingrese DPI del encargado *" minWidth="100%" maxWidth="80%" margin-left="1%" v-model="DPI"></InputBox>
            </div>
            <div class = "contError">
              <div class = "tempCont">
                  <div v-if="outRangeCUI" class="error-message">
                  <FontsCat type="Error" text='Error: El telefono debe tener 8 numeros.'/>
                  </div>
              </div>
              <div class="tempCont">
                  <div v-if="outRangeDPI" class="error-message">
                  <FontsCat type="Error" text='Error: El DPI debe tener 13 caracteres.'/>
                  </div>
              </div>
            </div>
            <div class="DEC">
              <div class="DPECont">
                <div class ="DPE" v-for="(element, index) in valuesDE" :key="index">
                  <InputBox class= "inpt inptM"  :placeholder="`Ingrese valor de ${element}`" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="inputValuesDP[element]"/>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div class ="AntecedentesPrenatales">
        <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Antecedentes Prenatales'/>
        </div>
        <div class="OpcBin">
          <div class="TitleOpt">
            <div class = "AntP">
                <div class = "Texb">
                    <FontsCat class ="headerh1" type="Text_B" text='Tipo de parto'/>
                </div>
            </div>
            <div class= "OptInp">
                <div class= "OptSeg">
                <CircleOption :options="['PES', 'CSTP']" v-model="Tparto"/>
                </div>
            </div>
          </div>
          <div class="TitleOpt">
            <div class = "AntP">
                <div class = "Texb">
                    <FontsCat class ="headerh1" type="Text_B" text='Prematuro'/>
                </div>
            </div>
            <div class= "OptInp">
                <div class= "OptSeg">
                <CircleOption :options="['Si', 'No']" v-model="Prematuro"/>
                </div>
            </div>
          </div>
        </div>
        <div class ="DP2">
            <InputBox class= "inpt"  placeholder="Ingrese peso al nacer" minWidth="100%" maxWidth="77%" v-model="Peso"></InputBox>
            <InputBox class= "inpt"  placeholder="Ingrese Talla" minWidth="100%" maxWidth="77%" v-model="Talla"></InputBox>
            <InputBox class= "inpt"  type="number" placeholder="Ingrese partos" minWidth="100%" maxWidth="77%" v-model="P"></InputBox>
        </div>
        <div class ="DP2">
            <InputBox class= "inpt"  type="number" placeholder="Ingrese gestaciones" minWidth="100%" maxWidth="77%"  v-model="G"></InputBox>
            <InputBox class= "inpt"  type="number" placeholder="Ingrese cesarias" minWidth="100%" maxWidth="77%"  v-model="C"></InputBox>
            <InputBox class= "inpt"  type="number" placeholder="Ingrese abortos" minWidth="100%" maxWidth="77%" v-model="ab"></InputBox>
        </div>
        <div class="Complicaciones">
          <InputBoxBigger placeholder="Ingrese complicaciones..." minWidth="80%" v-model="Complicaciones" style="margin-left: -2%;"/>
        </div>
        <div class="DEC">
          <div class="DPECont">
            <div class ="DPE" v-for="(element, index) in valuesPRE" :key="index">
              <InputBox class= "inpt inptM"  :placeholder="`Ingrese valor de ${element}`" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="inputValuesDP[element]"/>
            </div>
          </div>
        </div>
      </div>

      <div class = "Vacunas">
        <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Esquema de vacunación'/>
        </div>
        <div class = "AntP">
          <div class = "VacunasC">
              <div class="ConteinerVac"  v-for="(element, index) in valuesArray" :key="index" style="cursor: pointer;">
                <FontsCat class ="Tblack" type="Text_B" :text='element[0]'/>
                <CheckBox class = "boxOpt"  :options='element[1]' v-model="inputValuesVAC[element[0]]"/>
              </div>
          </div>
      </div>
      </div>

      <div class ="AntePat">
        <div class = "TitleDP">
          <FontsCat class ="headerh1" type="subtitulo2" text='Antecedentes patológicos'/>
        </div>
        <div class = "AntMe">
            <InputBoxBigger placeholder="Antecedentes médicos" minWidth="95%" maxWidth="75.8%" v-model="Antmedicos"/>
            <InputBoxBigger placeholder="Antecedentes quirúrgicos" minWidth="95%" maxWidth="75.8%" v-model="Antquirurgicos"/>
            <InputBoxBigger placeholder="Antecedentes alérgicos" minWidth="95%" maxWidth="75.8%" v-model="Antalergicos"/>
        </div>
        <div class="DEC">
          <div class="AntMe">
            <div class ="DPE" v-for="(element, index) in valuesPAT" :key="index">
              <InputBoxBigger :placeholder="`Ingrese valor de ${element}`" minWidth="95%" maxWidth="75.8%" v-model="inputValuesDP[element]"/>
            </div>
          </div>
        </div>
      </div>

      <div class ="AnteOt">
        <div class = "TitleDP">
        <FontsCat class ="headerh1" type="subtitulo2" text='Otros antecedentes'/>
        </div>
        <div class = "AntMe">
            <InputBoxBigger placeholder="Ingrese Hábitos" minWidth="95%" maxWidth="75.8%" v-model="AntHabitos"/>
            <InputBoxBigger placeholder="Ingrese Alimentación" minWidth="95%" maxWidth="75.8%" v-model="AntAlimentacio"/>
            <InputBoxBigger placeholder="Antecedentes familiares" minWidth="95%" maxWidth="75.8%" v-model="AntFam"/>
        </div>
        <div class="DEC">
          <div class="AntMe">
            <div class ="DPE" v-for="(element, index) in valuesOTR" :key="index">
              <InputBoxBigger :placeholder="`Ingrese valor de ${element}`" minWidth="95%" maxWidth="75.8%" v-model="inputValuesDP[element]"/>
            </div>
          </div>
        </div>
      </div>

      <div class = "DataAdicional">
        <div class="ConteinerDA" v-for="(item, index) in valuesArrayDA" :key="index">
          <div class = "TitleDP">
            <FontsCat class="headerh1" type="subtitulo2" :text="item[0]"/>
          </div>
          <div  class ="DEC" v-for="(value, key) in item[1]" :key="key">
            <div class ="DPECont" v-if="String(key) === 'Campo de texto mediano'" > 
              <div v-for="(val, indx) in value" :key="indx">
                <InputBox class= "inpt inptM"  :placeholder="`Ingrese valor de ${val}`" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="inputValuesDP[val]"/>
              </div>
            </div>
            <div class="AntMe" v-else-if="String(key) === 'Campo de texto grande'">
              <div v-for="(val, indx) in value" :key="indx">
                <InputBoxBigger :placeholder="`Ingrese valor de ${val}`" minWidth="95%" maxWidth="75.8%" v-model="inputValuesDP[val]"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class = "CBTN">
          <Button buttonText="Ingresar ficha" actionType="saveData" @click="crearDocumento"></Button>
      </div>
    </body>
  <Footer/>
</template>

<style scoped lang="scss">
.boxOpt{
    margin-left: -10%;
    height: 70%;
}

.contError {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width:90%;
    margin-left: 4.5%;
    flex-direction: row;
}

.tempCont {
    flex: 1;
}

.error-message {
    display: flex;
    justify-content: center;
    width: 95%;
    margin-left: 2%;
}

.Tblack{
    width: 45%;
    display: flex;
    margin-left: 25%;
    align-items: flex-start;
}

.ConteinerVac{
    display: grid;
    align-items: center;
    grid-template-rows:  50px;
    grid-template-columns: 7fr 10fr ;
}

.TitleDP{
    display:flex;
    align-items: start;
    justify-content: start;
    margin-left: 6.2%;
}

.Texb{
    display:flex;
    height:40px;
    align-items: center;
    justify-content: start;
    margin-left: 6.6%;
}

.CBTN{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top: 2%;
    margin-bottom: 2%;
    padding: 10px;
}

.AntMe{
    width:88.6%;
    margin-left: 4.45%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr ;
    grid-gap: 5px;
}

.OptInp{
    width:90%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 7fr 10fr ;
    grid-gap: 5px;
    margin-left: 4.9%;
}

.OptSeg{
    margin-left: 7.5%;
    display:flex;
    align-items: start;
    justify-content: start;
    width: 40%;
}

.DP{
    width:90%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 3fr 3fr ;
    grid-gap: 5px;
    margin-left: 4.8%;
}

.DP2{
    width:88.6%;
    margin-left: 5.4%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 4fr 4fr 4fr ;
    grid-gap: 5px;
}

.DP1{
    width:90%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 1fr ;
    grid-gap: 5px;
    margin-left: 4.8%;
}

.inpt{
    box-sizing: border-box;
    flex: 1; /* Permite que los inputs crezcan de manera equitativa */
    margin-right: 10px;
}

.inpt2{
    box-sizing: border-box;
    flex: 1;
}

.UpperSide{
    display:flex;
    align-items: start;
    justify-content: start;
    margin-left: 10%;
    width: auto;
}

.back{
    margin-top: 1.5%;
}

.headerh1{
    margin-left: 1.5%;
}

.DPECont {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  width:90%;
  margin-left: 4.9%;
}

.OpcBin {
  display: flex;
  justify-content: flex-start;
  margin-left: 6%;
}

.TitleOpt {
  display: flex;
  flex-direction: column;
}


//Smaller screen
@media screen and (max-width: 600px) {
.DP{
    width:90%;
    display: grid;
    grid-template-rows:  50px;
    grid-template-columns: 4fr ;
}

.DP2{
    width:90%;
    display: grid;
    grid-template-rows:  50px;
    grid-template-columns: 4fr ;
}

.inpt{
    box-sizing: border-box;
    flex: 1; /* Permite que los inputs crezcan de manera equitativa */
}

.OptInp{
    width:90%;
    display: grid;
    grid-template-rows:  50px;
    grid-template-columns: 4fr;
}

.AntMe{
    margin-top: -8px;
}

.ConteinerVac{
    display: grid;
    align-items: center;
    grid-template-rows:  50px;
    grid-template-columns: 4fr 10fr ;
}

.boxOpt{
    margin-left: 10%;
}

.inpt2{
    width: 97.5%;
    margin-left: 1.6%;
}

.Tblack{
    width: 90%;
    display: flex;
    margin-left: 25%;
    align-items: flex-start;
}

.contError {
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.inptM{
    width: 97%;
    margin-left: 9%;
}

.inptM2{
    width: 97.2%;
    margin-left: 6.5%;
}

.inptM4{
    width: 97.2%;
    margin-left: 3%;
}

.inptM5{
    margin-left: -0.9%;
}

.inptM7{
    width: 97%;
    margin-left: 3%;
}

.tempCont {
    width: 100%;
}

.swal2-container .swal2-popup{
    color: purple !important;
}

.swal2-title .swal2-container .swal2-center .swal2-backdrop-show{
    color:#eb1414;
    // font-family:inherit;
    // font-size:1rem}

}}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import { pediaRef, CitaActualRef, ConfiRef } from "../firebajse";
import BackBtn from '../components/BackBtn.vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import Button from '../components/ButtonsApp.vue';
import InputBox from '../components/InputBox.vue';
import FontsCat from '../components/FontsCat.vue';
import CheckBox from '../components/CheckBox.vue';
import InputBoxDate from '../components/InputBoxDate.vue';
import CircleOption from '../components/CircleOption.vue';
import InputBoxBigger from '../components/InputBoxBigger.vue';
import { getDocs, setDoc, Timestamp, doc, getDoc } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';


export default defineComponent({
  name: 'PediatriaF',
  components: {
    Header,
    Footer,
    Button,
    BackBtn,
    CheckBox,
    FontsCat,
    InputBox,
    InputBoxDate,
    CircleOption,
    InputBoxBigger
  },
  data () {
    return {
      NombresPaciente: '' as string,
      ApellidosPaciente: '' as string,
      Sexo: '' as string,
      Edad: '' as string,
      FechaNacimiento: '' as string,
      Direccion: '' as string,
      NombreEncargado: '' as string,
      ApellidoEncargado: '' as string,
      EdadEncargado: '' as string,
      ParentescoEncargado: '' as string,
      TEL: '' as string,
      DPI: '' as string,
      Tparto: '' as string,
      Prematuro: '' as string,
      G: '' as string,
      P: '' as string,
      C: '' as string,
      ab: '' as string,
      Peso: '' as string,
      Talla: '' as string,
      Complicaciones: '' as string,
      Antmedicos: '' as string,
      Antquirurgicos: '' as string,
      Antalergicos: '' as string,
      AntHabitos: '' as string,
      AntAlimentacio: '' as string,
      AntFam: '' as string,
      outRangeDPI: false,
      outRangeCUI: false,
      valuesArray: [] as any[][],
      valuesArrayDA: [] as any[][],
      inputValuesDP: {} as { [key: string]: string },
      inputValuesVAC: {} as { [key: string]: any[] },

      num: 0 as number,
    };
  },
  methods: {
    validateDpi (value:string) {
      return value.length !== 13;
    },
    validateTel (value:string) {
      return value.length !== 8;
    },
    PropError () {
      const swalOptions: SweetAlertOptions = {
        timer: 1800,
        icon: 'error',
        position: 'center',
        showConfirmButton: false,
        cancelButtonText: "No, cancel!",
        title: 'Ha ocurrido un error',
      };
      Swal.fire(swalOptions);
    },
    PropSucces () {
      const Toast: SweetAlertOptions = {
        toast: true,
        timer: 6000,
        icon: "success",
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        title: "Ficha creada con exito",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      }
      Swal.fire(Toast);
    },
    CheckNulls () {
      if (this.NombresPaciente !== '' && this.ApellidosPaciente !== '' && this.Sexo !== '' && this.Edad !== '' &&
            this.FechaNacimiento !== '' && this.Direccion !== '' && this.DPI !== '' && this.NombreEncargado !== '' && this.ApellidoEncargado !== ''
      ) {
        return false
      } else {
        return true
      }
    },
    ToastError (title2:string) {
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
    getVacunas () {
      let arrIn: any[][] = [];
      const ArrOrder = Object.entries(this.ListVac[0]).sort((a, b) => a[0].localeCompare(b[0]));
      const ArrDAOrder = Object.entries(this.ListDA[0]).sort((a, b) => a[0].localeCompare(b[0]));

      for (const [key, value] of ArrOrder) {
        const regularArray = Array.from(value);
        arrIn.push([key, regularArray])      
        this.inputValuesVAC[key] = []
      }
      this.valuesArray = arrIn
      this.valuesArrayDA = ArrDAOrder
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
    getDefaults () {
      // Lista de listas
      const lists = [
        this.valuesDP,
        this.valuesDE,
        this.valuesPRE,
        this.valuesPAT,
        this.valuesOTR,
      ];

      // Itera sobre cada lista
      lists.forEach((list) => {
        list.forEach((item) => {
          if (item) {
            if (!this.inputValuesDP[item]) {
              this.inputValuesDP[item] = 'NA';
            }
          }
        });
      });

      // Manejar los campos que no tengan datos de los datos extra
      const valuesArray = Object.values(this.ListDA[0]).flatMap(innerMap =>
        Object.values(innerMap).flat() // Esto extrae todos los valores de cada mapa interno
      );

      valuesArray.forEach((item) => {
        if (item) {
          if (!this.inputValuesDP[item]) {
            this.inputValuesDP[item] = 'NA';
          }
        }
      });
    },
    async crearDocumento () {
      try {
        if (this.CheckNulls() == false) {
          const FechaCreacion = new Date().toISOString().split('T')[0];
          
          // Variables para Codigo 
          const letter = this.ApellidosPaciente.charAt(0).toUpperCase();
          const idMax = this.maxLetNumbers;
          let Id_personal = ''

          if (Number.isNaN(idMax[letter] + 1)) {
            this.num = 1;
          } else {
            this.num = idMax[letter] + 1;
          }

          if (this.num.toString().length == 1) {
            const num2 = this.num.toString().padStart(2, '0');
            Id_personal = letter + "-" + num2; 
          } else {
            const num2 = this.num.toString().padStart(2, '0');
            Id_personal = letter + "-" + num2;
          }

          this.getDefaults()

          // Crear documento ficha
          const NuevoDocFicha = {
            Fecha_creacion: FechaCreacion,
            Fecha_ultimaV: FechaCreacion,
            NombresPa: this.NombresPaciente.toLowerCase(),
            ApellidosPa: this.ApellidosPaciente.toLowerCase(),
            SexoPa: this.Sexo.toLowerCase(),
            EdadPa: this.Edad.toString(),
            Fecha_nacimientoPa: this.FechaNacimiento,
            Direccion: this.Direccion,
            NombreEn: this.NombreEncargado.toLowerCase(),
            ApellidoEn: this.ApellidoEncargado.toLowerCase(),
            EdadEn: Number(this.EdadEncargado) || 0,
            ParentescoEn: this.ParentescoEncargado.toLowerCase() || 'NA',
            TEL: Number(this.TEL) || 0,
            DPI: Number(this.DPI),
            Tipo_parto: this.Tparto || '2',
            Prematuro: this.Prematuro || '2',
            G: this.G || 0,
            P: this.P || 0,
            C: this.C || 0,
            AB: this.ab || 0,
            Peso_Nacimiento: this.Peso || 0,
            Talla: this.Talla || 0,
            Complicaciones_parto: this.Complicaciones || 'NA',
            Antecedentes_medicos: this.Antmedicos || 'NA',
            Antecedentes_quirurgicos: this.Antquirurgicos || 'NA',
            Antecedentes_alergicos: this.Antalergicos || 'NA',
            Antecedentes_habitos: this.AntHabitos || 'NA',
            Antecedentes_Alimenticios: this.AntAlimentacio || 'NA',
            Antecedentes_Familiares: this.AntFam || 'NA',
            
            ...this.inputValuesDP,
            ...this.inputValuesVAC
          }

          // Crear documento en CA 
          const NuevoDocCA = {
            Fecha_CA: null,
            Edad_CA: null,
            alimentacion_CA: null,
            FC_CA: null,
            temperatura_CA: null,
            FR_CA: null,
            PA_CA: null,
            glucometro_CA: null,
            SAT_CA: null,
            peso_CA: null,
            talla_CA: null,
            CC_CA: null,
            diagnostico_CA: null,
            textoDetalle_CA: null,
            receta_CA: null,
            TX_CA: null,
            EF_CA: null,
            reconsulta_CA: null,
          };

          const docRef = doc(pediaRef, Id_personal);
          const docRef2 = doc(CitaActualRef, Id_personal);
          // Agregar un nuevo documento a la colección y setear ID predeterminado
          await setDoc(docRef, NuevoDocFicha);
          await setDoc(docRef2, NuevoDocCA);

          this.PropSucces()
          // redirigir a la pagina de mostrar segun el id 
          this.$router.push({
            name: 'MostrarFichaMedica', 
            params: { idDocumento: Id_personal }
          });
        } else {
          this.ToastNoti("Uno o más campos obligatorios están vacíos")
        }
      } catch {
        this.PropError()
      }
    },

  },
  setup (props: any) {
    interface MaxLetNum {
      [key: string]: number;
    }

    const ListDP = ref<string[]>([]);
    const ListDE = ref<string[]>([]);
    const ListAPRE = ref<string[]>([]);
    const ListAPA = ref<string[]>([]);
    const ListOA = ref<string[]>([]);
    const ListNC = ref<string[]>([]);
    const ListTNC = ref<string[]>([]);
    const ListVac = ref<string[]>([]);
    const ListDA = ref<string[]>([]);

    const valuesDP = ref<string[]>([]);
    const valuesDE = ref<string[]>([]);
    const valuesPRE = ref<string[]>([]);
    const valuesPAT = ref<string[]>([]);
    const valuesOTR = ref<string[]>([]);

    const documentIds = ref<string[]>([]);
    const maxLetNumbers: MaxLetNum = {};

    // Funcion utilizada para jalar todos los Id de los docuementos que se encuentran en la colección
    const obtenerDocumentos = async () => {
      try {
        const querySnapshot = await getDocs(pediaRef);
        const idsArray = querySnapshot.docs.map(doc => doc.id.toString());

        // Asigna la matriz de IDs al ref documentIds
        documentIds.value = idsArray;

        const unifiedArray = [...documentIds.value];

        unifiedArray.forEach((item) => {
          const [letter, number] = item.split('-');
          const num = parseInt(number, 10);

          if (!maxLetNumbers[letter] || num > maxLetNumbers[letter]) {
            maxLetNumbers[letter] = num;
          }
        })
      } catch (error) {
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "error",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Ocurrio un error al obtener documentos, intente nuevamente",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
        // console.error('Error obteniendo documentos: ', error);
      }
    };

    const obtenerCampos = async () => {
      const instance = getCurrentInstance();
      if (!instance) return; // Salir de la función si no hay instancia

      const { proxy } = instance as unknown as { proxy: { getVacunas: () => void }};

      try {
        Swal.fire({
          title: 'Cargando datos...',
          html: 'Porfavor espere...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        })
        const docRef = doc(ConfiRef, 'FichaMedica')
        const querySnapshot = await getDoc(docRef)

        if (querySnapshot.exists()) {
          const data = querySnapshot.data();
          const AntPa = Array.isArray(data.AntPatologicos) ? data.AntPatologicos :
            [data.AntPatologicos];
          const AntPr = Array.isArray(data.AntPrenatales) ? data.AntPrenatales :
            [data.AntPrenatales];
          const DP = Array.isArray(data.DatosPersonales) ? data.DatosPersonales :
            [data.DatosPersonales];
          const EN = Array.isArray(data.Encargado) ? data.Encargado :
            [data.Encargado];
          const OA = Array.isArray(data.OtrosAnt) ? data.OtrosAnt :
            [data.OtrosAnt];
          const NC = Array.isArray(data.NuevoCampo) ? data.NuevoCampo :
            [data.NuevoCampo];
          const Vac = Array.isArray(data.VacCampo) ? data.VacCampo :
            [data.VacCampo];
          const adicional = Array.isArray(data.DataAdicional) ? data.DataAdicional :
            [data.DataAdicional];

          ListDP.value.push(...DP);
          ListDE.value.push(...EN);
          ListAPRE.value.push(...AntPr);
          ListAPA.value.push(...AntPa);
          ListOA.value.push(...OA);
          ListNC.value.push(...NC);
          ListVac.value.push(...Vac);
          ListDA.value.push(...adicional);
        }

        let commonElements: string[] = ListDP.value.filter((value: string) => ListNC.value.includes(value));
        let commonDE: string[] = ListDE.value.filter((value: string) => ListNC.value.includes(value));
        let commonPRE: string[] = ListAPRE.value.filter((value: string) => ListNC.value.includes(value));
        let commonPAT: string[] = ListAPA.value.filter((value: string) => ListNC.value.includes(value));
        let commonOTR: string[] = ListOA.value.filter((value: string) => ListNC.value.includes(value));

        valuesDP.value.push(...commonElements);
        valuesDE.value.push(...commonDE);
        valuesPRE.value.push(...commonPRE);
        valuesPAT.value.push(...commonPAT);
        valuesOTR.value.push(...commonOTR);

        if (proxy) {
          proxy.getVacunas();
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
      obtenerDocumentos();
      obtenerCampos();
    });

    return {
      documentIds,
      ListDP,
      ListDE,
      ListAPRE,
      ListAPA,
      ListOA,
      ListNC,
      ListVac,
      ListTNC,
      ListDA,
      valuesDP,
      valuesDE,
      valuesPRE,
      valuesPAT,
      valuesOTR,
      maxLetNumbers,

    };
  },
  watch: {
    DPI (newValue:string) {
      this.outRangeDPI = this.validateDpi(newValue);
    },

    TEL (newValue:string) {
      this.outRangeCUI = this.validateTel(newValue);
    },
  },

});
</script>
