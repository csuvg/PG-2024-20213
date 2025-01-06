<template>
    <HeaderApp class="Header"/>
    <body>
        <div class="UpperSide">
            <BackBtn class="back" ruta="/InformacionUsuarios" />
            <FontsCat class="headerh7" type="subtitulo1" text="Actualización de Usuarios"/>
        </div>
        <div class="ContainerMain">
            <div class="Container">
                <div class ="DP">
                    <FontsCat class ="headerh1" type="Text_B" text='Usuario:'/>
                    <InputBox class= "inpt inptM4" placeholder="Ingresar correo" minWidth="100%" maxWidth="90%" margin-left="5%" v-model="Usuario"/>
                </div>
                <div class ="DP">
                    <FontsCat class ="headerh1" type="Text_B" text='Correo:'/>
                    <ShowingBox class="inpt5" :text="Correo2" minWidth="100%" maxWidth="88%" />
                </div>
                <div class ="DP">
                    <FontsCat class ="headerh1" type="Text_B" text='Rol:'/>
                    <inputDropDown class= "inpt inptM4" placeholder="Ingrese el rol del usuario" :opciones="listaOpciones" minWidth="100%" maxWidth="90%" margin-left="5%" v-model="OpcionSeleccionada"/>
                </div>
                <div class ="DP">
                    <FontsCat class ="headerh1" type="Text_B" text='Codigo Personal:'/>
                    <InputBox class= "inpt inptM4" placeholder="Ingresar correo" minWidth="100%" maxWidth="90%" margin-left="5%" v-model="CodPer"/>
                </div>

                <div class="btnConteiner">
                    <Button buttonText="Actualizar Usuario"  class="btnn" @click="ActualizarInfoUser"/>
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

.DP{
    width:80%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 3fr 8fr ;
    grid-gap: 5px;
    margin-left: 4.5%;
    margin-bottom: 1.5%;
    align-items: center;
  }
.DP div:first-child {
    align-items: self-start; /* Alinea el primer elemento al inicio verticalmente */
    }


.btnn {
display:flex ;
justify-content: center;
text-align: center;

}

.btnConteiner{
    margin-top: 1%;
    margin-bottom: 1.3%;
}

.ContainerMain{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.Inpass{
    margin-left: 6%;
}

.inpt5{
    margin-left: 7%;
}

</style>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import InputBox from '../components/InputBox.vue';
import Button from '../components/ButtonsApp.vue';
import HeaderApp from '@/components/HeaderApp.vue';
import Footer from '../components/FooterApp.vue';
import FontsCat from '../components/FontsCat.vue';
import BackBtn from '../components/BackBtn.vue';
import InputPass from '../components/inputPassword.vue'; 
import ShowingBox from '../components/ShowingBox.vue';
import inputDropDown from '../components/inputDropDown.vue'; 


import { addDoc, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { userRef, auth } from '../firebajse'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import InputDropDown from '../components/inputDropDown.vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'CrearUsuarioView',
  emits: ['loggedIn'],
  components: {
    InputBox,
    Button,
    HeaderApp,
    BackBtn,
    FontsCat,
    Footer,
    inputDropDown,
    ShowingBox
  },
  props: {
    idDocumento: {
      type: String, 
      required: true
    }
  },
  data () {
    return {
      listaOpciones: ['Doctor', 'Secretaria']
    }
  },

  setup (props) {
    const Usuario = ref('');
    const Correo2 = ref('');
    const OpcionSeleccionada = ref('');
    const CodPer = ref('');
    const id = ref(props.idDocumento); 

    const dataCC = async () => {
      try {        
        const docRef = doc(userRef, props.idDocumento)
        const docSnapShot = await getDoc(docRef)
        if (docSnapShot.exists()) {
        //   const doc = docSnapShot.doc(); // Obtén el primer documento (debería ser solo uno)
          const data = docSnapShot.data();
          Usuario.value = data.usuario;
          Correo2.value = data.correo;
          OpcionSeleccionada.value = data.rol;
          CodPer.value = data.codPersonal;
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
    };

    const ActualizarInfoUser = async () => {
      try {
        const docRef = doc(userRef, props.idDocumento)
        const docSnapShot = await getDoc(docRef)

        if (CodPer.value.length === 12 && /[a-zA-Z]/.test(CodPer.value) && /\d/.test(CodPer.value)) {
          if (docSnapShot.exists()) {
            const data = docSnapShot.data(); // Obtener los datos del documento
            const newData = { ...data }; // copia los datos originales.
            newData.usuario = Usuario.value
            newData.correo = Correo2.value
            newData.rol = OpcionSeleccionada.value
            newData.codPersonal = CodPer.value
           
            // se actualiza el documento
            await updateDoc(doc(userRef, props.idDocumento), newData);
            
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
        } else {
          const ToastE: SweetAlertOptions = {
            toast: true,
            timer: 6000,
            icon: "error",
            position: "top-end",
            timerProgressBar: true,
            showConfirmButton: false,
            title: "El código debe contener 12 caracteres, compuestos por letras y números.",
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }
          Swal.fire(ToastE);
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
      Usuario,
      Correo2,
      OpcionSeleccionada,
      CodPer,
      ActualizarInfoUser
    }
  },

});
</script>
