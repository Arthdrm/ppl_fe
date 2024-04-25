<script setup>
import {ref} from "vue";

const mahasiswa = ref([
  {
    "ID": 1,
    "NIM": "A001",
    "Jurusan": "Teknik Informatika",
    "NoTelp": "081234567890",
    "Email": "student1@example.com",
    "Alamat": "Jalan Mawar No. 1, Jakarta"
  },
  {
    "ID": 2,
    "NIM": "A002",
    "Jurusan": "Sistem Informasi",
    "NoTelp": "081234567891",
    "Email": "student2@example.com",
    "Alamat": "Jalan Melati No. 10, Bandung"
  },
  {
    "ID": 3,
    "NIM": "A003",
    "Jurusan": "Biologi",
    "NoTelp": "081234567892",
    "Email": "student3@example.com",
    "Alamat": "Jalan Tulip No. 5, Surabaya"
  },
  {
    "ID": 4,
    "NIM": "A004",
    "Jurusan": "Fisika",
    "NoTelp": "081234567893",
    "Email": "student4@example.com",
    "Alamat": "Jalan Dahlia No. 11, Yogyakarta"
  }
])

</script>

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>List Mahasiswa</h4>
        <RouterLink to="/mahasiswa/create" class="btn btn-primary float-end">
          Tambah Mahasiswa
        </RouterLink>
      </div>
      <div class="card-body ">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NIM</th>
              <th scope="col">Jurusan</th>
              <th scope="col">No Telp</th>
              <th scope="col">Email</th>
              <th scope="col">Alamat</th>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in mahasiswa" :key="index">
              <td>{{data.ID}}</td>
              <td>{{data.NIM}}</td>
              <td>{{data.Jurusan}}</td>
              <td>{{data.NoTelp}}</td>
              <td>{{data.Email}}</td>
              <td>{{data.Alamat}}</td>
              <td>
                <RouterLink to="/" class="btn btn-success">
                  Edit
                </RouterLink>
                <button type="button" class="btn btn-danger">Delete</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
</template>

<style scoped>

</style>