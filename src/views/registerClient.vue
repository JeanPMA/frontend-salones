<template>
    <div class="content_register">
        <div class="register_icon">
            
           
            <img src="../img/logo_register.jpg" alt="">
          
        </div>
        <div class="wrapper_register">
            
            <div class="form-box register">
                <h2>REGISTRARSE</h2>
                <form action="#" @submit.prevent="registerUser"> 
                    <div class="input-box">
                        <span class="icon"><font-awesome-icon :icon="['fas', 'user']" /></span>
                        <input v-model="username" type="text" maxlength="50" required>
                        <label for="username" :class="{ 'filled': username }">Usuario</label>
                    </div>
                    <div class="input-box">
                        <span class="icon eyePassword">
                            <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" @click="togglePasswordVisibility" />
                        </span>
                        <input v-model="password" :type="showPassword ? 'text' : 'password'" maxlength="50" required>
                        <label for="password" :class="{ 'filled': password }">Contraseña</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"><font-awesome-icon :icon="['fas', 'envelope']" /></span>
                        <input v-model="correo" type="email" maxlength="100" required>
                        <label for="correo" :class="{ 'filled': correo }">correo</label>
                    </div>

                    <div class="input-box">
                        <span class="icon "><font-awesome-icon :icon="['fas', 'user']" /></span>
                        <input v-model="telefono" type="text" @input="limitesTelefono" minlength="8" maxlength="8" required>
                        <label for="telefono" :class="{ 'filled': telefono }">Telefono</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"><font-awesome-icon :icon="['fas', 'user']" /></span>
                        <input v-model="nombre" type="text" @input="bloquearCaracteresNombre" maxlength="50" required>
                        <label for="nombre" :class="{ 'filled': nombre }">Nombre</label>
                    </div>

                    <div class="input-box">
                        <span class="icon"><font-awesome-icon :icon="['fas', 'user']" /></span>
                        <input v-model="apellido" type="text" @input="bloquearCaracteresApellido" maxlength="50" required>
                        <label for="apellido" :class="{ 'filled': apellido }">Apellido</label>
                    </div>

                        <button type="submit" class="btn">
                            Registrate
                        </button>

                    <div class="register-login">
                        <p>Ya tienes una cuenta?
                        <RouterLink to="/login">
                        <a href="#" class="register-link">Login</a>
                       </RouterLink>
                    </p>
                    </div>

                    <div class="contact">
                                              
                        <p>¿Quieres formar parte de nuestro sistema?
                          
                            <a href="#" class="register-link" @click="redirectToHome">Contactanos!!!</a>
               
                    </p>
                    </div>
                </form>
            </div>
           
            
        </div>
        
        
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';
import VueNotification from '@kyvg/vue3-notification';

export default {
  name: 'LoginComponent',
  data() {
    return {
      username: "",
      password: "",
      correo: "",
      telefono: "",
      nombre: "",
      apellido: "",
      showPassword: false,
    };
  },
  components: {
      VueNotification,
    },
  methods: {
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    },
    async registerUser() {

        const data = {
            username: this.username,
            password: this.password,
            correo: this.correo,
            telefono: this.telefono,
            nombre: this.nombre,
            apellido: this.apellido,
        }
        const apiUrl = process.env.VUE_APP_BASE_URL;
        this.$axios.post(`${apiUrl}/v1/register`, data)
        .then(response => {
          
          const token = response.data.token;
          localStorage.setItem('jwtToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const decodedToken = jwt_decode(token);

            if (decodedToken.roles.includes("ROLE_USER")) {
                this.$router.push("/salones");
                this.$notify({
                    title: 'Éxito',
                    text: 'El registro se completo correctamente',
                    type: 'success',
                  });
            } else {
                this.$router.push("/register");             
                 this.$notify({
                    title: 'Error',
                    text: 'Oh no, hubo un problema en el registro. Intentalo de nuevo',
                    type: 'error',
                });
            }      
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                console.error("Credenciales incorrectas");
                this.$notify({
                    title: 'Error',
                    text: 'Oh no, hubo un problema en el registro. Intentalo de nuevo',
                    type: 'error',
                });
            } else {
                console.error("Error durante el inicio de sesión:", error);
                this.$notify({
                    title: 'Error',
                    text: 'Error, el usuario o correo ingresados ya existen.',
                    type: 'error',
                });
            }
        });

    },
    redirectToHome() {
        this.$router.push({ path: '/', query: { scrollTo: 'section4' } });
    },
    bloquearCaracteresNombre() {
      this.nombre = this.nombre.replace(/[^a-zA-Z\s]/g, '');
    },
    bloquearCaracteresApellido() {
      this.apellido = this.apellido.replace(/[^a-zA-Z\s]/g, '');
    },
    limitesTelefono(){
      this.limitarLongitudTelefono();
      this.bloquearETelefono();
    },
    limitarLongitudTelefono() {
        if (this.telefono.length > 8) {
          this.telefono = this.telefono.slice(0, 8);
        }
    },
    bloquearETelefono() {
      this.telefono = this.telefono.replace(/\D/g, '');
    },
  },
}
</script>

<style>
.content_register{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-image: url('../img/5026563.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.wrapper_register{
    position: relative;
    width: 400px;
    height: 700px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    backdrop-filter: blur(5px);
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.register_icon{
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;  
}

.register_icon img{
    width: 400px;
    height: 700px;
}

.wrapper_register .form-box{
    width: 100%;
    padding: 40px;
}

.content_register .btn{
    width: 100%;
    height: 45px;
    background: #162938;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    color: #fff;
    font-weight: 500;
}

.register-login{
    font-size: .9em;
    color: #162938;
    text-align: center;
    font-weight: 500;
    padding-top: 20px;
}

.register-login p a{
    color: #162938;
    text-decoration: none;
    font-weight: 600;
}

.register-login p a:hover{
    text-decoration: underline;
}

.contact{
    font-size: .9em;
    color: #3c5364;
    text-align: center;
    font-weight: 500;
    padding-top: 20px;
}

.contact p a{
    color: #0a5086;
    text-decoration: none;
    font-weight: 600;
}

.contact p a:hover{
    text-decoration: underline;
}

.wrapper_register .input-box{
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #162938;
    margin: 20px 0;
}

@media  screen and (max-width: 840px) {
    .register_icon{
        display: none;
    }
    .wrapper_register{
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
    }
}
</style>