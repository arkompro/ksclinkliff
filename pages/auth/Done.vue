<script setup lang="ts">

import { onMounted } from "vue";
//import { createApp } from "vue";
import { useUserStore } from '~~/stores/user';
const userStore =  useUserStore()
import { useRegisterStore } from '~~/stores/register';
const userRegister =  useRegisterStore()
import liff from "@line/liff";
//import axios from 'axios'


definePageMeta({
  layout: "auth",
});


const Close = async () => {
//alert('ok close');
liff.closeWindow();
}
//const listdata = []
//const followdate = ref('');
//const email = ref('');
//const phone = ref('');
//const registerdate = ref('');

// const register = ref({       
//   LINEUSERID :'',   //wrong
//   DISPLAYNAME: '',
//   FOLLWDATE: '',
//   REGISTERDATE: '',
//   EMAIL: '',
//   PHONE:''
// })

// const response = await axios.get("https://api.npms.io/v2/search?q=vue");
//const response = await axios.get(`https://linenotify.ksc.net/api/LiffRegister?LineId=${userStore.$state.userId}`)
//const catTags  =  ref([]) ;
//const fullName = computed(() =>jsonData.FOLLWDATE)
//const {data:{json:{sub_regions}}} = await axios.get(`https://linenotify.ksc.net/api/LiffRegister?LineId=${userStore.$state.userId}`);

 onMounted(async () => {
  const url = `https://linenotify.ksc.net/api/LiffRegister?LineId=${userStore.$state.userId}`;

  
  try {
          await userRegister.getRegister(url);
           
        } catch (error) {

        }

     }); 

//const profileimg = ref("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwrAiMevuwrbU9o0Ck2paVf4ufHUDb2dU48MEDrAlrQw&s");
const profileimg = ref(userStore.$state.pictureUrl);
const displayName = ref(userStore.$state.displayname);

   
 
</script>


<template>
  <v-sheet elevation="0" class="mx-auto" color="transparent" max-width="1600">
   
    <v-row>
      <v-col cols="12" md="12" >
        <v-card>
          <div class="d-flex flex-column pa-10">
            <v-avatar size="120" class="mx-auto elevation-12" color="white">
              <v-img :src="profileimg"> </v-img>
            </v-avatar>

            <div class="text-center mt-5">
              <h3 class="text-h6 font-weight-bold">
              
                <v-chip size="small" class="font-weight-bold" color="blue">
                Welcome
                </v-chip>
                {{displayName}}
              </h3>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="py-5 px-10">
            <label>Follow date : </label>
            <span class="ml-4">{{ userRegister.$state.followdate }}</span>
           
          </div>

          <v-divider></v-divider>
          <div class="py-5 px-10">
            <label>Email : </label>
            <span class="ml-4">{{ userRegister.$state.email}}</span>
          </div>
          <v-divider></v-divider>

          <div class="py-5 px-10">
            <label>Phone : </label>
            <span class="ml-4">{{ userRegister.$state.phone }}</span>
          </div>
          <v-divider></v-divider>

          <div class="py-5 px-10">
            <label>Register date : </label>
            <span class="ml-4">{{ userRegister.$state.registerdate}}</span>
          </div>
          <v-divider></v-divider>
          
          <div class="py-5 px-10">
            <v-btn
              class="px-5"
              color="primary"
              elevation="1"
              variant="elevated"
              @click.prevent="Close">
              Close</v-btn>
          </div>
        
        </v-card>
      </v-col>
    
    </v-row>

  </v-sheet>
  
</template>

<style scoped lang="scss"></style>