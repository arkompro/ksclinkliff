import { defineStore } from "pinia";
import axios from "axios";

//const $axios = axios();

export const useRegisterStore = defineStore('register', {
    state: () => ({
        id: '',
        display_name: '',
        followdate: '',
        registerdate: '',
        email: '',
        phone: '',
    }),
    actions: {

        async getRegister(url) {
            let res = await axios.get(url)
            this.$state.id = res.data.register[0].LINEUSERID
            this.$state.display_name = res.data.register[0].DISPLAYNAME
            this.$state.followdate = res.data.register[0].FOLLOWDATE      
            this.$state.registerdate = res.data.register[0].REGISTERDATE   
            this.$state.email = res.data.register[0].EMAIL   
            this.$state.phone = res.data.register[0].PHONE   
        },

        resetState() {      
            this.$state.id = ''
            this.$state.display_name = ''
            this.$state.followdate = ''
            this.$state.registerdate = ''
            this.$state.email = ''
            this.$state.phone = ''
        },
    },
    persist: true,
})

export default useRegisterStore;