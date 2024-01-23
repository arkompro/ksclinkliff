<template>
    <h1 v-if="!isLoggedIn">ログインします</h1>
    <div v-if="isLoggedIn">
      <img alt="LINE Profile" width="100" height="100" :src="profileImg" />
      <h1>Hello, {{ userName }}</h1>
      <p class="text-width" v-if="scanMsg">読み取ったテキスト: {{ scanMsg }}</p>
      <button class="btn-square" @click="scanQR">読み取り</button>
    </div>
  </template>
  
  <script>
  import liff from "@line/liff";
  
  export default {
    name: "App",
    data() {
      return {
        isLoggedIn: false,
        profileImg: undefined,
        userName: undefined,
        scanMsg: "",
      };
    },
    created() {
      liff
        .init({
          liffId: '2002698449-1ZY4qJEx',
          withLoginOnExternalBrowser: true,
        })
        .then(() => {
          this.isLoggedIn = liff.isLoggedIn();
          if (this.isLoggedIn) {
            liff.getProfile().then((profile) => {
              this.userName = profile.displayName;
              this.profileImg = profile.pictureUrl;
            });
          }
        });
    },
    methods: {
      scanQR: function () {
        liff
          .scanCodeV2()
          .then((result) => {
            this.scanMsg = result.value;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .text-width {
    width: 100%;
  }
  .btn-square {
    display: inline-block;
    padding: 0.5em 1em;
    text-decoration: none;
    background: #42b983;
    color: #fff;
    border-bottom: solid 4px #627295;
    border-radius: 3px;
  }
  .btn-square:active {
    -webkit-transform: translateY(4px);
    transform: translateY(4px);
    border-bottom: none;
  }
  </style>