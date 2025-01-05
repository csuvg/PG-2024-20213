<template>
    <Header />
    <body>
        <div class="Options">
            <div class = "UpperSide2">
            <BackBtn class ="back" ruta="/buscar"/>
            <FontsCat class ="headerh2" type="subtitulo1" :text="fullName"/>
            </div>

            <div class = "DownSide">
            <SubMenu3 :idDocumento="id" VistaFicha="pediatria"/>
            </div>
        </div>
        <div>
        <div class = "DatosPersonales" >
            <div class = "TitleDP">
                <FontsCat class ="headerh1" type="subtitulo2" text='Datos Personales' style="font-weight: 600"/> 
            </div>
            <div class = "CDP5">
                <div class="DataC">
                    <div class="TextBox">
                        <FontsCat type="Text_P" class="Texto1" text="Nombres: "></FontsCat>
                        <ShowingBox class="Show1" :text="NombresPaciente" minWidth="80%" maxWidth="100%" />
                    </div>
                    <div class="TextBox">
                        <FontsCat type="Text_P" class="Texto2" text="Apellidos: "></FontsCat>
                        <ShowingBox  class="Show2" :text="ApellidosPaciente" minWidth="80%" maxWidth="100%" />     
                    </div>
                </div>
                <div class="DataC2">
                    <div class="TextBox">
                        <FontsCat type="Text_P" class="Texto1" text="Sexo: "/>
                        <ShowingBox class="Show1" :text="Sexo" minWidth="80%" maxWidth="100%" />
                    </div>
                    <div class="TextBox">
                        <FontsCat type="Text_P" class="Texto2" text="Edad: "/>
                        <ShowingBox  class="Show2" :text="Edad" minWidth="80%" maxWidth="100%" />   
                    </div>
                    <div class="TextBox">
                        <FontsCat type="Text_P" class="Texto2" text="Fecha de nacimiento:"/>
                        <ShowingBox  class="Show2" :text="FechaNacimiento" minWidth="80%" maxWidth="100%" />     
                    </div>
                </div>
                <div class="DataC3">
                    <div class="TextBox2">
                        <FontsCat type="Text_P" class="Texto1" text="Direccion: "/>
                        <ShowingBox class="Show1" :text="Direccion" minWidth="90%" maxWidth="100%" />
                    </div>
                </div>
                <div class="DataC">
                    <div class ="TextBox" v-for="(element, index) in valuesDP" :key="index">
                      <FontsCat type="Text_P" class="Texto1" :text="`${element.replace('_', ' ')}:`"/>
                      <ShowingBox class="Show1" :text="inputValuesDP[element]" minWidth="90%" maxWidth="100%" />
                    </div>
                </div>
            </div>
        </div>
        <div class="DatosEncargados">
            <div class = "TitleDP">
                <FontsCat class ="headerh1" type="subtitulo2" text='Datos de los encargados' style="font-weight: 600"/> 
            </div>
            <div class = "CDP5">
              <div class="DataC">
                  <div class="TextBox">
                      <FontsCat type="Text_P" class="Texto7" text="Nombres del encargado: "></FontsCat>
                      <ShowingBox class="Show7" :text="NombreEncargado" minWidth="80%" maxWidth="100%" />
                  </div>
                  <div class="TextBox">
                      <FontsCat type="Text_P" class="Texto8" text="Apellidos del encargado: "></FontsCat>
                      <ShowingBox class="Show8" :text="ApellidoEncargado"  minWidth="80%" maxWidth="100%" />     
                  </div>
              </div>
              <div class="DataC">
                  <div class="TextBox">
                      <FontsCat type="Text_P" class="Texto11" text="Edad del encargado: "></FontsCat>
                      <ShowingBox class="Show11" :text="EdadEncargado" minWidth="80%" maxWidth="100%" />
                  </div>
                  <div class="TextBox">
                      <FontsCat type="Text_P" class="Texto12" text="Parentesco: "></FontsCat>
                      <ShowingBox class="Show12" :text="ParentescoEncargado"   minWidth="80%" maxWidth="100%" />     
                  </div>
              </div>
              <div class="DataC">
               <div class="TextBox">
                       <FontsCat type="Text_P" class="Texto11" text="Número telefónico: "></FontsCat>
                       <ShowingBox class="Show11" :text="TEL" minWidth="80%" maxWidth="100%" />
                   </div>
                   <div class="TextBox">
                       <FontsCat type="Text_P" class="Texto12" text="DPI: "></FontsCat>
                       <ShowingBox class="Show12" :text="DPI"  minWidth="80%" maxWidth="100%" />     
                   </div>
               </div>
               <div class="DataC">
                   <div class ="TextBox" v-for="(element, index) in valuesDE" :key="index">
                   <FontsCat type="Text_P" class="Texto1" :text="`${element.replace('_', ' ')}:`"/>
                   <ShowingBox class="Show1" :text="inputValuesDP[element]" minWidth="90%" maxWidth="100%" />
                   </div>
               </div>              
            </div>
        </div>
        <div class ="AntecedentesPrenatales">
          <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Antecedentes Prenatales' style="font-weight: 600"/> 
          </div>
          <div class="CDP5">
            <div class = "DataC2">
              <div class = 'OPTText'>
                <div class = "Texb">
                  <FontsCat class ="headerh1" type="Text_B" text='Tipo de parto'/>
                </div>
                <div class= "OptSeg">
                  <CircleOption v-if="numero1" :options="['PES', 'CSTP']" v-model="Tparto"/>
                </div>
              </div>
              <div class = 'OPTText'>
                <div class = "Texb">
                  <FontsCat class ="headerh1" type="Text_B" text='Prematuro'/>
                </div>
                <div class= "OptSeg">
                  <CircleOption v-if="numero" :options="['Si', 'No']" v-model="Prematuro"/>
                </div>
              </div>
            </div>
            <div class="DataC2">
              <div class="TextBox">
                  <FontsCat type="Text_P" class="Texto21" text="Peso al nacer: "/>
                  <ShowingBox class="Show21" :text="Peso" minWidth="80%" maxWidth="100%" />
              </div>
              <div class="TextBox">
                  <FontsCat type="Text_P" class="Texto22" text="Talla: "/>
                  <ShowingBox  class="Show21" :text="Talla" minWidth="80%" maxWidth="100%" />   
              </div>
              <div class="TextBox">
                  <FontsCat type="Text_P" class="Texto23" text="P: "/>
                  <ShowingBox  class="Show21" :text="P" minWidth="80%" maxWidth="100%" />     
              </div>
            </div>
            <div class="DataC2">
              <div class="TextBox">
                  <FontsCat type="Text_P" class="Texto21" text="G: "/>
                  <ShowingBox class="Show21" :text="G" minWidth="80%" maxWidth="100%" />
              </div>
              <div class="TextBox">
                  <FontsCat type="Text_P" class="Texto22" text="C: "/>
                  <ShowingBox  class="Show21" :text="C" minWidth="80%" maxWidth="100%" />   
              </div>
              <div class="TextBox">
                  <FontsCat type="Text_P" class="Texto23" text="AB: "/>
                  <ShowingBox  class="Show21" :text="ab" minWidth="80%" maxWidth="100%" />     
              </div>
            </div>
            <div class="ComplicacionesC">
              <FontsCat type="Text_P" class="Texto30" text="Complicaciones"/>
              <BoxComplete class="Box" :text="Complicaciones" style="min-width: 97%;"/>
            </div>
            <div class="DataC">
              <div class ="TextBox" v-for="(element, index) in valuesPRE" :key="index">
                <FontsCat type="Text_P" class="Texto1" :text="`${element.replace('_', ' ')}:`"/>
                <ShowingBox class="Show1" :text="inputValuesDP[element]" minWidth="90%" maxWidth="100%" />
              </div>
            </div>   
          </div>

        </div>
        <div class="Vacunas">
          <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Esquema de vacunación' style="font-weight: 600"/> 
          </div>  
          <div class = "VacunasC">
            <div class="ConteinerVac"  v-for="(element, index) in valuesArray" :key="index" style="cursor: pointer;">
              <FontsCat class ="Tblack" type="Text_B" :text='element[0]'/>
              <CheckBox class = "boxOpt"  :options='element[1]' v-model="inputValuesVAC[element[0]]"/>
            </div>
          </div>
        </div>
        <div class="AnteMed">
          <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Antecedentes patológicos' style="font-weight: 600"/> 
          </div>
          <div class = "CDP5">
            <div class="DataC2">
              <div class="Antecedentes">
                  <FontsCat type="Text_P" class="Texto30" text="Antecendentes médicos"/>
                  <BoxComplete class="Box" :text="Antmedicos" minWidth="105%" maxWidth="100%" />
              </div>
              <div class="Antecedentes">
                  <FontsCat type="Text_P" class="Texto30" text="Antecendentes quirúrgicos"/>
                  <BoxComplete class="Box" :text="Antquirurgicos" minWidth="105%" maxWidth="100%" />
              </div>
              <div class="Antecedentes">
                  <FontsCat type="Text_P" class="Texto30" text="Antecendentes alérgicos"/>
                  <BoxComplete class="Box" :text="Antalergicos" minWidth="105%" maxWidth="100%" />
              </div>
            </div>
            <div class="DataC2">
              <div class ="Antecedentes" v-for="(element, index) in valuesPAT" :key="index">
                <FontsCat type="Text_P" class="Texto1" :text="`${element.replace('_', ' ')}:`"/>
                <BoxComplete class="Box" :text="inputValuesDP[element]" minWidth="105%" maxWidth="100%" />
              </div>
            </div>  
          </div>
        </div>
        <div class="AnteOtr">
          <div class = "TitleDP">
            <FontsCat class ="headerh1" type="subtitulo2" text='Otros antecedentes' style="font-weight: 600"/> 
          </div>
          <div class = "CDP5">
            <div class="DataC2">
              <div class="Antecedentes">
                  <FontsCat type="Text_P" class="Texto30" text="Hábitos"/>
                  <BoxComplete class="Box" :text="AntHabitos" minWidth="105%" maxWidth="100%" />
              </div>
              <div class="Antecedentes">
                  <FontsCat type="Text_P" class="Texto30" text="Alimentación"/>
                  <BoxComplete class="Box" :text="AntAlimentacio" minWidth="105%" maxWidth="100%" />
              </div>
              <div class="Antecedentes">
                  <FontsCat type="Text_P" class="Texto30" text="Antecendentes familiares"/>
                  <BoxComplete class="Box" :text="AntFam" minWidth="105%" maxWidth="100%" />
              </div>
            </div>
            <div class="DataC2">
              <div class ="Antecedentes" v-for="(element, index) in valuesOTR" :key="index">
                <FontsCat type="Text_P" class="Texto1" :text="`${element.replace('_', ' ')}:`"/>
                <BoxComplete class="Box" :text="inputValuesDP[element]" minWidth="105%" maxWidth="100%" />
              </div>
            </div>  
          </div>
        </div>
        <div class = "DataAdicional">
          <div class="ConteinerDA" v-for="(item, index) in valuesArrayDA" :key="index">
            <div class = "TitleDP">
              <FontsCat class ="headerh1" type="subtitulo2" :text="item[0]" style="font-weight: 600"/> 
            </div>
            <div class = "CDP5" v-for="(value, key) in item[1]" :key="key">
              <div class="DataC" v-if="String(key) === 'Campo de texto mediano'">
                <div class="TextBox" v-for="(val, indx) in value" :key="indx">
                  <FontsCat type="Text_P" class="Texto7" :text="`${val.replace('_', ' ')}: `"/>
                  <ShowingBox class="Show7" :text="inputValuesDP[val]" minWidth="80%" maxWidth="100%" />
                </div>
              </div>
              <div class="DataC2" v-else-if="String(key) === 'Campo de texto grande'"> 
                <div class="Antecedentes" v-for="(val, indx) in value" :key="indx">
                  <FontsCat type="Text_P" class="Texto30" :text="`${val.replace('_', ' ')}: `"/>
                  <BoxComplete class="Box" :text="inputValuesDP[val]" minWidth="105%" maxWidth="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
          <div class="Botones">
                <Button buttonText="Editar ficha" actionType="saveData" @click="IrActualizarPediatra"/>
                <Button buttonText="Cita Actual" actionType="saveData" @click="IrCitaActual" />
          </div>
        </div>
    </body>
    <Footer/>
