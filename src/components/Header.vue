<template>
    <v-card class="overflow-hidden mb-3">
      <v-toolbar
          height="68px"
        elevation="20"
        color="#FEDBD0"
        dense>
        <v-toolbar-title class="mx-lg-3">
      <router-link to="/">KnockAdmin</router-link>
        </v-toolbar-title>
        <v-toolbar-items class="mx-lg-3">
          <v-btn depressed
                 color="#FEDBD0"
                small>
            <router-link to="/questions" style="text-decoration: none"><v-icon left>mdi-format-list-bulleted</v-icon>List-Post</router-link>
          </v-btn>
        </v-toolbar-items>
        <v-toolbar-items>
          <v-btn depressed
                 color="#FEDBD0"
                 small>
            <router-link to="/province" style="text-decoration: none"><v-icon left>mdi-city-variant-outline</v-icon>Province</router-link>
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
      <v-btn v-if="!login" depressed elevation="0" color="#FEDBD0" v-on:click="registerRequest" >
        <span>Register</span>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
      <v-btn v-else depressed elevation="0" color="#FEDBD0" v-on:click="logout">
        <span>Logout</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
      </v-toolbar>
    </v-card>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data (){
    return {
      login:false,
      group: '',
      drawer: '',
      items : ['menu1','menu2','menu3']
    }
  },
  methods:{
    logout(){
      firebase.auth().signOut()
      this.login = false
      this.$router.replace("/login")
      window.require('/login').reload()
    },
    registerRequest(){
      this.$router.replace("/register")
    }
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged(
        user =>{
          if(user) this.login = true
          else this.login = false
        })
  }
}
</script>

<style scoped>

a{
  color:#442c2e;
  text-decoration: none;
}

.router-link-active{
  text-decoration: none;
  font-weight: 500;
  color: black;
}
</style>