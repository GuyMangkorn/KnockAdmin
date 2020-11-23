<template>
    <v-app>
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="8">
              <v-card class="elevation-12">
                <v-window style="background: #FEEAE6">
                <v-window-item>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center" style="color: #442c2e">Knock admin-panel</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" outlined fab color="#442c2e">
                            <router-link to="/questions" style="text-decoration: none">
                            <v-icon style="color: #442c2e">mdi-format-list-bulleted</v-icon>
                            </router-link>
                          </v-btn>
                          <v-btn class="mx-2" fab color="#442c2e" outlined>
                            <router-link to="/province" style="text-decoration: none">
                            <v-icon style="color: #442c2e">mdi-city-variant-outline</v-icon>
                            </router-link>
                          </v-btn>
                          <v-btn class="mx-2" fab color="#442c2e" outlined>
                            <v-icon style="color: #442c2e">mdi-account-star-outline</v-icon>
                          </v-btn>
                        </div>
                        <div class="mt-5">

                        </div>
                      </v-card-text>
                    </v-col>
                    <v-col cols="4" style="background: #442c2e">
                      <div class="text-center mt-4">
                        <h5 style="color: #FEEAE6;">Keep it in your mind.</h5>
                        <p style="color: #FEEAE6;font-weight: lighter">A person is born with feelings of envy and hate. If he gives way to them, they will lead him to violence and crime, and any sense of loyalty and good faith will be abandoned.</p>
                        <h6 align="end" style="color: #FEEAE6;font-weight: bolder">- Xun Zi</h6>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
</style>