</template>

<style>
.UpperSide2{
  display:flex;
  justify-content: start;
  margin-left: 10%;
  width: auto;
  margin-bottom: 2%;
  margin-top: 1%;
  align-items: center;
}

.headerh2{
  margin-left: 5%;
  margin-top: 4%;
}

.back{
  margin-top: 1%;
}

.DownSide{
  display:flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
}

.TitleDP{
  display:flex;
  align-items: start;
  justify-content: start;
  margin-left: 6.2%;
}

.TextBox{
    display: grid;
    justify-content: start;
    grid-template-columns: 1.5fr 5fr;
    grid-column-gap: 25px;
    align-items: end
}

.DataC{
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr ;
    padding: 15px;
    width: 90%;
}

.DataC2 {
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr ;
    padding: 15px;
    width: 90%;
}

.DataC3{
    display: grid;
    justify-content: start;
    padding: 15px;
    width: 90%;
    margin-left: 2.5%;
}

.TextBox2{
    display: grid;
    justify-content: center;
    grid-template-columns: 2fr 33fr;
    grid-column-gap: 25px;
    align-items: end
}

.CDP5{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
}

.Texb{
  display:flex;
  height:40px;
  align-items: center;
  justify-content: start;
  margin-left: 6.6%;
}

.boxOpt{
  margin-left: -10%;
  height: 70%;
}

