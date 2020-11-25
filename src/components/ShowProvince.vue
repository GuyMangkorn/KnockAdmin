<template>
  <v-app>
  <v-container fluid>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page="page"
        :search="search"
        :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc"
        hide-default-footer
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12" sm="6" md="4" lg="3">
            <v-card elevation="3">
              <v-card-title class="subheading font-weight-bold" style="background: #FEEAE6">
                {{ item.name }}
              </v-card-title>


              <v-list dense>
                <v-list-item
                    v-for="(key, index) in filteredKeys"
                    :key="index"
                >
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">
                    {{ key }}:
                  </v-list-item-content>
                  <v-list-item-content
                      class="align-end"
                      :class="{ 'blue--text': sortBy === key }">
                    {{ item[key.toLowerCase()] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
            class="mt-2"
            align="center"
            justify="center"
        >
          <v-pagination
              circle
              v-model="page"
              :length="numberOfPages"
          ></v-pagination>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase/app'
import {db} from "@/firebase_config";
export default {
    data () {
      return {
        objectArray: [],
        itemsPerPageArray: [4, 8, 12],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'name',
        keys: [
          'Name',
          'Today',
          'Yesterday',
          'Total',
        ],
        items: [],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
  created() {
      firebase.auth().currentUser.getIdToken().then(
          token => {
            axios.get('https://anonymoussocial-cfece.firebaseio.com/Posts.json/?auth='+token).then(
                response => {
                  for(let key in response.data){
                    let obj = {}
                    this.objectArray.push(key)
                    db.ref('/Posts/'+key).once('value',(data) => {
                      obj["name"] = key
                      obj["today"] = data.numChildren().toString()
                      obj["total"] = data.numChildren().toString()
                      this.items.push(obj)
                      console.log(this.items)
                    })
                  }
                }
            )
          }
      )
  }
}
</script>

<style scoped>

</style>