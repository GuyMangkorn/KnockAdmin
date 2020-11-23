<template>
  <div class="row">
    <b-jumbotron header="Register" class="col-sm-5 m-auto">
      <div>
        <form id="signup-form" @submit.prevent="signupRequest">
          <div class="row">
            <div class="col-sm-12 mt-4 form-group">
              <label><b>Name</b></label>
              <input type="text" id="name" v-model="name" class="form-control form-control-lg">
            </div>
            <div class="col-sm-12 form-group">
              <label><b>Email address</b></label>
              <input type="email" id="email" v-model="email" class="form-control form-control-lg">
            </div>
            <div class="col-sm-12 form-group">
              <label><b>Password</b></label>
              <input type="password" id="password" v-model="password" class="form-control form-control-lg">
            </div>
            <div class="col-sm-12 form-group text-center">
              <button class="btn btn-primary btn-lg col-sm-4">Register</button>
            </div>
            <div class="col-sm-12 form-group mt-3 text-center">
              <p>Already have an account? <router-link to="/login">login</router-link></p>
            </div>
          </div>
        </form>
        <div>
      </div>
      </div>
    </b-jumbotron>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return{
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signupRequest() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(() =>{
            alert('sign up success')
            this.$router.replace('/Home')
          })
          .catch((error) =>{
            alert(error.message)
          });
    }
  }
}
</script>

<style scoped>

</style>