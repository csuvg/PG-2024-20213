<template>
    <HeaderApp class="Header"/>
    <body>
        <div class="UpperSide">
            <BackBtn class="back" ruta="/Configuraciones" />
            <FontsCat class="headerh7" type="subtitulo1" text="Manejo de Campos de Expedientes"/>
        </div>
        <div class="ContainerMain">
          <div class="InfoSelection">
            <div  class="TitleFi">
              <FontsCat type="BoldText" text="Datos Personales"/>
            </div>
            <hr/>
            <div class="InfoConteiner">
              <div class="RowInfo2"  v-for="(element, index) in ListDP" :key="index">
                <FontsCat type="Text_B"  :text="element"/>
              </div>
            </div>
          </div>
          <div class="Conteiner2">
            <div class="agregar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Agregar un nuevo campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo" @keypress.enter="addCampo('DatosPersonales', ListDP, N_campo)"/>
                  <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addCampo('DatosPersonales', ListDP, N_campo)" style="margin-left: 50%; color: #55A112;"/>
              </div>
            </div>
            <div class="eliminar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Eliminar un campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo7" @keypress.enter="deleteCampo('DatosPersonales', N_campo7, ListDP)"/>
                  <fa class='iconP' icon="fa-solid fa-x" pull="left" @click="deleteCampo('DatosPersonales', N_campo7, ListDP)" style="margin-left: 50%; color: red;"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="ContainerMain">
          <div class="InfoSelection">
            <div  class="TitleFi">
              <FontsCat type="BoldText" text="Datos del encargado"/>
            </div>
            <div class="InfoConteiner">
              <div class="RowInfo2"  v-for="(element, index) in ListDE" :key="index">
                <FontsCat type="Text_B"  :text="element"/>
              </div>
            </div>
          </div>
          <div class="Conteiner2">
            <div class="agregar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Agregar un nuevo campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo3" @keypress.enter="addCampo('Encargado',ListDE,N_campo3)"/>
                  <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addCampo('Encargado',ListDE,N_campo3)" style="margin-left: 50%; color: #55A112;"/>
              </div>
            </div>
            <div class="eliminar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Eliminar un campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo8" @keypress.enter="deleteCampo('Encargado', N_campo8,ListDE)"/>
                  <fa class='iconP' icon="fa-solid fa-x" pull="left" @click="deleteCampo('Encargado', N_campo8, ListDE)" style="margin-left: 50%; color: red;"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="ContainerMain">
          <div class="InfoSelection">
            <div  class="TitleFi">
              <FontsCat type="BoldText" text="Antecedentes Prenatales"/>
            </div>
            <div class="InfoConteiner">
              <div class="RowInfo2"  v-for="(element, index) in ListAPRE" :key="index">
                <FontsCat type="Text_B"  :text="element"/>
              </div>
            </div>
          </div>
          <div class="Conteiner2">
            <div class="agregar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Agregar un nuevo campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo2" @keypress.enter="addCampo('AntPrenatales',ListAPRE,N_campo2)"/>
                  <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addCampo('AntPrenatales',ListAPRE,N_campo2)" style="margin-left: 50%; color: #55A112;"/>
              </div>
            </div>
            <div class="eliminar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Eliminar un campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo9" @keypress.enter="deleteCampo('AntPrenatales', N_campo9, ListAPRE)"/>
                  <fa class='iconP' icon="fa-solid fa-x" pull="left" @click="deleteCampo('AntPrenatales', N_campo9,ListAPRE)" style="margin-left: 50%; color: red;"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="ContainerMain">
          <div class="InfoSelection">
            <div  class="TitleFi">
              <FontsCat type="BoldText" text="Vacunas"/>
            </div>
            <div class="InfoConteiner">
              <div class="RowInfo2" v-for="(value, key, index) in ListVac[0]" :key="index" >
                <FontsCat type="Text_B"  :text="key.toString()"/>
              </div>
            </div>
          </div>
          <div class="Conteiner2">
            <div class="agregarV">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Agregar vacuna" style="margin-left: -16%;"/>
              </div>
              <div class="RowInfo3">
                <InputBox class= "inpt inptM2" placeholder="Ingrese vacuna" minWidth="100%" maxWidth="110%" margin-left="30px" v-model="N_vacuna" />
                <InputBox class= "inpt inptM4" type="Number" placeholder="Ingrese número de dosis máxima" minWidth="100%" maxWidth="110%" margin-left="34%" v-model="No_vacuna"  @keypress.enter="addVac()"/>
                <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addVac()" style="margin-left: 185%; color: #55A112;"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="ContainerMain">
          <div class="InfoSelection">
            <div  class="TitleFi">
              <FontsCat type="BoldText" text="Antecedentes Patológicos"/>
            </div>
            <div class="InfoConteiner">
              <div class="RowInfo2"  v-for="(element, index) in ListAPA" :key="index">
                <FontsCat type="Text_B"  :text="element"/>
              </div>
            </div>
          </div>
          <div class="Conteiner2">
            <div class="agregar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Agregar un nuevo campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo4" @keypress.enter="addCampo('AntPatologicos',ListAPA,N_campo4)"/>
                  <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addCampo('AntPatologicos',ListAPA,N_campo4)" style="margin-left: 50%; color: #55A112;"/>
              </div>
            </div>
            <div class="eliminar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Eliminar un campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo10" @keypress.enter="deleteCampo('AntPatologicos', N_campo10,ListAPA)"/>
                  <fa class='iconP' icon="fa-solid fa-x" pull="left" @click="deleteCampo('AntPatologicos', N_campo10, ListAPA)" style="margin-left: 50%; color: red;"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="ContainerMain">
          <div class="InfoSelection">
            <div  class="TitleFi">
              <FontsCat type="BoldText" text="Otros Antecedentes"/>
            </div>
            <div class="InfoConteiner">
              <div class="RowInfo2"  v-for="(element, index) in ListOA" :key="index">
                <FontsCat type="Text_B"  :text="element"/>
              </div>
            </div>
          </div>
          <div class="Conteiner2">
            <div class="agregar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Agregar un nuevo campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo5" @keypress.enter="addCampo('OtrosAnt',ListOA, N_campo5)"/>
                  <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addCampo('OtrosAnt',ListOA, N_campo5)" style="margin-left: 50%; color: #55A112;"/>
              </div>
            </div>
            <div class="eliminar">
              <div class="Subt1" >
                <FontsCat type="Text_N"  text="Eliminar un campo"/>
              </div>
              <div class="RowInfo2_2">
                  <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="100%" margin-left="30px" v-model="N_campo11" @keypress.enter="deleteCampo('OtrosAnt', N_campo11, ListOA)"/>
                  <fa class='iconP' icon="fa-solid fa-x" pull="left" @click="deleteCampo('OtrosAnt', N_campo11, ListOA)" style="margin-left: 50%; color: red;"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="ContainerMain">
          <div class="InfoSelection">
            <div  class="TitleFi">
              <FontsCat type="BoldText" text="Secciones Adicionales"/>
            </div>
            <div class="InfoConteiner2">
              <div class="RowInfo2"  v-for="(element, key) in ListDA[0]" :key="key" style="margin-left: 8%;">
                <FontsCat type="Text_B" :text="`${key}: ${Object.values(element)}`"/>
              </div>
            </div>
          </div>
          <div class="Conteiner3">
            <div class="TitleFi" >
                <FontsCat type="Text_N"  text="Agregar nueva sección"/>
              </div>
            <div class="TI_Con">
              <div class="Subt1" >
                <FontsCat type="Text_B"  text="Ingrese titulo"/>
              </div>
              <InputBox class= "inpt inptM2" placeholder="Ingrese el titulo de la sección" minWidth="100%" maxWidth="80%" margin-left="-17px" v-model="N_campo6" />
            </div>
            <div class="ICampo" v-if="N_campo6 !== null && N_campo6 !== ''">
              <div class="Subt1" >
                <FontsCat type="Text_B"  text="Ingrese campos"/>
              </div>
              <div class="RowInfo3">
                <InputBox class= "inpt inptM2" placeholder="Ingrese nombre del campo" minWidth="100%" maxWidth="85%" margin-left="25px" v-model="N_campo13" />
                <inputDropDown class= "inpt inptM4" placeholder="Ingrese tipo del campo" :opciones="listaOpciones" minWidth="110%" maxWidth="85%" margin-left="14%" v-model="OpcionSeleccionada6"/>
                <fa class='iconP' icon="fa-solid fa-square-plus" pull="left" @click="addNewData(ListDA[0], N_campo6, N_campo13, OpcionSeleccionada6)" style=" color: #55A112;"/>
              </div>
            </div>
          </div>
        </div>
      <Footer/>
    </body> 
