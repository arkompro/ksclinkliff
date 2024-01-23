
<script setup lang="ts">
//import { Icon } from "@iconify/vue";
//import { onMounted } from "vue";
//import { ref } from 'vue'
//import PageLoader from '~/components/PageLoader.vue'
import { useUserStore } from '~~/stores/user';
import axios from 'axios'

const userStore =  useUserStore()
//const userStore = useUserStore()

import liff from "@line/liff";
import { onMounted } from "vue";
//const lineuserid = ref()
const pictureUrl = ref()
const displayName = ref('')
//const statusMessage = ref()
const isLoggedIn = ref(false)


 onMounted(async () => {
        liff
         .init({
           liffId: '2002698449-1ZY4qJEx',
           withLoginOnExternalBrowser: true,
         })
         .then(() => {
           if (liff.isLoggedIn()) {
             isLoggedIn.value = liff.isLoggedIn();
             liff.getProfile().then((profile) => {
             // lineuserid.value = profile.userId;
               pictureUrl.value = profile.pictureUrl;
               displayName.value = profile.displayName;
              // statusMessage.value = profile.statusMessage;
              // useUserStore.setUser(email.value, password.value,'','','');
             setuserlogin(profile);
             });
           }
         });
   
     });
     const setuserlogin = async (profile: any)  => {
        
        try {
    
           await userStore.setUser(profile.userId, profile.displayName,profile.pictureUrl,profile.statusMessage);
          // const url = `https://linenotify.ksc.net/api/LiffRegister?lineuserid=sdsdsdsdsd`
          const url = `https://linenotify.ksc.net/api/LiffRegister?lineuserid=${userStore.$state.userId}`
       axios.get(url).then((res) => {
        if(res.data != null){

         router.push('done');
        }
        else
        {
          errorProvider.value = true;
          errorProviderMessages.value = 'ไม่พบข้อมูลการลงทะเบียน กรุณาลงทะเบียน.';
        }
      });
         
        }
         catch (error) {
            //errors.value = error.response.data.errors
            errorProvider.value = true;
          //errorProviderMessages.value = error;
        }
      }

definePageMeta({
  layout: "auth",
});

const router = useRouter()
const isLoading = ref(false);

const isSignInDisabled = ref(false);
const isRegister = ref(false);

const refLoginForm = ref();
const email = ref("");
const password = ref("");
const registercode = ref(null)
const phoneNumber = ref(null);
const isFormValid = ref(true);


// show password field
const showPassword = ref(false);
const loginWithEmailAndPassword = async (email: string, password: string) => {
  router.push("/");
};

const loginWithGoogle = async () => {
  router.push("/");
};

const handleLogin = async () => {
  const { valid } = await refLoginForm.value.validate();
  if (valid) {
    isLoading.value = true;
    isSignInDisabled.value = true;
     
     const url = `https://linenotify.ksc.net/api/LiffRegister?CustId=${registercode.value}`
   // const url = `https://localhost:44359/api/LiffRegister?CustId=${registercode.value}`
       axios.get(url).then((res) => {
       
        if(res.data != '' && res.data != null){
         
           if(userStore.$state.userId  === '' || userStore.$state.userId === null)
           {
            //alert('not found line userid please try again.');
            errorProvider.value = true;
            errorProviderMessages.value = 'not found line userid please try again.';
            //return false;

           }
           else
           {
            errorProvider.value = true;
            errorProviderMessages.value = res.data;
            
            isLoading.value = false;
           
            //this.formSubmit();
           }

        }
        else
        {
           // OK register
           // alert('ok register');
            register();


           // errorProvider.value = true;
           // errorProviderMessages.value = 'To register, please fill in these mandatory fields.';
           //isLoading.value = false;
        }
        isSignInDisabled.value = false;
      });

  } else {
    console.log("no");
  } 
};

