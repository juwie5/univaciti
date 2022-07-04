<template>
  <div>
        <section>  
           <div class="signup-container">
                    <form action="#">
                        <h4 class="create-acct-title">Sign in to your account</h4>
                        <div>
                            <input type="text" name="email" id="email" placeholder="email" v-model="form.email" required>
                            <div class="pass">
                                <input type="password" name="password" id="password" placeholder="password" v-model="form.password" required ref="password">
                                <p class="pass-toggle" v-if="hide" @click="showPassword()">SHOW</p>
                                <p class="pass-toggle" v-if="!hide" @click="showPassword()">HIDE</p>
                            </div>
                        </div>
                        <p class="pass-forgot">Forgot Password?</p>
                        <button type="button" class="btn signin-acct-btn" @click="loginIn()">Sign in</button>
                       
                        <p class="dont-have-acct">
                            <router-link to="/signup">Create account</router-link> 
                            if you don't have an account.
                        </p>
                    </form>
                </div>       

        </section>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
 name : 'Login',
 data : () => {
  return {
     show: true,
     hide: true,
    form: {
      email: '',
      password: ''
    }
  }
 },
  methods:{
        showPassword(){
            let password = this.$refs.password
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                this.hide = !this.hide    
        },
        ...mapActions({
          signIn: 'auth/signIn',
        }),
         loginIn(){
            this.signIn(this.form)
        }  
  }

  
}
</script>


<style lang="scss">
#signup {
    background-color: #97ffa6;
    padding: 5% 7%;
    height: 100vh;
}

.signup-image   {
    position: absolute;
    left: 40rem;
    width: 38rem;
}

.signup-container   {
    background-color: #fff;
    display: block;
    width: 40%;
    padding: 5% 3%;
    margin-bottom: 5%;
}

.create-acct-title  {
    font-size: 1rem;
}

.create-acct-paragraph  {
    color: #6F6F6F;
}

.signup-container input  {
    display: block;
    width: 100%;
    margin: 3% 0;
    padding: 10px;
}

.create-acct-btn    {
    padding: 10px 20px;
    background-color: #53FF6E;
    margin-top: -1rem;
    font-size: 1rem;
    display: inline-block;
}

.create-acct-btn:hover   {
    color: #fff;
    background-color: #000000;
}
.signin-acct-btn    {
    padding: 10px 20px;
    background-color: #53FF6E;
    margin: 1.5rem 0 1rem;
    font-size: 1rem;
    display: inline-block;
    width: 45%;
}

.signin-acct-btn:hover   {
    color: #fff;
    background-color: #000000;
}

.pass-forgot    {
    float: right;
    font-size: 0.9rem;
    text-align: right;
}

.pass-forgot  a  {
    color: #000;
    text-decoration: none;
}

.pass-forgot  a:hover  {
    color: #53FF6E;
}

.dont-have-acct {
    font-size: 0.8rem;
    text-align: center;
}

.dont-have-acct a {
    color: #53FF6E;
}

.dont-have-acct a:hover {
    color: #00410a;
    text-decoration: none;
}

.pass{
    position: relative;
}

.pass-toggle{
    position: absolute;
    right: 10px;
    top: -7px;
    color: #6F6F6F;
    cursor: pointer;
}

@media only screen and (min-width: 320px) and (max-width: 475px){
    .signup-container{
      display: flex;
      align-items: center;
      justify-content: center;
        width: 80%;
    }
}



</style>