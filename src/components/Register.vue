<template>
    <div class="container col-md-5 offset-md-3 p-5 mx-auto">            
        <div class="card p-4 border-dark ">
            <div class="alert alert-danger" v-show="error">
                {{ errorMsg }}
            </div>
            <div class="alert alert-success" v-show="success">
                {{ successMsg }}
            </div>

            <h1 class="text-center"><span style="color:#37306B;">Register</span> Account</h1>
            <hr>
            <div class="form-group mb-3">
                <label for="l_name" class="form-label" >Last Name: </label>
                <input type="text" class="form-control" id="l_name" placeholder="" v-model="last_name">
            </div>
            <div class="form-group mb-3">
                <label for="f_name" class="form-label" >First Name: </label>
                <input type="text" class="form-control" id="f_name" placeholder="" v-model="first_name">
            </div>
            <div class="form-group mb-3">
                <label for="address" class="form-label" >Address: </label>
                <input type="text" class="form-control" id="address" placeholder="" v-model="address">
            </div>
            <div class="form-group mb-3">
                <label for="contact_number" class="form-label" >Contact Number: </label>
                <input type="number" class="form-control" id="contact_number" placeholder="" v-model="contact_number">
            </div>
            <div class="form-group mb-3">
                <label for="gender" class="form-label" >Gender: </label>
                <select class="form-select" v-model="gender" placeholder="Select gender">   
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>     
                  </select>
            </div>
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
                    <router-link to="login">Already have an account</router-link>
                </div>
               <button class="btn btn-primary mb-3 justify-content-end" @click="register">Register</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { auth } from '../firebase/index.js'
    import { createUserWithEmailAndPassword} from'firebase/auth';
    import { db } from '../firebase';
    import { collection, addDoc} from '@firebase/firestore';
    


    const last_name         =   ref('');
    const first_name        =   ref('');
    const address           =   ref('');
    const gender            =   ref('');
    const contact_number    =   ref('')
    const email             =   ref('');
    const password          =   ref('');
    const error             =   ref('');
    const errorMsg          =   ref('');
    const success           =   ref('');
    const successMsg        =   ref('');

    const register = async () =>{
        if(last_name.value!='' && first_name.value!='' && gender.value!=''&& email.value!= '' && password.value !=''){
            await addDoc(collection(db,'midterms'),{
                last_name:last_name.value,
                first_name:first_name.value,
                address:address.value,
                gender:gender.value,
                contact_number:contact_number.value,
                email:email.value,
                password:password.value,

                completed: false
            })

            createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((cred)=>{
                console.log("user created", cred.user)
                email.value         =   ''
                password.value      =   ''
                error.value         =   false
                success.value       =   true
                successMsg.value    =   "Registered Successfully"
               
            })
            .catch((err)=>{
                error.value         =   true
                errorMsg.value      =   err.message
            })
            last_name.value = ''
            first_name.value = ''
            address.value   =''
            gender.value = ''
            email.value = null
            contact_number.value = ''
            password.value = null
    
        }else{
            error.value             =   true
            errorMsg.value          =   "Please fill out all fields"
        }
    }

</script>