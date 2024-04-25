<script setup>
import {ref} from "vue";
import instance from '../api.js'
const props = defineProps({

})

const emit = defineEmits(['getMahasiswa'])

const dataMahasiswa = ref({
      nim:'',
      jurusan:'',
      notelp:'',
      email:'',
      alamat:''
})


const dialog = ref(false)

const createMahasiswa = async () =>{
  try {
    const res = await instance.post('mahasiswa/create',dataMahasiswa.value);
    dialog.value = false
    emit('getMahasiswa')
  } catch (error) {
    
  }
}

</script>

<template>
 <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
              class="mb-2"
              v-bind="activatorProps"
              color="primary"
              large
              dark
            >
              Add Mahasiswa
            </v-btn>
      </template>

      <v-card
        title="User Profile"
      >
       <v-card-text>
        <v-row>
            <v-col>
                <v-text-field label="NIM" variant="outlined" v-model="dataMahasiswa.nim"></v-text-field>
            </v-col>
            <v-col>
                <v-text-field label="Jurusan" variant="outlined" v-model="dataMahasiswa.jurusan"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field label="No Telp" variant="outlined" v-model="dataMahasiswa.notelp"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field label="Email" variant="outlined" v-model="dataMahasiswa.email"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field label="Alamat" variant="outlined" v-model="dataMahasiswa.alamat"></v-text-field>
            </v-col>
        </v-row>
       </v-card-text>


        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn @click="createMahasiswa">
            Save
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>

</style>