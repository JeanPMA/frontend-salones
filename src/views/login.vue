<template>
    <div class="content_login">

    <div class="wrapper">
        
        <div class="form-box login">
            <h2>LOGIN</h2>
            <form action="#">
                <div class="input-box">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'user']" /></span>
                    <input type="usuario" required>
                    <label for="usuario">Usuario</label>
                </div>
                <div class="input-box">
                    <span class="icon"><font-awesome-icon :icon="['fas', 'lock']" /></span>
                    <input type="password" required>
                    <label for="password">Contraseña</label>
                </div>
                <div class="remember-forgot">
                    <label> <input type="checkbox">Recuerdame</label>
                    <a href="#">Olvidaste tu contraseña?</a>
                </div>
                <RouterLink to="/salones">
                    <button type="submit" class="btn">
                        Login
                    </button>
                </RouterLink>
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

export default {
  name: 'LoginComponent',
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
    font-size: 2em;
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
    transform: translateY(-50%);
    font-size: 1em;
    color: #162938;
    font-weight: 500;
    pointer-events: none;
    transition: 0.5s ease;
}

.input-box input:focus~label,
.input-box input:valid~label{
    top: -5px;
}

.input-box input{
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: #162938;
    font-weight: 600;
    margin-right: 10px;
}

.input-box .icon{
    position: absolute;
    right: 8px;
    font-size: 1.2em;
    color: #162938;
    line-height: 57px;
}

.remember-forgot{
    font-size: .9em;
    color: #162938;
    font-weight: 500;
    margin: -15px 0 15px;
    display: flex;
    justify-content: space-between;
}

.remember-forgot label input{
    accent-color: #162938;
    margin-right: 3px;
}

.remember-forgot a{
    color: #162938;
    text-decoration: none;
}

.remember-forgot a:hover{
    text-decoration: underline;
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

</style>