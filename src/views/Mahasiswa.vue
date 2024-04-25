
<script setup>
import instance from '../api.js'
import {ref,onMounted } from "vue";
import Modal from "../components/Modal.vue"
const search = ref('')
const mahasiswa = ref([])

const getMahasiswa = async () =>{
  try {
    const res = await instance.get('mahasiswa');
    mahasiswa.value = res.data.data
  } catch (error) {
    
  }
}



onMounted(() => {
  getMahasiswa()
})




</script>
<template>
  <v-container>
    <v-row class="mt-5">
      <v-col>
        <div class="title">
        <h2>List Mahasiswa</h2>
      </div>
      </v-col>
      <v-col class="d-flex flex-row-reverse">
        <div class="btn">
          <Modal @get-mahasiswa="getMahasiswa"/>
        </div>
      </v-col>
    </v-row>
    <v-row >
          <template v-slot:text>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </template>

          <v-data-table
            :items="mahasiswa"
            :search="search"
          ></v-data-table>
    </v-row>
  </v-container>

</template>
