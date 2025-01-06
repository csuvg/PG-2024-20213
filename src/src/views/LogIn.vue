<!-- HTML -->
<template>
<body>
    <img src="@/assets/nubes.png" class="Nube" />
    <img src="@/assets/nubes.png" class="Nube nube1" />
    <img src="@/assets/nubes.png" class="Nube nube2" />
    <div class="loginConteiner">
      <div class="Titulos">
        <img src="../img/logo_t2.png" alt="Logo de la aplicacion" class="LogoApp" />
        <FontsCat type="titulo" class="tituloheader" text="Inicio de Sesión"></FontsCat> <!-- texto de inicio de sesion -->
      </div>
      <div class="InputConteiner">
        <div class="LogoInputConteiner">
          <fa class='icons' icon="fa-solid fa-user" pull="left" />
          <InputBox class ="inpt" placeholder="Ingresa tu usuario" minWidth="80%" maxWidth="80%" v-model="User"  @keypress.enter="login"></InputBox>
        </div>
        <div class="LogoInputConteiner">
          <fa class='icons' icon="fa-solid fa-lock" pull="left" /> 
          <InputPass  class ="inptCo4" placeholder="Ingresa la contraseña"  minWidth="70%" maxWidth="74.6%" v-model="password"  @keypress.enter="login"/>
        </div>
      </div>
        <div class="buttons">
          <Button class="button" buttonText="Ingresar" @click="login"/>
        </div>
        <FontsCat type="Referencia" @click="GotoReset" class="OP" text="Haz click para restablecer contraseña"></FontsCat>
    </div>

    </body>
  <Footer class="footer" />
</template>

<!-- STYLE -->
<style scoped lang="scss">
.Nube {
  height: 280px;
  position: absolute;
  left: 70%; 
  bottom: 26%;
}

.nube1 {
  bottom: -8%;
  left: -17%;
}

.nube2 {
  top: -8%;
  left: 10%;
}

.icons{
  color: #666666;
  height:35px;
  width: auto;
  margin-left: 119%;
  // border: 1px solid orange;
}

.inpt{ 
  margin-left: 6%;
}
.inptCo4{
   margin-left: 15%;
}

.LogoInputConteiner{
  display: grid;
  align-items: center;
  width: 80%;
  margin-left: 10%;
  grid-template-rows:  80px;
  grid-template-columns: 3fr 45fr ;
  grid-gap: -15px;
  // border: 1px solid purple;
}

.LogoApp {
  max-width: 13em;
  margin-right: 24px;
  margin-left: -7%;
  height: auto;
  
}

