<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color:#37306B">
      <div class="container-fluid">
        <a class="navbar-brand text-white" href="#">Midterm Project</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav" v-show="!isSignedIn">
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-white">Log in</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link text-white">Register</router-link>
            </li>
          </ul>          
          <div class="collapse navbar-collapse justify-content-between" id="navbarNavDarkDropdown" v-for="midterm in midterms" :key="midterm.id" >
            <ul class="navbar-nav " v-show="isSignedIn">
              <li class="nav-item">
                <router-link to="/home" class="nav-link text-white">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/dashboard" class="nav-link text-white">Dashboard</router-link>
              </li>
            </ul>
            <ul class="navbar-nav " v-show="isSignedIn"> 
              <li class="nav-item dropdown">
                <a class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="text-decoration:none; color:#fff">
                  {{ midterm.first_name }} {{ midterm.last_name }}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><router-link to="/register" class="dropdown-item" @click="logout">Log out</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <RouterView/>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, ref } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/index.js'
import router from './router/index.js';
import { collection, onSnapshot, orderBy, query, doc} from "firebase/firestore";
import { async } from '@firebase/util';
import { db } from './firebase/index.js';

const isSignedIn = ref(false)

onMounted(()=>{
  onAuthStateChanged(auth, function(user){
    if(user){
      isSignedIn.value = true
      router.push('/home')
    }else{
      router.push('/login')
    }
  })
})

const logout = () =>{
  signOut(auth)
    .then(() =>{
      console.log('signed out!')
      isSignedIn.value = false
    })
}

const midtermRef = collection(db, "midterms")
    const id = ref(1)
    const midterms = ref([]) 

    onMounted(async()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          const mid = query(collection(db,'midterms'), orderBy('last_name'));
          onSnapshot(mid,(snapshot)=>{
            const midtermTmp = [];
            snapshot.forEach((doc)=>{
              const midterm = {
                id:doc.id,
                last_name:doc.data().last_name,
                first_name:doc.data().first_name,
                address:doc.data().address,
                contact_number:doc.data().contact_number,
                gender:doc.data().gender,
                email:doc.data().email,
                completed:doc.data().completed
              }
              if(midterm.email === user.email){
                midtermTmp.push(midterm);
              }
            })
            midterms.value = midtermTmp
          })
        }
      })
    })
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
 *{
  font-family: 'Poppins', sans-serif;
 }

 .nav-link {
    color:#fff;
    font-weight: 500;
    transition: all 200ms linear;
 }

 .nav-item:hover .nav-link{
	color: #90E0EF;
}

.nav-item.active .nav-link{
	color:azure;
}

.nav-link {
	position: relative;
	padding: 5px;
	display: inline-block;
  color:#fff;
  
}

.nav-item:after{
	position: absolute;
	bottom: -5px;
	left: 0;
	width: 100%;
	height: 2px;
	content: '';
	background-color: #90E0EF;
	opacity: 0;
    transition: all 200ms linear;
}
.nav-item:hover:after{
	bottom: 0;
	opacity: 1;
}
.nav-item.active:hover:after{
	opacity: 0;
}
.nav-item{
	position: relative;
    transition: all 200ms linear;
}
</style>