const register = ()=>{
    const url = 'https://linenotify.ksc.net/api/LiffRegister'
   // const url = 'https://localhost:44359/api/LiffRegister'
     axios.post(url, {
     "LINEUSERID": userStore.$state.userId,
      "REGISTERCODE":  registercode.value,
      "PHONE": phoneNumber.value
    }).then((res) => {
        // this.$router.push('/register/done')
        if(res.status==200)
        {
          //alert(res.message);
          router.push('done');
        }
        else
        {
         // alert(res.statusText);
         
            errorProvider.value = true;
            errorProviderMessages.value = res.statusText;
          return false;
        }
   //  alert(res.status);
       }).catch(e => console.log(e))

      }

const signInWithGoolgle = () => {
  loginWithGoogle();
};

// Error Check
// const emailRules = ref([
//   (v: string) => !!v || "E-mail is required",
//   (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
// ]);

// const passwordRules = ref([
//   (v: string) => !!v || "Password is required",
//   (v: string) =>
//     (v && v.length <= 10) || "Password must be less than 10 characters",
// ]);

const registercodeRules = ref([
  (v: string) => !!v || "Registercode is required",
]);

const phoneNumberRules = ref([
  (v: string) => !!v || "Phone number is required",
  (v: string) =>
    (v && v.length == 10) || "Phone number must be a 10-digit number",
  (v: string) =>
    (v && /^[0-9]*$/.test(v)) || (v && /^[0]([0-9]{9})*$/.test(v))  ||"Input must be a number",
]);

// error provider
const errorProvider = ref(false);
const errorProviderMessages = ref("");

const error = ref(false);
const errorMessages = ref("");
const resetErrors = () => {
  error.value = false;
  errorMessages.value = "";
};


</script>


<template>

<!--div v-if="!isLoggedIn"><PageLoader/></!--div-->
  <div v-if="isLoggedIn">
  <v-card color="white" class="pa-3 ma-3" elevation="3">
    <v-card-title class="my-4 text-h4">
      <span class="flex-fill"> Register </span>
      
    </v-card-title>
    <v-avatar size="120" class="mx-auto elevation-12" color="white">
              <!--v-img  src="~/assets/profile.png"> </!--v-img-->
              <v-img v-if="pictureUrl == ''" src="~/assets/profile.png" alt=""></v-img>
            <v-img v-else :src="pictureUrl" alt=""></v-img>
            </v-avatar>

    <v-card-subtitle>{{ displayName }} </v-card-subtitle>
    <!-- sign in form {{ userStore.$state.userId }}-->
    <v-card-subtitle>{{ userStore.$state.userId  }} </v-card-subtitle>

    <v-card-text>
      <v-form ref="refLoginForm" class="text-left" v-model="isFormValid" lazy-validation>
        <v-text-field ref="refRegistercode" v-model="registercode" required :error="error" label="Register code" density="default"
          variant="underlined" color="primary" bg-color="#fff" :rules="registercodeRules" name="registercode" outlined validateOn="blur"
           @keyup.enter="handleLogin" @change="resetErrors"></v-text-field>

        <v-text-field ref="refPassword" v-model="phoneNumber" 
        inputType="text" :error="error" :error-messages="errorMessages" label="Phone number"
          density="default" variant="underlined" color="primary" bg-color="#fff"
          :rules="phoneNumberRules" name="phone" outlined validateOn="blur" @change="resetErrors"
          @keyup.enter="handleLogin"></v-text-field>

        <v-btn :loading="isLoading" :disabled="isSignInDisabled" block size="x-large" color="primary" @click="handleLogin"
          class="mt-2">Login</v-btn>

     
        <!-- external providers list -->
      
      <div class="text-center">
        <div v-if="errorProvider" class="error--text my-2 text-warning bg-dark">
          {{ errorProviderMessages }}
        </div>
      </div>
      </v-form></v-card-text>
  </v-card>
</div>
</template>



<style scoped lang="scss">
.main-bg {
  background-image: linear-gradient(to right, #D5DBE7, #D5DBE7);
}
</style>