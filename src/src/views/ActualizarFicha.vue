<template>
  <Header />
    <body>
      <div class="Options">
          <div class = "UpperSide6">
              <BackBtn class ="back" @click="irMostrar"/>
              <FontsCat class ="headerh4" type="subtitulo1" text='Actualizar paciente'/>
          </div>
      </div>

      <div class = "DatosPersonales">
        <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Datos personales'/>
        </div>
        <div class = "CDP" style="align-content: flex-start">
            <div class ="DP">
            <InputBox class= "inpt inptM4" placeholder="Ingrese los nombres del paciente *" minWidth="100%" maxWidth="80%" margin-left="-3%" v-model="NombresPaciente"></InputBox>
            <InputBox class= "inpt inptM2" placeholder="Ingrese los apellidos del paciente *" minWidth="100%" maxWidth="80%" margin-left="1%" v-model="ApellidosPaciente"></InputBox>
            </div>
            <div class ="DP2">
            <InputBox class= "inpt" placeholder="Ingrese sexo *" minWidth="100%" maxWidth="77%" v-model="Sexo"></InputBox>
            <InputBox class= "inpt" type="text" placeholder="Ingrese edad *" minWidth="100%" maxWidth="77%" v-model="Edad"></InputBox>
            <InputBoxDate class="inpt"  type="text"  placeholder="Fecha de nacimiento *" minWidth="100%" maxWidth="77%" v-model="FechaNacimiento"></InputBoxDate>
            </div>
            <div class ="DP1">
              <InputBox class= "inpt2" placeholder="Direción de recidencia *" minWidth="90%" maxWidth="90%" margin-left="-1.5%" v-model="Direccion"></InputBox>
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
                  <CircleOption v-if="numero1" :options="['PES', 'CSTP']" v-model="Tparto"/>
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
                  <CircleOption v-if="numero" :options="['Si', 'No']" v-model="Prematuro"/>
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
      <div class = "CBTN2">
       <Button buttonText="Actualizar ficha" actionType="saveData" @click="actualizarDoc"></Button>
       <Button buttonText="Ir a cita actual" actionType="saveData" @click="IrCitaActual"></Button>
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
  
  .CBTN2{
    display: flex;
    flex-direction: row;
    margin-top: 3%;
    justify-content: space-evenly;
    align-content:center;
    align-items: center;
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
  
  .UpperSide6{
    display:flex;
    justify-content: start;
    margin-left: 10%;
    width: auto;
    margin-bottom: 2%;
    margin-top: 1%;
    align-items: center;
    flex-direction: row;
  }
  
  
  .headerh1{
      margin-left: 5%;
  }
  
  .headerh4{
    margin-left: 5%;
    margin-top: 4%;
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
import { getDocs, query, where, setDoc, Timestamp, doc, getDoc } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import { useRouter } from 'vue-router';


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
  props: {
    idDocumento: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      valuesArray: [] as any[][],
      valuesArrayDA: [] as any[][],
    };
  },
  methods: {
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
    
    IrCitaActual () {
      this.$router.push({
        name: 'CitaActual', 
        params: { idDocumento: this.id }
      });
    },

    irMostrar () {
      this.$router.push({
        name: 'MostrarFichaMedica', 
        params: { idDocumento: this.id }
      });
    },
  },
  setup (props: any) {
    const NombresPaciente = ref('');
    const ApellidosPaciente = ref('');
    const Sexo = ref('');
    const Edad = ref('');
    const FechaNacimiento = ref('');
    const Direccion = ref('');
    const NombreEncargado = ref('');
    const ApellidoEncargado = ref('');
    const EdadEncargado = ref('');
    const ParentescoEncargado = ref('');
    const TEL = ref('');
    const DPI = ref('');
    const Tparto = ref('');
    const Prematuro = ref('');
    const G = ref(''); 
    const P = ref('');
    const C = ref('');
    const ab = ref('');
    const Peso = ref('');
    const Talla = ref('');
    const Complicaciones = ref('');
    const Antmedicos = ref('');
    const Antquirurgicos = ref('');
    const Antalergicos = ref('');
    const AntHabitos = ref('');
    const AntAlimentacio = ref('');
    const AntFam = ref('');
    const numero = ref('');
    const numero1 = ref('');


    const ListDP = ref<string[]>([]);
    const ListDE = ref<string[]>([]);
    const ListAPRE = ref<string[]>([]);
    const ListAPA = ref<string[]>([]);
    const ListOA = ref<string[]>([]);
    const ListNC = ref<string[]>([]);
    const ListVac = ref<string[]>([]);
    const ListDA = ref<string[]>([]);
    let KeyListVac: string[] = [];
    let valuesDA: string[] = [];

    const valuesDP = ref<string[]>([]);
    const valuesDE = ref<string[]>([]);
    const valuesPRE = ref<string[]>([]);
    const valuesPAT = ref<string[]>([]);
    const valuesOTR = ref<string[]>([]);

    const id = ref(props.idDocumento);
    const router = useRouter(); // Obtener el router
    const cargar = ref(true);
    const inputValuesVAC = ref<{ [key: string]: any[] }>({});
    const inputValuesDP = ref<{ [key: string]: string }>({});
    const valuesArray = ref<any[][]>([])

  
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

        const OrderKeys = Object.keys(ListVac.value[0]).map(key => key.replace(/\s+/g, '')).sort();
        KeyListVac = OrderKeys


        const valuesArray = Object.values(ListDA.value).flatMap(innerMap =>
          Object.values(innerMap).flat() // Esto extrae todos los valores de cada mapa interno
        );

        const valuesArrayDA = Object.values(valuesArray).flatMap(innerMap =>
          Object.values(innerMap).flat() // Esto extrae todos los valores de cada mapa interno
        );

        valuesDA = valuesArrayDA;

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

    const obtenerDoc = async () => {
      try {
        const querySnapshot = await getDocs(query(pediaRef, where('__name__', '==', props.idDocumento)));
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; // Obtén el primer documento
          const data = doc.data();

          // Obtener valore de los campos 
          // Nombre archivo vue -- nombre base de datos
          NombresPaciente.value = data.NombresPa;
          ApellidosPaciente.value = data.ApellidosPa;
          Sexo.value = data.SexoPa;
          Edad.value = data.EdadPa;
          FechaNacimiento.value = new Date(data.Fecha_nacimientoPa).toISOString().split('T')[0];
          Direccion.value = data.Direccion;
          NombreEncargado.value = data.NombreEn;
          ApellidoEncargado.value = data.ApellidoEn;
          EdadEncargado.value = data.EdadEn.toString();
          ParentescoEncargado.value = data.ParentescoEn;
          TEL.value = data.TEL.toString();
          DPI.value = data.DPI.toString();
          G.value = data.G.toString();
          P.value = data.P.toString();
          C.value = data.C.toString();
          ab.value = data.AB.toString();
          Peso.value = data.Peso_Nacimiento.toString();
          Talla.value = data.Talla.toString();
          Complicaciones.value = data.Complicaciones_parto;
          Antmedicos.value = data.Antecedentes_medicos;
          Antquirurgicos.value = data.Antecedentes_quirurgicos;
          Antalergicos.value = data.Antecedentes_alergicos;
          AntHabitos.value = data.Antecedentes_habitos;
          AntAlimentacio.value = data.Antecedentes_Alimenticios;
          AntFam.value = data.Antecedentes_Familiares;

          Tparto.value = data.Tipo_parto;
          numero1.value = data.Tipo_parto;
          Prematuro.value = data.Prematuro;
          numero.value = data.Prematuro;

          // Manejar el array de las vacunas
          // Extraer data de la bd 
          for (let i = 0; i < KeyListVac.length; i++) {
            const key = KeyListVac[i]; // Obtener la clave actual
            if (key in data) {
              inputValuesVAC.value[key] = data[key];
            }
          }

          // renderizar datos en la vista
          for (const key in inputValuesVAC.value) {
            valuesArray.value.push([key, inputValuesVAC.value[key]]);
          }
          
          // Manejar el array de Data extra 
          for (let i = 0; i < valuesDA.length; i++) {
            const key = valuesDA[i]; // Obtener la clave actual
            if (key in data) {
              inputValuesDP.value[key] = data[key];
            }
          }

          // Manejar los datos agregados en secciones ya existentes
          for (let i = 0; i < ListNC.value.length; i++) {
            const key = ListNC.value[i]; // Obtener la clave actual
            if (key in data) {
              inputValuesDP.value[key] = data[key];
            }
          }

          cargar.value = false;
        } else {
          // console.log('No se encontró el documento con el ID especificado');
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se encontró el documento con el ID otorgado',
          };
          Swal.fire(swalOptions);
          cargar.value = false; 
        }
      } catch (error) {
        console.error('Error al obtener el documento:', error);
      }
    };

    const handleModelUpdate = (newValue: string) => {
      Prematuro.value = newValue;
      numero.value = newValue === 'Si' ? '0' : '1';
    };

    const actualizarDoc = async () => {
      try {
        const docRef = doc(pediaRef, props.idDocumento);
        const datosActualizados = {
          NombresPa: NombresPaciente.value.toLowerCase(),
          ApellidosPa: ApellidosPaciente.value.toLowerCase(),
          SexoPa: Sexo.value.toLowerCase(),
          EdadPa: Number(Edad.value),
          Fecha_nacimientoPa: new Date(FechaNacimiento.value).toISOString(),
          Direccion: Direccion.value || 'NA',
          NombreEn: NombreEncargado.value.toLowerCase(),
          ApellidoEn: ApellidoEncargado.value.toLowerCase(),
          EdadEn: Number(EdadEncargado.value) || 0,
          ParentescoEn: ParentescoEncargado.value.toLowerCase() || 'NA',
          TEL: Number(TEL.value) || 0,
          DPI: Number(DPI.value),
          Tipo_parto: Tparto.value,
          Prematuro: Prematuro.value,
          G: Number(G.value),
          P: Number(P.value),
          C: Number(C.value),
          AB: Number(ab.value),
          Peso_Nacimiento: Peso.value,
          Talla: Talla.value,
          Complicaciones_parto: Complicaciones.value,
          Antecedentes_medicos: Antmedicos.value,
          Antecedentes_quirurgicos: Antquirurgicos.value,
          Antecedentes_alergicos: Antalergicos.value,
          Antecedentes_habitos: AntHabitos.value,
          Antecedentes_Alimenticios: AntAlimentacio.value,
          Antecedentes_Familiares: AntFam.value,
  
          ...inputValuesDP.value,
          ...inputValuesVAC.value
        }
        await setDoc(docRef, datosActualizados, { merge: true });
        const Toast: SweetAlertOptions = {
          toast: true,
          timer: 6000,
          icon: "success",
          position: "top-end",
          timerProgressBar: true,
          showConfirmButton: false,
          title: "Ficha actualizada con exito",
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }
        Swal.fire(Toast);
        router.push({
          name: 'MostrarFichaMedica',
          params: { idDocumento: id.value }
        })
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

    onMounted(() => {
      obtenerCampos();
      obtenerDoc();
    });

    return {
      ListDP,
      ListDE,
      ListAPRE,
      ListAPA,
      ListOA,
      ListNC,
      ListVac,
      ListDA,
      KeyListVac,
      valuesDP,
      valuesDE,
      valuesPRE,
      valuesPAT,
      valuesOTR,

      NombresPaciente,
      ApellidosPaciente,
      Sexo,
      Edad,
      FechaNacimiento,
      Direccion,
      NombreEncargado,
      ApellidoEncargado,
      EdadEncargado,
      ParentescoEncargado,
      TEL,
      DPI,
      Tparto,
      Prematuro,
      G,
      P,
      C,
      ab,
      Peso,
      Talla,
      Complicaciones,
      Antmedicos,
      Antquirurgicos,
      Antalergicos,
      AntHabitos,
      AntAlimentacio,
      AntFam,
      numero,
      numero1,
      inputValuesVAC,
      inputValuesDP,
      handleModelUpdate,
      actualizarDoc,
      id,
      cargar,
    };
  },
});
</script>
