<template>
    <div class="content_login">

    <div class="wrapper">
        
        <div class="form-box login">
            <h2>LOGIN</h2>
            <form action="#" @submit.prevent="login">
                <div class="input-box">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'user']" /></span>
                    <input type="username" v-model="username" maxlength="50" class="filled" required>
                    <label for="username" :class="{ 'filled': username }">Usuario</label>
                </div>
                <div class="input-box">
                    <span class="icon eyePassword">
                        <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" @click="togglePasswordVisibility" />
                    </span>
                    <input :type="showPassword ? 'text' : 'password'" v-model="password" maxlength="50" class="filled" required>
                    <label for="password" :class="{ 'filled': password }">Contraseña</label>
                </div>

                
                    <button type="submit" class="btn">
                        Login
                    </button>
                
                <div class="login-register">
                    <p>No tienes una cuenta?
                    <RouterLink to="/register">
                    <a href="#" class="register-link">Registrate</a>
                    </RouterLink>
                </p>
                </div>
            </form>
        </div>

        
    </div>

    <div class="login_icon">
        <img src="../img/logo_login.jpg" alt=""> 
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
    login() {
      const credentials = { username: this.username, password: this.password };
      
      const apiUrl = process.env.VUE_APP_BASE_URL;
      this.$axios.post(`${apiUrl}/v1/login`, credentials)
      
        .then(response => {
          
          const token = response.data.token;
          localStorage.setItem('jwtToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const decodedToken = jwt_decode(token);
          
          if (decodedToken && decodedToken.roles) {
            
            
            if (decodedToken.roles.includes("ROLE_ADMIN")) {
              this.$router.push("/lista-salones-admin");
              this.$notify({
                title: 'Éxito',
                text: 'Bienvenido.',
                type: 'success',
              });
            } else if (decodedToken.roles.includes("ROLE_OWNER")) {
              this.$router.push("/lista-salones");
              this.$notify({
                title: 'Éxito',
                text: 'Bienvenido.',
                type: 'success',
              });
            } else if (decodedToken.roles.includes("ROLE_USER")) {
              this.$router.push("/salones");
              this.$notify({
                title: 'Éxito',
                text: 'Bienvenido.',
                type: 'success',
              });
            } else {
              this.$router.push("/login");
              this.$notify({
                title: 'Error',
                text: 'Error de rol',
                type: 'error',
              });
            }
          } else {
            this.$router.push("/login");
            this.$notify({
                title: 'Error',
                text: 'Usuario o contraseña invalidos',
                type: 'error',
            });
          }
         
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                this.$notify({
                    title: 'Error',
                    text: 'Error, no existe el usuario o usuario deshabilitado, contactese con el administrador.',
                    type: 'error',
                });
            } else {
                console.error("Error durante el inicio de sesión:", error);
                this.$notify({
                    title: 'Error',
                    text: 'Usuario o contraseña invalidas',
                    type: 'error',
                });
            }
        });
    },
  },
}
</script>

<style>

body{
    margin: 0px;
}

.content_login{
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

.wrapper{
    position: relative;
    width: 400px;
    height: 550px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    backdrop-filter: blur(5px);
    border-bottom-left-radius: 20px;
    border-top-left-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.login_icon{
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.login_icon img{
    width: 400px;
    height: 550px;
}

.wrapper .form-box{
    width: 100%;
    padding: 40px;
    
}

.form-box h2{
    color: #162938;
    text-align: center;
    margin-top: 20px;
}

.input-box{
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #162938;
    margin: 30px 0;
}

.input-box label{
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-25%);
    font-size: 1em;
    color: #162938;
    font-weight: 500;
    pointer-events: none;
    transition: 0.5s ease;
}

.input-box label.filled,
.input-box input:focus + label,
.input-box input:valid + label {
    top: -5px;
    transform: translateY(-50%);
}

.input-box input{
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: #162938;
    font-weight: 600;
    padding-right: 40px;
}

.input-box .icon{
    position: absolute;
    right: 8px;
    font-size: 1.2em;
    color: #162938;
    line-height: 57px;
}

.content_login .btn{
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

.login-register{
    font-size: .9em;
    color: #162938;
    text-align: center;
    font-weight: 500;
    margin: 25px 0 10px;
}

.login-register p a{
    color: #162938;
    text-decoration: none;
    font-weight: 600;
}

.login-register p a:hover{
    text-decoration: underline;
}

.eyePassword{
    cursor: pointer;
}

@media  screen and (max-width: 600px) {
    .login_icon{
        display: none;
    }
    .wrapper {
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
    }
}
</style>