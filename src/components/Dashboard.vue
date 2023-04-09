<template>
    <div class="body">
       <div class="container">
            <div class="cards d-flex text-center" style="margin-left:15%">
                <div class="card m-5 text-white" style="background-color:#37306B">
                    <div class="card-body p-5">
                        <h1 style="font-weight:600">{{ midterms.length }}</h1>
                        <h6>All Users</h6>
                    </div>
                </div>
                <div class="card m-5 text-white" style="background-color:#37306B">
                    <div class="card-body p-5">
                        <h1 style="color:pink; font-weight:600">{{fUser}}</h1>
                        <h6>Female Users</h6>
                    </div>
                </div>
                <div class="card m-5 text-white" style="background-color:#37306B">
                    <div class="card-body p-5">
                        <h1 style="color:blue; font-weight:600">{{mUser}}</h1>
                        <h6>Male Users</h6>
                    </div>
                </div>
            </div>
            <div class="row">
                <h1>List of Users</h1>
                <hr>
                <div class="col-sm-5 col-md-4 col-lg-3" v-for="midterm in midterms" :key="midterm.id">
                    <div class="card my-3" style="width: 18rem;" :style="{background: midterm.gender === 'Male'? 'blue': 'pink', color: midterm.gender === 'Male'? 'white':'black'}" >
                        <div class="card-body">
                          <h5 class="card-title" >{{ midterm.first_name }} {{ midterm.last_name }}</h5>
                          <hr>
                          <h6 class="card-subtitle mb-2 text-body-secondary">{{midterm.address}}</h6>
                          <p class="card-text">{{ midterm.contact_number }}</p>
                          <p class="card-text">{{ midterm.email }}</p>
                          <!-- <a href="#" class="card-link">Card link</a>
                          <a href="#" class="card-link">Another link</a> -->
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
 import { ref, onMounted } from 'vue'
    import {db} from '../firebase/index.js'
    import { collection, onSnapshot} from "firebase/firestore";
    
    const midtermRef = collection(db, "midterms")
    const id = ref(1)
    const midterms = ref([])

    const fUser = ref(0)
    const mUser =  ref(0)
    
onMounted(async()=>{
    onSnapshot(midtermRef, (snapshot) => {
        const midtermTmp = [];
         let fCount = 0
         let mCount = 0

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

            midtermTmp.push(midterm)

            if(midterm.gender == 'Female'){
            fCount++
        }
            if(midterm.gender == 'Male'){
                mCount++
            }
            
         })
         midterms.value = midtermTmp
            fUser.value = fCount
            mUser.value = mCount
  });

    });  

</script>
