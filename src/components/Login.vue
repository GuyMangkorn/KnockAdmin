<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="9" sm="9">
            <v-hover >
              <template v-slot:default="{ hover }">
            <v-card :elevation="hover ? 24 : 4" class="transition-swing" style="background: #FEEAE6">
              <v-window v-model="page">
                <v-window-item :value="1">
              <v-row class="fill-height" style="background: #FEEAE6">
                <v-col cols="9" md="9"  sm="8" class="mt-6">
                  <h2 class="mx-5" style="color: #442c2e;font-weight: lighter">Login</h2>
                <v-form class="mt-6 col-md-10">
                  <v-text-field type="email"
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                prepend-icon="mdi-email"
                                required
                  ></v-text-field>
                  <v-text-field type="password"
                                v-model="password"
                                :rules="passwordRules"
                                prepend-icon="mdi-lock-outline"
                                label="Password"
                                required
                  ></v-text-field>
                </v-form>
                  <v-btn outlined class="mt-4 mb-5 mx-5" v-on:click="loginRequest">
                    Sign In
                  </v-btn>
                  <p style="text-decoration: #442c2e;font-weight: lighter" class="mx-5" >Don't have an account? <a style="font-weight: bolder" @click="++page">register</a></p>
              </v-col>
                <v-col cols="3" style="background: #442c2e">
                  <v-img
                      class="fill-height"
                      style="width: initial"
                      :src="require('../assets/padlock.svg')">
                  </v-img>
                </v-col>
              </v-row>
                </v-window-item>
                <v-window-item :value="2" >
                  <v-row class="fill-height">
                    <v-col cols="4" md="4" sm="4" style="background: #FEEAE6">
                      <v-img
                      :src="require('../assets/welcome_svg.svg')">
                      </v-img>
                      <h6 class="mt-6" align="center" style="font-weight: lighter">We grad to be in your family</h6>
                    </v-col>
                    <v-col cols="8" md="8" sm="8" style="background: #442c2e">
                      <h2 style="color: #FEDBD0;font-weight: lighter" class="mt-6 mx-5">Register</h2>
                      <v-form class="col-md-10" >
                        <v-text-field type="text"
                                      color="#FEDBD0"
                                      dark
                                      v-model="name"
                                      prepend-icon="mdi-tag-text-outline"
                                      label="Name">
                        </v-text-field>
                        <v-text-field type="email"
                                      dark
                                      color="#FEDBD0"
                                      v-model="email"
                                      :rules="emailRules"
                                      label="E-mail"
                                      prepend-icon="mdi-email">
                        </v-text-field>
                        <v-text-field type="password"
                                      dark
                                      color="#FEDBD0"
                                      v-model="password"
                                      :rules="passwordRules"
                                      label="Password"
                                      prepend-icon="mdi-lock-outline">
                        </v-text-field>
                      </v-form>
                      <v-btn outlined style="color: #FEEAE6" class="mt-4 mb-5 mx-3" v-on:click="signupRequest">
                        Sign Up
                      </v-btn>
                      <p style="color: #FEEAE6;font-weight: lighter" class="mb-5 mx-3">Already have an account? <a style="font-weight: bolder" @click="--page">login</a></p>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
export default {
  data() {
    return {
      email: '',
      password: '',
      page: 1,
      name: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[
          v => !!v || 'Password is required',
      ]
    }
  },
  methods: {
    loginRequest(){
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
          ()=>{
            this.$router.replace("/")
          }).catch(
          (error)=>{
            alert(` login fail : ${error.message}`)
          }
      )
    },
    signupRequest() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(() =>{
            alert('sign up success')
            this.$router.replace('/')
          })
          .catch((error) =>{
            alert(error.message)
          });
    }
  },
}
</script>

<style scoped>
.v-image__image{
  background-size:100% 100%;
}
</style>
