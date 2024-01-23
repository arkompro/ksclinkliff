import { defineStore } from "pinia";
//import axios from "axios";

//const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: () => ({
        userId: null,
        displayname: '',
        pictureUrl: '',
        statusMessage: '',
        isLoggedIn: false,
    }),
    actions: {
       
        async setUser(userid1,displayname1,pictureUrl1,statusMessage1) {
            //let res = await $axios.get('/api/user')
            this.$state.userId = userid1
            this.$state.displayname = displayname1
            this.$state.pictureUrl = pictureUrl1    
            this.$state.statusMessage = statusMessage1
        },
      
       
    },
    persist: true,
    
})

export default useUserStore;