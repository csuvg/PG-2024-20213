<template>
    <Header class="header"/>
    <body>
    <div class="conteiner">
      <div class="menu">
        <MainMenu class="MenuC"/>
      </div>
      <div class="Contenido"> 
        <div class="MainTitle">
          <FontsCat class="tituloPagina" type="subtitulo1" text="Caja del día"></FontsCat> 
        </div>
        <div class="ContainerData">
          <div class="TableConteiner">
            <TableHeadersVue :options="['Nombre del paciente', 'Concepto', 'Método de pago', 'Nombre del seguro', 'Monto paciente', 'Monto seguro', 'Monto total']" />
            <div class="InfoConteinerCD">
              <div class="RowInfo"  v-for="(element, index) in InfoArr" :key="index">
                <FontsCat   type="Text_B"  :text="element[4]"/>
                <FontsCat   type="Text_B"  :text="element[7]"/>
                <FontsCat   type="Text_B"  :text="element[8]"/>
                <FontsCat   type="Text_B"  :text="element[6]"/>
                <FontsCat   type="Text_B"  :text="element[3]"/>
                <FontsCat   type="Text_B"  :text="element[2]"/>
                <FontsCat   type="Text_B"  :text="element[1]" style="margin-left: 20px;"/>
              </div>
            </div>
          </div> 
        </div>
        <div class="TotalText"> 
          <FontsCat  type="BoldText"  text="TOTAL Q."/>
          <FontsCat  type="BoldText"  :text="TotalP.toFixed(2)"/>
          <FontsCat  type="BoldText"  :text="TotalS.toFixed(2)"/>
          <FontsCat  type="BoldText"  :text="TotalG.toFixed(2)"/>
        </div>
        <div class = "Btn">
          <Button buttonText="Cierre de caja" @click="Historial"/>
        </div>
      </div>
    </div>
    </body>
  <Footer class="ft"/>
</template>

<style scoped lang="scss" >
.conteiner {
  display: flex;
  align-items: center;
  width: 100%;
}

.header {
  margin-bottom: 20px; // margen para abajo
}

.Contenido {
  display: grid;
  width:110%;
  height: 100%;
  margin-left: 5%;
  margin-right: 3%;
}

.tituloPagina {
  display: flex;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 0%; // corre la parte del titulo 
  width: 100%;
}

.ContainerData{
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  height: 90%;
}

.TableConteiner{
  width: 100%;
  height: 90%;
}

.InfoConteinerCD{
  height: 270px;
  overflow-y: auto;
  overflow-x: hidden; 
  direction: rtl;
}

.RowInfo {
  display: grid;
  grid-template-columns: 11fr 11fr 11fr 12fr 12fr 12fr 18fr;
  align-items: center;
  justify-content: space-evenly;
  margin-top: -1%;
  grid-column-gap: 10px;
}

.RowInfo > :nth-child(7n),
.RowInfo > :nth-child(6n), 
.RowInfo > :nth-child(5n),
.RowInfo > :nth-child(4n) {
  justify-self: end;
}

// Style del scrollbar 
.InfoConteinerCD::-webkit-scrollbar {
  width: 5px; /* Change size of scrollbar */
  height: auto;
}

.InfoConteinerCD::-webkit-scrollbar-thumb {
  background-color: #aeadad; /* Color del thumb (la parte móvil del scrollbar) */
  border-radius: 5px; /* Radio de borde del thumb */
}

.Btn{
  display:flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  padding: 10px;
}
.ft {
  margin-top: 2%;
}

.menu{
  margin-top: -3%;
}

.TotalText{
  display: grid;
  grid-template-columns: 50fr 10fr 10fr 10fr;
  justify-items: center;
  margin-right: 4%;
}
.TotalText > :nth-child(1n) {
  justify-self: end;
}
</style>

<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance } from 'vue';
import Header from '../components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';
import MainMenu from '../components/MainMenu.vue';
import Button from '../components/ButtonsApp.vue';
import TableHeadersVue from '../components/TableHeaders.vue';

import { addDoc, doc, getDoc, updateDoc, query } from 'firebase/firestore';
import { FinanzasRef, ConfiRef } from '../firebajse'; 
import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';

