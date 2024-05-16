
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

const getDataKrsMahasiswa = async (id) =>{
  try {
    const res = await instance.post('mahasiswa/krs',{id:id});
    return res.data.data
  } catch (error) {

  }
}

function convertToGrade(grade) {
  if (grade >= 85) return { gradeHuruf: 'A', bobot: 4.0 };
  if (grade >= 70) return { gradeHuruf: 'B', bobot: 3.0 };
  if (grade >= 55) return { gradeHuruf: 'C', bobot: 2.0 };
  if (grade >= 40) return { gradeHuruf: 'D', bobot: 1.0 };
  return { gradeHuruf: 'E', bobot: 0.0 };
}

const generateIpkMahasiswa = async (index) => {
  const krs =  await getDataKrsMahasiswa(mahasiswa.value[index].id)

  if (krs.length === 0) {
    console.log("Mahasiswa tidak memiliki data KRS.");
    mahasiswa.value[index].IPK = '-'
    return ;
  }

  let totalSks = 0;
  let totalGradePoint = 0;

   krs.forEach(krs => {
     totalSks += krs.sks;
     totalGradePoint += convertToGrade(krs.nilai).bobot * krs.sks;
   })
  console.log(totalSks)
  console.log(totalGradePoint)

  const ipk = totalGradePoint / totalSks;



  mahasiswa.value[index].IPK = ipk
}

const generateAllIpkMahasiswa = async () => {
  for (let index in mahasiswa.value){
    console.log(index)
    let krs = await getDataKrsMahasiswa(mahasiswa.value[index].id)
    if (krs.length === 0) {
      console.log("Mahasiswa tidak memiliki data KRS.");
      mahasiswa.value[index].IPK = '-'
      return ;
    }

    let totalSks = 0;
    let totalGradePoint = 0;

    krs.forEach(krs => {
      totalSks += krs.sks;
      totalGradePoint += convertToGrade(krs.nilai).bobot * krs.sks;
    })
    console.log(totalSks)
    console.log(totalGradePoint)

    const ipk = totalGradePoint / totalSks;

    mahasiswa.value[index].IPK = ipk
  }
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
        <div class="ma-2 ">
          <Modal @get-mahasiswa="getMahasisswa"/>
        </div>
        <v-btn color="indigo-darken-3 ma-2 " @click="generateAllIpkMahasiswa()">
          Generate All IPK
        </v-btn>
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
