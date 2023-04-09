<template>
    <div class="container col-md-5 offset-md-3 p-5 mt-5">            
        <div class="card p-4 border-dark ">
            <div class="alert alert-danger" v-show="error">
                {{ errorMsg }}
            </div>
            <div class="alert alert-success" v-show="success">
                {{ successMsg }}
            </div>

            <h1 class="text-center"><span style="color:#37306B;">Log In</span> Account</h1>
            <hr>
            <div class="form-group mb-3">
                <label for="email" class="form-label" >Email address: </label>
                <input type="email" class="form-control" id="email" placeholder="name@email.com" v-model="email">
            </div>
            <div class="form-group mb-3">
                <label for="password" class="form-label" >Password: </label>
                <input type="password" class="form-control" id="password" v-model="password" placeholder="Password must contain atleast 6-8 characters">
            </div>
            <div class="d-flex">
                <div class="flex-grow-1">
                    <router-link to="login">Dont have an account? Register here</router-link>
                </div>
               <button class="btn btn-primary mb-3 justify-content-end" @click="loginUser">Log in</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { auth } from '../firebase/index';
    import { signInWithEmailAndPassword } from '@firebase/auth'
    import router from '../router/index.js'

    const email         =   ref('');
    const password      =   ref('');
    const error         =   ref('');
    const errorMsg      =   ref('');
    const success       =   ref('');
    const successMsg    =   ref('');

    const loginUser = () =>{
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((cred) => {
                router.push('/home')
            })
            .catch((err)=>{
                error.value = true
                errorMsg.value = err.message
            })
    }

 
</script>