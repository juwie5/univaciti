<template>
    <div>
        <section>
             <div class="signup-container">
                <form @submit.prevent="reqUser">
                    <h4 class="create-acct-title">Create your account</h4>
                    <p class="create-acct-paragraph">Fill the form below to register</p>
                    <input type="text" name="firstname"  placeholder="Firstname" v-model="form.firstname" maxlength="30" required>
                    <input type="text" name="lastname"  placeholder="Lastname" v-model="form.lastname" maxlength="30" required>
                    <input type="text" name="address"  placeholder="Address" v-model="form.address" maxlength="80" required>
                    <input type="email" name="email" placeholder="Email address" v-model="form.email" required>
                    <input type="tel" name="phoneNumber" placeholder="Mobile Number" v-model="form.mobilenumber" maxlength="11" required>
                    <div class="pass">
                            <input type="password" name="password" id="password" placeholder="Password" v-model="form.password" required ref="password">
                            <p>Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.</p>
                            <p class="pass-toggle" v-if="hide" @click="showPassword()">SHOW</p>
                            <p class="pass-toggle" v-if="!hide" @click="showPassword()">HIDE</p>
                        </div>
                    <button type="submit" class="btn create-acct-btn">Create account</button>
                    <p><router-link class="acct" to="/">Sign in</router-link> if you already have an account.</p>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { show } from "@/services/show.js"
export default {
    name : 'Signup',
    data: () => {
        return {
           form: {
            email: '',
            firstname: '',
            lastname: '',
            mobilenumber: '',
            password: '',
            address: '',
        },
        show: true,
        hide: true                                   
     }
    },
    methods:{
        showPassword(){
            show()
            this.hide = !this.hide 
        },
        ...mapActions({
            signUp: 'auth/signUp'
        }),
        reqUser(){
            this.signUp(this.form)
        }
    }
}
</script>

<style scoped>

</style>