<template>
    <HeaderApp class="Header"/>
    <body>
        <div class="UpperSide">
            <BackBtn class="back" ruta="/Configuraciones" />
            <FontsCat class="headerh7" type="subtitulo1" text="Registro de Usuarios"/>
        </div>
        <div class="ContainerMain">
            <div class="Container">
                <div class ="DP">
                <InputBox class= "inpt inptM4" placeholder="Ingresar correo" minWidth="100%" maxWidth="90%" margin-left="5%" v-model="Correo2"/>
                <InputBox class= "inpt inptM5" placeholder="Ingrese usuario" minWidth="100%" maxWidth="90%" margin-left="6%" v-model="User"/>
                </div>
                <div class ="DP2">
                <InputPass placeholder="Ingrese contraseña" minWidth="80%" maxWidth="87%"  v-model="password"/>
                <InputPass  placeholder="Ingrese contraseña" minWidth="80%" maxWidth="87%" v-model="password2"/>
                </div>
                <div class ="DP">
                <inputDropDown class= "inpt inptM4" placeholder="Ingrese el rol del usuario" :opciones="listaOpciones" minWidth="100%" maxWidth="90%" margin-left="4%" v-model="OpcionSeleccionada"/>
                <InputPass class="Inpass" placeholder="Ingrese codigo personal" minWidth="80%" maxWidth="87%" v-model="codPersonal"/>
                </div>

                <div class="btnConteiner">
                    <Button buttonText="Crear Usuario" @click="createUser" class="btnn" />
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

#dropdown {
  width: 115%;
  padding: 10px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px; 
  margin: 0 auto;
  margin-bottom: 15%;
}

#dropdown:focus {
  outline: none;
  border-color: #524F6C; /* Cambia el color del borde al enfocarse */
}

.Container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 80%;
    flex-direction: column;
    margin-top: 1%;
    margin-bottom: 2%;
}

.DP{
    width:80%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 3fr 3fr ;
    grid-gap: 5px;
    margin-left: 4.5%;
    margin-bottom: 1.5%;
    align-items: center;
  }

.DP2{
    width:80%;
    display: grid;
    grid-template-rows:  60px;
    grid-template-columns: 3fr 3fr ;
    grid-gap: 5px;
    margin-left: 4.5%;
    margin-bottom: 1.5%;
    align-items: center;
    justify-items: center;
  }

.btnn {
display:flex ;
justify-content: center;
text-align: center;

}