.OptSeg{
  margin-left: 7.5%;
  display:flex;
  align-items: start;
  justify-content: start;
  width: 40%;
}

.ConteinerVac{
  display: grid;
  align-items: center;
  justify-items: start;
  grid-template-rows:  50px;
  grid-template-columns: 7fr 10fr;
  margin-left: 8%;
}

.Botones  {
  display: flex;
  flex-direction: row;
  margin-top: 3%;
  justify-content: space-evenly;
  align-content:center;
  align-items: center;
}

.Antecedentes {
    display: grid;
    justify-content: center;
    grid-template-rows: auto 5fr;
    align-items: end;
    grid-auto-columns: 60%;
    margin-top:-4%;
}

.Box{
    height: 250px;
}

.ComplicacionesC {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
}
@media screen and (max-width: 600px) {
.CDP5{
    flex-direction: row;
}

.DataC{
    grid-template-columns: 1fr;
}

.DataC2{
    grid-template-columns: 1fr;
}

.TextBox{
    justify-items: start;
    grid-template-columns: 6fr 6fr;
}

.Botones  {
  display: flex;
  flex-direction: column;
  margin-top: 3%;
  row-gap: 15px;
}

.Box{
    height: 50px;
}

.Antecedentes {
    margin-top:2%;
}
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import BackBtn from '../components/BackBtn.vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import Button from '../components/ButtonsApp.vue';
import ShowingBox from '../components/ShowingBox.vue';
import SubMenu3 from '../components/SubMenu3.vue';
import FontsCat from '../components/FontsCat.vue';
import CheckBox from '../components/CheckBox.vue';
import InputBoxDate from '../components/InputBoxDate.vue';
import CircleOption from '../components/CircleOption.vue';
import BoxComplete from '../components/BoxComplete.vue';

import { ConfiRef, pediaRef } from "../firebajse";
import { getDocs, where, query, doc, getDoc } from 'firebase/firestore';

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';


export default defineComponent({
  name: 'MostrrFichap',
  components: {
    Header,
    Footer,
    Button,
    BackBtn,
    CheckBox,
    FontsCat,
    SubMenu3,
    ShowingBox,
    CircleOption,
    BoxComplete
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
  setup (props) {
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
    const numero = ref('');
    const numero1 = ref('');
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

    // const idDocumento = ref('E-1'); 
    const inputValuesVAC = ref<{ [key: string]: any[] }>({});
    const inputValuesDP = ref<{ [key: string]: string }>({});
    const valuesArray = ref<any[][]>([])
    const id = ref(props.idDocumento); 
    const fullName = ref('');

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
          fullName.value = (data.ApellidosPa + ', ' + data.NombresPa).toLocaleUpperCase();
          NombresPaciente.value = data.NombresPa;
          ApellidosPaciente.value = data.ApellidosPa;
          Sexo.value = data.SexoPa;
          Edad.value = data.EdadPa.toString();
          FechaNacimiento.value = new Date(data.Fecha_nacimientoPa).toISOString().split('T')[0];
          Direccion.value = data.Direccion;
          NombreEncargado.value = data.NombreEn;
          ApellidoEncargado.value = data.ApellidoEn;
          EdadEncargado.value = data.EdadEn.toString();
          ParentescoEncargado.value = data.ParentescoEn;
          TEL.value = data.TEL.toString();
          DPI.value = data.DPI.toString();
          Tparto.value = data.Tipo_parto;
          numero1.value = data.Tipo_parto;
          Prematuro.value = data.Prematuro;
          numero.value = data.Prematuro; // este se utiliza para tener control de que opcion marcar
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


          // Manejar el array de Data extra de las nuevas secciones 
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
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se encontró el documento con el ID otorgado',
          };
          Swal.fire(swalOptions);
        }
      } catch (error) {
        console.error('Error al obtener el documento:', error);            
      }
    }

    onMounted(async () => {
      obtenerCampos();
      obtenerDoc();
    });

    return {
      valuesDP,
      valuesDE,
      valuesPRE,
      valuesPAT,
      valuesOTR,
      id,
      fullName, 
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
      numero1,
      Tparto,
      Prematuro,
      numero,
      G,
      P,
      C,
      ab,
      Peso,
      Talla,
      Complicaciones,
      ListVac,
      ListDA,
      Antmedicos,
      Antquirurgicos,
      Antalergicos,
      AntHabitos,
      AntAlimentacio,
      AntFam,

      inputValuesDP,
      inputValuesVAC,
    };
  },
  methods: {
    IrActualizarPediatra () {
      this.$router.push({
        name: 'ActualizarFicha', 
        params: { idDocumento: this.id }
      });
    },
    
    IrCitaActual () {
      this.$router.push({
        name: 'CitaActual', 
        params: { idDocumento: this.id }
      });
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
  }
})
</script>