body {
  background: rgba(220, 120, 41, 0.8);
  min-height: 91.7vh;
  max-height: 94.7vh;
  width: 100%;
  display: flex; //push x xd
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.loginConteiner{
  background-color: white;
  border-radius: 35px;
  box-shadow:  15px 15px 30px #585858bb; //sombras
  // tamanios....
  // width: 30%; //ancho del cuadro
  width: 580px; //ancho maximo del cuadro blanco
  height: 535px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // para modificar el ancho...
  margin: 0 auto; //centrar horizontalmente el cuadro blanco
  margin-left: 1px; // reduci el margen izquierdo
  margin-right: 1px; // reduce el margen derecho
  margin-top: -1%;
  position: relative;
}

.InputConteiner {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  // border: 1px solid green;
}

.Titulos {
  display: flex;
  height: 25%;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: -7%;
  margin-bottom: 40px; // ajustar segun sea necesario
  // border: 1px solid red;
}
.footer{
  // position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(220, 120, 41, 0.8);
  margin-top: auto;
}
.buttons {
  height: 14%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  //border: 1px solid blue;
  }

.tituloheader{
  font-size: 40px;
}

.OP{
  font-size: 16px;
}

@media screen and (max-width: 600px) {
.loginConteiner{
  width: 80%; //ancho del cuadro
  height: 550px;
  // max-width: 790px; 
}

.LogoApp {
  margin-left: 17%;
  max-width: 9em;
}

.icons{
  margin-left: 50%;
   height:25px;
  // border: 1px solid orange;
}

.Titulos {
  margin-left: -35%;
  margin-bottom: 20px; 
}
.tituloheader{
  font-size: 28px;
}
.OP{
  font-size: 12px;
}
}
</style>

<!-- SCRIPT -->
<script lang="ts">
import { mapActions } from 'vuex';
import { defineComponent, ref } from 'vue';

import router from '../router';
import InputBox from '../components/InputBox.vue';
import Footer from '../components/FooterApp1.vue';
import FontsCat from '../components/FontsCat.vue';
import Button from '../components/ButtonsApp.vue';
import InputPass from '../components/inputPassword.vue'; 

import { userRef, auth } from "../firebajse";
import { getDocs, where, query, updateDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";


import emailjs from 'emailjs-com'; // libreria para mandar correos.
import CryptoJS from 'crypto-js'

import Swal, { SweetAlertOptions, SweetAlertIcon } from 'sweetalert2';
import { faHomeLgAlt } from '@fortawesome/free-solid-svg-icons';

export default defineComponent({
  name: 'LoginView',
  components: {
    InputBox,
    Footer,
    FontsCat,
    Button,
    InputPass
  },

  data () {
    return {
      User: '' as string,
      password: '' as string,
      // estos es lo utilizado para mandar el correo.
      nombreUsuario: '' as string, // nombre del usuario a quien le mandamos el correo.
      from_name: 'Clinica Just Kids' as string, 
      message: '' as string, // pagina para actualizar la contrasena.
      reply_to: '' as string, // user a quien le mando el corredo 
      code: '' as string, 
      role: '' as string,
    };
  },

  methods: {
    ...mapActions(['setUserRole', 'setUser']),
    
    async login () {
      // agregar la modificacion para que el login pueda verificar si se intenta ingresar por medio de usuario y contrasena.
      try {
        // verificar si lo ingresado es correo o si es usuario.
        const esCorreo = this.User.includes('@'); // variable que verifica si el campo tiene @ 
        
        // definir el campo en /el que se realiza la busqueda.
        const field = esCorreo ? 'correo' : 'usuario';
        const querySnapshot = await getDocs(query(userRef, where(field, '==', this.User)));

        if (querySnapshot.empty) {
          this.PropError("Oops...", "Usuario o contraseña incorrecta")
          return;
        }
     
        const usuario = querySnapshot.docs[0].data();
        const storedEmail = usuario.correo;
        this.role = usuario.rol;
        const storedPassword = usuario.contraseña; // ajustar contrasenia
        const en_password = this.encryptText(this.password)
        if (this.password === storedPassword) {
          signInWithEmailAndPassword(auth, storedEmail, storedPassword) 
            .then(() => {
              this.$emit('userRole', this.role);
              this.setUserRole(this.role); // almacena el rol utilizando Vuex
              localStorage.setItem('userRole', this.role)
              // localStorage.setItem('userEmail', usuario.correo)

              this.$router.push('/agendar'); // redirige a la pagina principal "agenda".  
            })  
        } else {
          this.PropError("Oops...", "Usuario o contraseña incorrecta")
        }
      } catch (error) {
        this.PropError("Ha ocurrido un error...", "Inténtelo nuevamente más tarde")
      }
    },

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

    PropNoti () {
      Swal.fire("Revisa tu correo para restablecer contraseña");
    },

    async updateValue (id: string, code: string) {
      // Especifica el ID del documento
      const docId = id;
      const docRef = doc(userRef, docId);

      try {
        // Realiza la actualización del campo
        await updateDoc(docRef, {
          codEmail: code
        });        
      } catch (error) {
        this.PropError("No se ha podido realizar acción...", "Inténtelo nuevamente")
      }
    },
    // Funcion para cambiar de pestaña a cambiar contraseña
    GotoReset () {
      // Verificar si el valor ingresado es un correo electrónico o una contraseña
      const esCorreo = this.User.includes('@');
      const field = esCorreo ? 'correo' : 'usuario'; // si esCorreo es verdadero, 'correo'. Si es falso 'usuario'. 
      const queryRef = query(userRef, where(field, '==', this.User));
      this.code = this.generateCode();

      getDocs(queryRef)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            this.PropError("Oops...", "Usuario o correo incorecto")
            return;
          } else {
            querySnapshot.forEach((doc) => {
              this.nombreUsuario = doc.data().usuario;
              this.reply_to = doc.data().correo;

              this.updateValue(doc.id, this.code);
            });
          }
          this.setUser(this.reply_to);
          this.enviarCorreo(this.code); // mandamos a llamar el metodo que envia el correo con la recuperacion de contraseña.
        })
        .catch((error) => {
          this.PropError("Ha ocurrido un error...", "Inténtelo nuevamente más tarde");
        });
    },

    generateCode () {
      var num = Math.floor(Math.random() * (90000000 - 99 + 1) + 10000000);
      return num.toString().substring(0, 8);
    },

    enviarCorreo (code: string) {
      this.message = `Hemos recibido una solicitud para cambiar la contraseña asociada a tu cuenta.
                      Si has sido tú quien ha solicitado este cambio, ten en cuenta que tu codigo es ${code}.
                      
                      Si no solicitaste un cambio de contraseña, por favor ignora este correo
                      `

      const templateParams = {
        to_name: this.nombreUsuario,
        from_name: this.from_name,
        message: this.message,
        reply_to: this.reply_to,
      };
      // Configura EmailJS directamente aquí
      emailjs.init('6wKuukpUKL4AU_eTy');

      // Envía el correo electrónico
      emailjs.send('service_y5nm6je', 'template_4zi6gue', templateParams) // cambiar las credenciales cuando sea con el correo de clinica los angeles.
        .then((response) => {
          this.PropNoti();    
          this.$router.push('/CambiarContra');
        })
        .catch((error) => {
          this.PropError("Ha ocurrido un error...", "Inténtelo nuevamente más tarde");
        });
    },

    encryptText (text:string) {
      const passphrase = 'klg0AZHyui893#%'; 
      const encryptedText = CryptoJS.AES.encrypt(text, passphrase).toString();
      return encryptedText;
    },
  },
});
</script>
