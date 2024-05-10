
<script setup>
import instance from '../api.js'
import {ref,onMounted } from "vue";
import Modal from "../components/Modal.vue"
const search = ref('')
const mahasiswa = ref([])
const headers = [
  {
    title:'ID',
    align:'start',
    key:'id'
  },
  {
    title:'NIM',
    align:'start',
    key:'nim'
  },
  {
    title:'Jurusan',
    align:'start',
    key:'jurusan'
  },
  {
    title:'No Telp',
    align:'start',
    key:'notelp'
  },
  {
    title:'Email',
    align:'start',
    key:'email'
  },
  {
    title:'Alamat',
    align:'start',
    key:'alamat'
  },
  {
    title:'IPK',
    align:'start',
    key:'IPK'
  },
  {
    title:'Actions',
    align:'start',
    key:'Actions',
    sortable:false
  }
]
const getMahasiswa = async () =>{
  try {
    const res = await instance.get('mahasiswa');
    mahasiswa.value = res.data.data
  } catch (error) {
    
  }
}

function generateIpkMahasiswa(index){
  mahasiswa.value[index].IPK = index
}

onMounted(() => {
  getMahasiswa()
  console.log(mahasiswa.value)
})




</script>
<template>
  <v-container>
    <v-row class="mt-5">
      <v-col>
        <div class="title">
        <h2>List Mahasiswa X</h2>
      </div>
      </v-col>
      <v-col class="d-flex flex-row-reverse">
        <div class="btn">
          <Modal @get-mahasiswa="getMahasiswa"/>
        </div>
      </v-col>
    </v-row>
    <v-row >
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              single-line
            ></v-text-field>

          <v-data-table
            :items="mahasiswa"
            :headers="headers"
            :search="search"
          >
            <template v-slot:item.id="{ item, index }">
              <span>{{index + 1}}</span>
            </template>
            <template v-slot:item.IPK="{ item, index }">
              <span v-if="mahasiswa[index].IPK === undefined">-</span>
              <span v-else>{{item.IPK}}</span>
            </template>
            <template v-slot:item.Actions="{ item, index }">
              <v-btn color="green" @click="generateIpkMahasiswa(index)">
                Generate IPK
              </v-btn>
            </template>
          </v-data-table>
    </v-row>
  </v-container>

</template>