export default defineComponent({
  name: 'CitaActual',
  components: {
    Header,
    Footer,
    MainMenu,
    FontsCat,
    Button,
    TableHeadersVue,
  },  
  props: {
    idDocumento: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      InfoArr: [] as any[][],
      TotalG: 0.00 as number,
      TotalS: 0.00 as number,
      TotalP: 0.00 as number,
      TotalE: 0.00 as number,
      TotalT: 0.00 as number,
      TotalC: 0.00 as number,
      TotalTR: 0.00 as number,
    }
  },
  methods: {
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

    DataArray () {
      const CA_array = this.infoObteined;
      let arrInfo: string[][] = [];
      let Total_general = 0;
      let Total_seguro = 0;
      let Total_paciente = 0;
      
      CA_array.forEach((element) => {
        const info_elem = element.split('$');
        arrInfo.push(info_elem);
      });

      // Logica para trabajar los porcentajes de los seguros 
      arrInfo.forEach((subArray) => {
        if (subArray[5] == '0') {
          const nameS = subArray[6]
          const getNS = this.NameSeguro[0].indexOf(nameS)
          const precio = Number(subArray[4])
          const precioS = Number(this.MontoSeguro[0][getNS])

          const paga_seguro = precioS
          const paga_paciente = precio - paga_seguro
          if (paga_paciente < 0) {
            const paga_paciente = 0.00
            subArray.push(paga_paciente.toFixed(2))
          } else {
            subArray.push(paga_seguro.toFixed(2))
            subArray.push(paga_paciente.toFixed(2))
          }

          console.log(paga_seguro)
          console.log(subArray)
        } else if (subArray[5] == '1') {
          const paga_paciente = Number(subArray[4])
          subArray.push('0.00')
          subArray.push(paga_paciente.toFixed(2))
        }
      });
      
      // Logica para manejar el totales
      arrInfo.forEach((subArray) => {
        const temp_total = Number(subArray[4])
        const temp_total_seg = Number(subArray[7])
        const temp_total_pas = Number(subArray[8])

        Total_general += temp_total
        Total_seguro += temp_total_seg
        Total_paciente += temp_total_pas
      })
      
      this.TotalG = Number(Total_general)
      this.TotalP = Number(Total_paciente)
      this.TotalS = Number(Total_seguro)
      this.InfoArr = arrInfo

      console.log(this.InfoArr)
    }, 

    Metodo () {
      let Total_efectivo = 0;
      let Total_tarjeta = 0;
      let Total_transfer = 0;
      let Total_cheque = 0;

      this.InfoArr.forEach(async (subArray) => {
        const tipo = subArray[3];

        if (tipo == 'tarjeta') {
          const temp_tarjeta = Number(subArray[8]);
          Total_tarjeta += temp_tarjeta;
        }

        if (tipo == 'efectivo') {
          const temp_efe = Number(subArray[8])
          Total_efectivo += temp_efe
        }

        if (tipo == 'transferencia') {
          const temp_tran = Number(subArray[8])
          Total_transfer += temp_tran
        }

        if (tipo == 'cheque') {
          const temp_che = Number(subArray[8])
          Total_cheque += temp_che
        }
      });

      this.TotalE = Total_efectivo
      this.TotalT = Total_tarjeta
      this.TotalC = Total_cheque
      this.TotalTR = Total_transfer
    },

    async Historial () {
      const fecha2ArrT = this.fecha_arr_tempT;
      const fecha2ArrE = this.fecha_arr_tempE;
      const fecha2ArrS = this.fecha_arr_tempS;
      const fecha2ArrC = this.fecha_arr_tempC;
      const fecha2ArrTR = this.fecha_arr_tempTR;
      
      const infoME = this.infoEfectivo;
      const infoMT = this.infoTarjeta;
      const infoMS = this.infoSeguro;
      const infoMC = this.infoCheque;
      const infoMTR = this.infoTransfer;

      this.Metodo();
      try { 
        for (const subArray of this.InfoArr) {
          const fecha = subArray[0];
          const tipo = subArray[3].toLowerCase();

          // lógica de fecha y monto
          if (!fecha2ArrT.includes(fecha) && tipo === 'tarjeta') {
            fecha2ArrT.push(fecha);
            infoMT.push(this.TotalT.toFixed(2).toString());
            // infoMT.push(`Q.${this.TotalT.toFixed(2)}`);
          } 

          if (!fecha2ArrE.includes(fecha) && tipo === 'efectivo') {
            fecha2ArrE.push(fecha);
            infoME.push(this.TotalE.toFixed(2).toString());
          } 

          if (!fecha2ArrS.includes(fecha) && tipo === 'seguro') {
            fecha2ArrS.push(fecha);
            infoMS.push(this.TotalS.toFixed(2).toString());
          } 

          if (!fecha2ArrS.includes(fecha) && tipo === 'cheque') {
            fecha2ArrC.push(fecha);
            infoMC.push(this.TotalC.toFixed(2).toString());
          } 

          if (!fecha2ArrS.includes(fecha) && tipo === 'transferencia') {
            fecha2ArrTR.push(fecha);
            infoMTR.push(this.TotalTR.toFixed(2).toString());
          } 
        }
        
        const docRef1 = doc(FinanzasRef, "tarjeta");
        await updateDoc(docRef1, {
          Fecha_F: fecha2ArrT,
          Monto_F: infoMT
        });

        const docRef2 = doc(FinanzasRef, "efectivo");
        await updateDoc(docRef2, {
          Fecha_F: fecha2ArrE,
          Monto_F: infoME
        });

        const docRef3 = doc(FinanzasRef, "seguros");
        await updateDoc(docRef3, {
          Fecha_F: fecha2ArrS,
          Monto_F: infoMS
        });

        const docRef4 = doc(FinanzasRef, "cheque");
        await updateDoc(docRef4, {
          Fecha_F: fecha2ArrC,
          Monto_F: infoMC
        });

        const docRef5 = doc(FinanzasRef, "transferencia");
        await updateDoc(docRef5, {
          Fecha_F: fecha2ArrTR,
          Monto_F: infoMTR
        });

        const docRef6 = doc(FinanzasRef, "cajaDia");
        await updateDoc(docRef6, {
          Historico_RC: [],
        });

        this.PropSucces("Cierre de caja realizado con éxito")

        this.$router.push({
          name: 'Historial_Ganancias',
        })
      } catch (error) {
        this.PropError('Ha ocurrido un error')
      }
    }
  }, 

  setup (props: any) {
    const infoObteined = ref<string[]>([]);
    const fecha_arr_tempS = ref<string[]>([]);
    const fecha_arr_tempE = ref<string[]>([]);
    const fecha_arr_tempT = ref<string[]>([]);
    const fecha_arr_tempC = ref<string[]>([]);
    const fecha_arr_tempTR = ref<string[]>([]);
    const infoEfectivo = ref<string[]>([]);
    const infoTarjeta = ref<string[]>([]);
    const infoSeguro = ref<string[]>([]);
    const infoCheque = ref<string[]>([]);
    const infoTransfer = ref<string[]>([]);

    const NameSeguro = ref<string[]>([]);
    const MontoSeguro = ref<string[]>([]);
    
    const obtenerData = async () => {
      const instance = getCurrentInstance();
      if (!instance) return; // Salir de la función si no hay instancia

      const { proxy } = instance as unknown as { proxy: { DataArray: () => void } };
      try {
        Swal.fire({
          title: 'Cargando datos...',
          html: 'Porfavor espere...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          }
        });
        const docRef = doc(FinanzasRef, "cajaDia");
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const arrData = docSnapshot.data();
          infoObteined.value = arrData.Historico_RC.toString().split(',')
        }

        const docRef2 = doc(FinanzasRef, "tarjeta");
        const docSnapshot2 = await getDoc(docRef2);
        
        if (docSnapshot2.exists()) {
          const data = docSnapshot2.data();
          for (let el in data.Fecha_F) {
            fecha_arr_tempT.value.push(data.Fecha_F[el])
            infoTarjeta.value.push(data.Monto_F[el])
          }
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se ha encontrado dicho metodo de pago',
          };
          Swal.fire(swalOptions);
        }

        const docRef3 = doc(FinanzasRef, "efectivo");
        const docSnapshot3 = await getDoc(docRef3);
        
        if (docSnapshot3.exists()) {
          const data = docSnapshot3.data();
          for (let el in data.Fecha_F) {
            fecha_arr_tempE.value.push(data.Fecha_F[el])
            infoEfectivo.value.push(data.Monto_F[el])
          }
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se ha encontrado dicho metodo de pago',
          };
          Swal.fire(swalOptions);
        }

        const docRef4 = doc(FinanzasRef, "seguros");
        const docSnapshot4 = await getDoc(docRef4);
        
        if (docSnapshot4.exists()) {
          const data = docSnapshot4.data();
          for (let el in data.Fecha_F) {
            fecha_arr_tempS.value.push(data.Fecha_F[el])
            infoSeguro.value.push(data.Monto_F[el])
          }
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se ha encontrado dicho metodo de pago',
          };
          Swal.fire(swalOptions);
        }

        const docRef5 = doc(FinanzasRef, "transferencia");
        const docSnapshot5 = await getDoc(docRef5);
        
        if (docSnapshot5.exists()) {
          const data = docSnapshot5.data();
          for (let el in data.Fecha_F) {
            fecha_arr_tempTR.value.push(data.Fecha_F[el])
            infoTransfer.value.push(data.Monto_F[el])
          }
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se ha encontrado dicho metodo de pago',
          };
          Swal.fire(swalOptions);
        }

        const docRef6 = doc(FinanzasRef, "cheque");
        const docSnapshot6 = await getDoc(docRef6);
        
        if (docSnapshot6.exists()) {
          const data = docSnapshot6.data();
          for (let el in data.Fecha_F) {
            fecha_arr_tempC.value.push(data.Fecha_F[el])
            infoCheque.value.push(data.Monto_F[el])
          }
        } else {
          const swalOptions: SweetAlertOptions = {
            timer: 1800,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            cancelButtonText: "No, cancel!",
            title: 'No se ha encontrado dicho metodo de pago',
          };
          Swal.fire(swalOptions);
        }

        if (proxy) {
          proxy.DataArray();
        }

        Swal.close(); 
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

    const dataSeguros = async () => {
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
        const docRef = doc(ConfiRef, 'Seguros')
        const querySnapshot = await getDoc(docRef)

        if (querySnapshot.exists()) {
          const data = querySnapshot.data();
          const name = data.nombre_S
          const valor = data.precio_S

          NameSeguro.value.push(name);
          MontoSeguro.value.push(valor);
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
      obtenerData();
      dataSeguros();
    });

    return {
      infoObteined,
      fecha_arr_tempT,
      fecha_arr_tempE,
      fecha_arr_tempS,
      fecha_arr_tempC,
      fecha_arr_tempTR,
      infoEfectivo,
      infoTarjeta,
      infoSeguro,
      infoCheque,
      infoTransfer,
      NameSeguro,
      MontoSeguro,
    };
  },

})
</script>

