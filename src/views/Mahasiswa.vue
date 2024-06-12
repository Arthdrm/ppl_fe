
<script setup>
import instance from '../api.js'
import {ref, onMounted, watch} from "vue";
import Modal from "../components/Modal.vue"
const search = ref('')
const mahasiswa = ref([])
const apiEndpoint = ref(import.meta.env.VITE_API_ENDPOINT);
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

const totalPage = ref(0);
const totalItems = ref(0);
const itemsPerPage = ref(10); // Default items per page
const page = ref(1); // Default pag


const getMahasiswa = async () =>{
  try {
    const response = await instance.get('mahasiswa', {
      params: {
        page: page.value,
        limit: itemsPerPage.value,
        search:search.value
      }
    });

    mahasiswa.value = response.data.data.data
    totalPage.value = response.data.data.total_page;
    totalItems.value = response.data.data.total_data;
    console.log(totalItems.value)
  } catch (error) {
    console.error(error);
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

watch([page, itemsPerPage, search], () => {
  getMahasiswa();
});


</script>
<template>
  <v-container>
    <v-row class="mt-5">
      <v-col>
        <div class="title">
        <h2>List Mahasiswa</h2>
        <p>VITE_API_ENDPOINT: {{ apiEndpoint }}</p>   <!-- debug -->
      </div>
      </v-col>
      <v-col class="d-flex flex-row-reverse">
<!--        <div class="ma-2 ">-->
<!--          <Modal @get-mahasiswa="getMahasisswa"/>-->
<!--        </div>-->
        <v-btn color="indigo-darken-3 ma-2 " @click="generateAllIpkMahasiswa()">
          Generate All IPK
        </v-btn>
      </v-col>
    </v-row>
    <v-row >

          <v-data-table
              :items="mahasiswa"
              :headers="headers"
              :search="search"
              :items-per-page="itemsPerPage"
              :page.sync="page"
              :server-items-length="totalItems"
              @update:items-per-page="value => itemsPerPage.value = value"
              :hide-default-footer="true"
              :disable-pagination="true"
          >
            <template v-slot:item.id="{ item, index }">
              <span>{{ (page - 1) * itemsPerPage + index + 1 }}</span>
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
            <template #bottom>
              <v-row>
                <v-col class="d-flex justify-center">
                  <v-pagination
                      v-model="page"
                      :length="totalPage"
                      total-visible="7"
                  ></v-pagination>
                </v-col>
                <v-col class="d-flex align-center">
                  <v-select
                      v-model="itemsPerPage"
                      :items="[5, 10, 20, 50, 100,totalItems]"
                      label="Items per page"
                      dense
                      hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
    </v-row>
  </v-container>

</template>
