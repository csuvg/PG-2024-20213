// ----------- HTML PART ---------------------
<template>
    <h1 v-if="type === 'titulo'">{{ customText }}</h1>
    <h2 class ="Title2" v-else-if="type === 'subtitulo1'">{{ customText }}</h2>
    <h3 class= 'SubT' v-else-if="type === 'subtitulo2'">{{customText}}</h3>
    <h3 class= 'Wtext' v-else-if="type === 'WhiteText'">{{customText}}</h3>
    <h3 class= 'Receta' v-else-if="type === 'Receta'">{{customText}}</h3>
    <h3 class= 'HReceta' v-else-if="type === 'HeaderReceta'">{{customText}}</h3>
    <p class = 'Text_P' v-else-if="type === 'Text_P'">{{customText}}</p>
    <p class = 'Text_N' v-else-if="type === 'Text_N'">{{customText}}</p>
    <p class = 'Text_B' v-else-if="type === 'Text_B'">{{customText}}</p>
    <p class = 'Text_G' v-else-if="type === 'Text_G'">{{customText}}</p>
    <p class = 'BoldT' v-else-if="type === 'BoldText'">{{customText}}</p>
    <p class = 'Noti' v-else-if="type === 'Notification'">{{customText}}</p>
    <p class = 'error' v-else-if="type === 'Error'">{{customText}}</p>
    <a class = 'Referencia' v-else-if="type === 'Referencia'">{{customText}}</a>
</template>

// ----------- STYLE PART ---------------------

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Cantata+One&family=Della+Respira&family=Julius+Sans+One&family=Poppins:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes');

h1, h2{
  color:#000000;
  // font-family: Georgia, serif;
  font-family: 'Della Respira';
}
.Title2{
  font-weight: 400;
}

.SubT{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #CD5B2E;
}

.Wtext{
  font-family: 'Poppins', sans-serif;
  font-weight: 200;
  color: #fff;
}

.BoldT{
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #CD5B2E;
}

.Receta{
  font-family: 'Great Vibes';
  color: #CD5B2E;
}

.Text_P{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  // color: #89291c;
  color: #AE3C2D;
}

.Text_N{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #89291c;
}

.Text_B{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #000000;
}

// .Text_B2{
//   font-family: 'Poppins', sans-serif;
//   font-weight: 400;
//   color: #000000;
//   font-size: 18px
// }

.Text_G{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #908C8C;
}

.Noti{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #000000;
}

.error{
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: red;
}

.Catalogo{
    align-items: center;
}

.HReceta {
  font-family: "Cantata One", serif;
  color: #CD5B2E;

}

.Referencia{
  color: #706f6f;
  font-weight: 100;
  
  font-family: 'Poppins', sans-serif;
}

.Referencia:hover{
  cursor: pointer;
  font-weight: 300;
  color: #424242;
}
@media screen and (min-width: 601px) {
  h1 {
    font-size: 35px;
  }

  h2{
    font-size: 28px;
  }

  h3.SubT {
    font-size: 22px;
  }

  h3.Wtext {
    font-size: 20px;
  }

  h3.Receta {
    font-size: 30px;
  }

  h3.HReceta {
    font-size: 20px;
  }

  p.Noti {
    font-size: 15px;
  }

  p.error{
    font-size: 13px;
  }

  p{
     font-size: 18px;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    font-size: 25px;
  }

  h2{
    font-size: 20px;
  }

  h3.SubT {
    font-size: 17px;
  }

  h3.Wtext {
    font-size: 17px;
  }

  h3.Receta {
    font-size: 16px;
  }

  p.Noti {
    font-size: 12px;
  }

  p.error{
    font-size: 10px;
  }

  p{
     font-size: 15px;
  }
}
</style>

// ----------- SCRIPT PART ---------------------
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

// Export component
export default defineComponent({
  // name of the Component (same as .vue doc)
  name: 'FontsCat',
  // Defined props needed (works as param)
  props: {
    // prop that asigns a msg
    text: {
      type: String,
      default: '',
    },
    // prop that defind the type of text to show
    type: {
      type: String,
      default: 'body',
    },
  },
  data () {
    return {
      customText2: '', // local var to save msg    option original
    };
  },
  // nueva opcion a considerar 
  setup (props) {
    const customText = ref(props.text);

    // Observar cambios en la prop 'text' y actualizar 'customText'
    watch(() => props.text, (newVal) => {
      customText.value = newVal;
    });

    return {
      customText,
    };
  },
  mounted () {
    this.customText2 = this.text; // assings the value of mgs to local var  option original
  },
});
</script>

//https://fonts.google.com/specimen/Alex+Brush?preview.text=Dra.%20Allison%20Jeannete%20Avila%20Barrera&sort=alpha
//https://fonts.google.com/specimen/Great+Vibes?sort=alpha
