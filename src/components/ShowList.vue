<template>
  <v-app>
    <v-data-table
      v-if="!load"
      :headers="headers"
      loading
      loading-text="Loading... Please wait"
    >
    </v-data-table>
    <v-data-table
        v-if="load"
        :headers="headers"
        :items="objectArray"
        :single-expand="true"
        :expanded.sync="expanded"
        item-key="pid"
        :page.sync="page"
        :sort-by="'time'"
        :sort-desc="true"
        :items-per-page="itemsPerPage"
        show-expand
        class="elevation-1"
        hide-default-footer
        @page-count="pageCount = $event"
    >
      <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row>
              <v-col cols="mr-auto">
                <v-card class="pa-2" outlined tile style="color:#442c2e;background-color: #FEEAE6">
                  <v-icon class="mx-2" style="color:deeppink">mdi-account-box-outline
                  </v-icon>
                  <b>User-ID</b>
                </v-card>
                <v-card class="pa-2" outlined til>
                  {{ item.createBy }}
                </v-card>
              </v-col>
              <v-col cols="mr-auto">
                <v-card class="pa-2" outlined tile style="color:#442c2e;background-color: #FEEAE6">
                  <v-icon class="mx-2" style="color:deeppink">mdi-text-box-outline
                  </v-icon>
                  <b>Post-ID</b>
                </v-card>
                <v-card class="pa-2" outlined tile>
                  {{ item.pid }}
                </v-card>
              </v-col>
            </v-row>
           <v-row>
             <v-col cols="mr-auto">
               <v-card class="pa-2" outlined tile style="color:#442c2e;background-color: #FEEAE6">
                 <v-icon class="mx-2" style="color:deeppink">mdi-city-variant-outline
                 </v-icon>
                 <b>Province</b>
               </v-card>
               <v-card class="pa-2" outlined tile>
                 {{ item.state }} , {{ item.time }}
               </v-card>
             </v-col>
           </v-row>
            <v-row class="mb-1">
              <v-col  class="mr-auto" cols="auto">
              </v-col>
              <v-col cols="auto">
              <v-btn icon outlined>
                <v-icon color="pink">mdi-pencil</v-icon>
              </v-btn>
                <v-btn icon outlined class="mx-3" @click="deleteItem(item)">
                  <v-icon color="pink">mdi-trash-can</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </td>
      </template>
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="deleteItem(item)" style="color: red">mdi-delete</v-icon>
      </template>
    </v-data-table>
    <div class="text-center mt-5 mb-5">
      <v-pagination
          v-model="page"
          :length="pageCount"
          circle
      ></v-pagination>
    </div>
  </v-app>
</template>

<script>

import moment from 'moment';
import { auth , db } from "@/firebase_config";

const ref = db.ref('/Posts')

export default {
  methods:{
    deleteItem(item){
      this.editedIndex = this.objectArray.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItemConfirm(){
      ref.child(this.editedItem.state).child(this.editedItem.pid).remove()
      this.objectArray.splice(this.editedIndex, 1)
      this.closeDelete()
    }
  },
  data() {
    return {
      state:'',
      editedItem: {},
      editedIndex: -1,
      dialogDelete: false,
      expanded: [],
      defaultItem: {},
      province: [],
      objectArray: [],
      page: 1,
      pageCount:0,
      itemsPerPage: 18,
      load: false,
      headers: [
        {
          text: 'Topic',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Description', value: 'description' },
        { text: 'Time', value: 'time' },
        { text: 'Star', value: 'star' },
        { text: '', value: 'data-table-expand' ,align: 'end' },
        { text: '', value: 'actions'},
      ],
    }
  },
  created() {
    auth.currentUser.getIdToken().then(
        (token) =>{
          console.log(token)
          // eslint-disable-next-line no-undef
          axios.get('https://anonymoussocial-cfece.firebaseio.com/Posts.json?auth='+token).then(
              response =>{
                for(let key in response.data) {
                  this.state = key
                  for(let key2 in response.data[key]){
                    response.data[key][key2].state = this.state
                    response.data[key][key2].pid = key2
                    this.$delete(response.data[key][key2],'x')
                    this.$delete(response.data[key][key2],'y')
                    let timestamp = { millisecond: response.data[key][key2].time }
                    let myDate = new Date(timestamp.millisecond)
                    const formattedDate = moment(myDate.toString()).format('DD/MM/YYYY HH:MM')
                    response.data[key][key2].time = formattedDate
                    this.objectArray.push( response.data[key][key2])
                  }
                }
                this.load = true
              }).catch(
              error =>{
                console.log(error.message)
              })
        }).catch(
        (error) =>{
         console.log(error.message)
        })
  }
}
</script>

<style scoped>

</style>