</template>

<style scoped lang="scss">
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

.Container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 80%;
    flex-direction: column;
    margin-top: 2%;
    margin-bottom: 2%;
}

.Conteiner2{
  display: flex;
  flex-direction: row;
  width: 75%;
  margin-bottom: 2%;
  margin-top: 2%;
  justify-content: start;
  column-gap: 5%;
}
.Conteiner3{
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-bottom: 2%;
  margin-top: 2%;
  justify-content: start;
  column-gap: 5%;
  margin-left: -10%;
}

.ContainerMain{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    margin-bottom: 3%;
}

.ContainerHT {
    width: 80%;
}

.Subt1 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10%;
}

.InfoSelection {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.InfoConteiner{
    height: 100px;
    overflow-y: auto;
    overflow-x: hidden; 
    width: 80%;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Esto crea 3 columnas del mismo tamaño */
}

.InfoConteiner2{
    height: 100px;
    overflow-y: auto;
    overflow-x: hidden; 
    width: 80%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    justify-items: start;
}
  
.RowInfo2 {
    display: flex;
    justify-content: center;
    align-items: center; 
  }

.RowInfo3 {
    display: grid;
    grid-template-columns: 22fr 22fr 5fr;
    align-items: center;
    justify-content: space-evenly;
    justify-items: stretch;
    margin-top: 0%;
    margin-left: 0%;
    column-gap: 5px;
  }

.TitleFi {
  margin-left: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 80%;
}
  // Style del scrollbar 
.InfoConteiner2::-webkit-scrollbar,
.InfoConteiner::-webkit-scrollbar {
  width: 5px; /* Change size of scrollbar */
  height: auto;
  }

.InfoConteiner2::-webkit-scrollbar-thumb,
.InfoConteiner::-webkit-scrollbar-thumb {
   background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
   border-radius: 5px; /* Radio de borde del thumb */
  }
  
.iconP{
    font-size: 25px;
    width: 50px;
  }
  
.RowInfo2_2 {
  display: grid;
  grid-template-columns: 18fr 5fr;
  align-items: center;
}

.agregarV {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
.ICampo,
.TI_Con{
  display: grid;
  grid-template-columns: 10fr 23fr;
  align-items: center;
  width: 90%;
  margin-left: 10%;
}

</style>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import HeaderApp from '@/components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';
import BackBtn from '../components/BackBtn.vue';
import InputBox from '../components/InputBox.vue'; 
import inputDropDown from '../components/inputDropDown.vue'; 


import { addDoc, doc, getDocs, getDoc, arrayRemove, updateDoc } from 'firebase/firestore';
import { ConfiRef } from '../firebajse'; 


import Swal, { SweetAlertOptions } from 'sweetalert2';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'FichaConfig',
  components: {
    HeaderApp,
    BackBtn,
    FontsCat,
    Footer,
    InputBox,
    inputDropDown
  },

  data () {
    return {
      listaOpciones: [
        'Campo de texto mediano', 
        'Campo de texto grande', 
      ],
      N_campo: "" as string,
      N_campo2: "" as string,
      N_campo3: "" as string,
      N_campo4: "" as string,
      N_campo5: "" as string,
      N_campo6: "" as string,
      N_campo7: "" as string,
      N_campo8: "" as string,
      N_campo9: "" as string,
      N_campo10: "" as string,
      N_campo11: "" as string,
      N_campo12: "" as string,
      N_campo13: "" as string,
      OpcionSeleccionada6: "" as string,
      N_vacuna: "" as string,
      No_vacuna: "" as string,
    }
  },

  methods: {
    async addCampo (nombreDB: string, listCampo: Array<string>, N_campo: string) {
      if (N_campo !== '') {
        N_campo = N_campo.replace(/\s+/g, '_').trim();

        listCampo.push(N_campo)
        this.ListNC.push(N_campo)
        const docRef = doc(ConfiRef, "FichaMedica")
        const updateData: any = {
          NuevoCampo: this.ListNC,
        }
        updateData[nombreDB] = listCampo;
        await updateDoc(docRef, updateData);
        this.ToastSucces('El campo ha sido añadido exitosamente')

        this.N_campo = ''
        this.N_campo2 = ''
        this.N_campo3 = ''
        this.N_campo4 = ''
        this.N_campo5 = ''
        this.OpcionSeleccionada6 = ''
        this.N_campo6 = ''
        // window.location.reload();
      } else {
        this.ToastError("No ha sido posible agregar el campo")
      }
    },
    async addNewData (mapCampo: any, N_title:string, N_campo: string, OpcionSeleccionada: string) {
      const tempDic: { [key: string]: any } = { ...mapCampo };
      if (N_title !== '') {
        if (N_campo !== '' && OpcionSeleccionada !== '') {
          N_campo = N_campo.replace(/\s+/g, '_').trim();
          if (Object.keys(mapCampo).includes(N_title)) {
            if (!tempDic[N_title][OpcionSeleccionada]) {
              tempDic[N_title][OpcionSeleccionada] = [N_campo]; 
            } else {
              tempDic[N_title][OpcionSeleccionada].push(N_campo);
            }
      
            const docRef = doc(ConfiRef, "FichaMedica")
            await updateDoc(docRef, {
              [`DataAdicional`]: tempDic
            })
            this.ToastSucces('El campo ha sido añadido exitosamente')
          } else {
            tempDic[N_title] = { [OpcionSeleccionada]: [N_campo] };
            const docRef = doc(ConfiRef, "FichaMedica")
            await updateDoc(docRef, {
              [`DataAdicional`]: tempDic
            })
            this.ToastSucces('La sección se ha sido añadido exitosamente')
            window.location.reload();
          }
        } else {
          this.ToastNoti("Campos requeridos vacios, complete la información necesaria")
        }
      } else {
        this.ToastNoti("Debe de ingresar un titulo para la nueva sección")
      }
    },
    async deleteCampo (nombreDB: string, N_campo: string, listCampo: Array<string>) {
      if (N_campo !== '') {
        if (this.ListNC.includes(N_campo) && listCampo.includes(N_campo)) {
          const docRef = doc(ConfiRef, "FichaMedica")

          await updateDoc(docRef, {
            NuevoCampo: arrayRemove(N_campo),
            [nombreDB]: arrayRemove(N_campo)
          });

          this.ToastSucces("El campo ha sido eliminado con exito")
          this.N_campo7 = ''
          this.N_campo8 = ''
          this.N_campo9 = ''
          this.N_campo10 = ''
          this.N_campo11 = ''
          window.location.reload();
        } else {
          this.ToastError("Este campo es fijo o no existe y por ende no puede ser eliminado")
        }
      } else {
        this.ToastError("No ha sido posible eliminar el campo")
      }
    },

    async addVac () {
      if (this.No_vacuna !== '' && this.N_vacuna !== '') {
        this.N_vacuna = this.N_vacuna.replace(/\s+/g, '_').trim();
        const Vacunas_arr = this.ListVac[0] as unknown as { [key: string]: any };
        const dosis = []
        for (let i = 0; i < Number(this.No_vacuna); i++) {
          dosis.push((i + 1) + '.ª') 
        }
        Vacunas_arr[this.N_vacuna] = dosis

        const docRef = doc(ConfiRef, "FichaMedica")
        await updateDoc(docRef, {
          [`VacCampo`]: Vacunas_arr
        })
        this.ToastSucces('La vacuna ha sido añadida exitosamente')
        this.N_vacuna = ''
        this.No_vacuna = ''
      } else {
        this.ToastError("No ha sido posible agregar la vacuna")
      }
    },

    ToastSucces (title2: string) {
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
  },

  setup (props: any) {
    const ListDP = ref<string[]>([]);
    const ListDE = ref<string[]>([]);
    const ListAPRE = ref<string[]>([]);
    const ListAPA = ref<string[]>([]);
    const ListOA = ref<string[]>([]);
    const ListNC = ref<string[]>([]);
    const ListVac = ref<string[]>([]);
    const ListDA = ref<string[]>([]);
    const store = useStore();
    const Rol = computed(() => store.getters.getUserRole);

    const dataCampos = async () => {
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
      dataCampos();
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
      Rol,
      store
    }
  }

});
</script>