.btnConteiner{
    margin-top: 0.5%;
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

@media screen and (max-width: 600px) {
  .form-row {
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: center;
  
  }
  .form-group {
    width: 100%;
  
  }
  .inptC{
    display: flex;
    justify-content: center;
    width: 100%;
  
  }
  .inptC2{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-left: 0%;
  
  }
  
  .inptC3{
    display: flex;
    justify-content: center;
    width: 100%;
  
    margin-left: 0%;
    margin-bottom: 3%;
  }
  .inptC4{
    display: flex;
    justify-content: center;
    width: 100%;
  
  }
  .form-row2 {
    justify-content: center;
    grid-template-rows: 45fr 45fr ;
    grid-template-columns: 80%;  
  }
  
  .form-group2 {
    margin-top: 2.5%;
    margin-bottom: -3%;
  }
  
  #dropdown {
    width:103%;
    height: 30px;
    padding: 10px; 
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: white;
    font-size: 14px; 
    margin: 0 auto;
    margin-bottom: 25%;
  }
  
  .custom-select{
    margin-left: 5px;
  }
  
  .headerh7{
    margin-left: 8px;
  }
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
import inputDropDown from '../components/inputDropDown.vue'; 


import { addDoc, doc, getDocs } from 'firebase/firestore';
import { userRef, auth } from '../firebajse'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import InputDropDown from '../components/inputDropDown.vue';

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
    InputPass,
    inputDropDown
  },

  data () {
    return {
      Correo2: '',
      User: '',
      password: '',
      password2: '',
      OpcionSeleccionada: "",
      codPersonal: '',
      codEmail: '',
      result: true, 
      listaOpciones: ['Doctor', 'Secretaria']
    };
  },
  methods: {
    PropError (title1: string, text1: string) {
      const swalOptions: SweetAlertOptions = {
        position: 'center',
        icon: 'error',
        title: title1,
        text: text1,
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: 'swal2-title', // Clase para el título de la alerta
        },
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
        title: "Acción realizada con exito",
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

    PropNoti (title1: string) {
      Swal.fire(title1);
    },
    
    verificarInput (valor: string) {
      const longitudCorrecta = valor.length === 12; // tamaño de 12 caracteres
      const contieneLetras = /[a-zA-Z]/.test(valor); // tiene al menos una letra
      const contieneNumeros = /\d/.test(valor); // tiene al menos un numero 
      
      // Si todas las condiciones son verdaderas, el valor es válido
      return longitudCorrecta && contieneLetras && contieneNumeros;
    },

    doCreate () {
      const InfoArray = this.docsEmailUser;
      this.result = true
      InfoArray.forEach((element) => {
        const el = element.split('-')
      
        const eval_user = el[0].trim().toLowerCase() === this.User.trim().toLowerCase()
        const eval_email = el[1].trim().toLowerCase() === this.Correo2.trim().toLowerCase()
        
        if (eval_user) {
          this.ToastNoti('Ya existe un usuario con ese nombre')
          this.result = false 
        }

        if (eval_email) {
          this.ToastNoti('Ya hay una cuenta asociada con ese correo')
          this.result = false 
        }
      });   
      return this.result 
    },

    async createUser () {
      const newUser = {
        correo: this.Correo2,
        rol: this.OpcionSeleccionada,
        usuario: this.User,
        contraseña: this.password,
        codPersonal: this.codPersonal,
        codEmail: 'n'
      };

      const tieneCampoVacio = Object.values(newUser).some((value) => {
        if (value === '' || value === null || value === undefined) {
          return true 
        }
      });     
      if (tieneCampoVacio !== true) {
        if (this.doCreate() === true) {
          if (this.password == this.password2) {
            if (this.verificarInput(this.codPersonal) == true) {
              try {
                await addDoc(userRef, newUser);
                createUserWithEmailAndPassword(auth, this.Correo2, this.password2)
                  .then((userCredential) => {
                    // Signed in 
                    // const user = userCredential.user;
                    const user = auth.currentUser;
                    if (user) {
                      updateProfile(user, {
                        displayName: this.User
                      })
                        .then(() => {
                          this.$emit('loggedIn')
                        })
                    }
                    this.PropSucces()
                    this.$router.push('/InformacionUsuarios')
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    this.PropError('Algo salio mal', 'Intentalo nuevamente')
                  });
              } catch {
                this.PropError('Algo salio mal', 'Error al crear el usuario')
              }
            } else {
              this.ToastError('Código debe de tener 12 caracteres conformado por numeros y letras')
            }
          } else {
            this.ToastNoti('Las contraseñas no coinciden')
          }
        }
      } else {
        this.ToastError('Uno o más campos vácios')
      }
    }
  },

  setup () {
    const docsEmailUser = ref<string[]>([]);
    
    // Funcion utilizada para jalar todos los Id de los docuementos que se encuentran en la colección 
    const obtenerDocumentos = async () => {
      try {
        const querySnapshot = await getDocs(userRef);
        const arr = querySnapshot.docs.map(doc => ({ 
          usuario: doc.data().usuario, 
          correo: doc.data().correo 
        }));

        // Asigna la matriz de IDs al ref documentIds
        docsEmailUser.value = arr.map(item => `${item.usuario} - ${item.correo}`);
      } catch (error) {
        console.log('error')
      }
    };
    
    onMounted(() => {
      obtenerDocumentos();
    });

    return {
      docsEmailUser,
    };
  }

});
</script>
