
<template>
  <div> 
    
  
   
    
    <div class="container">
      <div class="row">
        <h2 class="col">Đăng ký tài khoản</h2>
        <button class="btn btn-sm btn-success col" @click="goToAddContact" style="width:35px ;">
                  Sản phẩm 
    </button>
      </div>
    
      <form @submit.prevent="save">
      <div class="form-group">
        <label>Tài khoản của bạn</label> 
        <input type="text" v-model="User.name" class="form-control" placeholder="Tài khoản ">
      </div>
      <div class="form-group">
        <label>Địa chỉ của bạn</label>
        <input type="text" v-model="User.address" class="form-control"  placeholder="Địa chỉ ">
      </div>
      <div class="form-group">
        <label>Số điện thoại của bạn</label>
        <input type="text" v-model="User.phone" class="form-control"  placeholder="Số điện thoại">
      </div>
      <div class="form-group">
        <label>Số Mật khẩu của bạn</label>
        <input type="password" v-model="User.password" class="form-control"  placeholder="Mật khẩu">
      </div>
      <button type="submit" class="btn btn-primary">Đăng ký</button>
    </form>
    </div>
    <h2>Các tài khoản</h2>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tài khoản</th>
          <th scope="col">Đại chỉ</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="User in result" v-bind:key="User._id">
          <td>{{ User._id }}</td>
          <td>{{ User.name }}</td>
          <td>{{ User.address }}</td>
          <td>{{ User.phone }}</td>
          <td>
            <button type="button" class="btn btn-warning" @click="edit(User)">Edit</button>
            <button type="button" class="btn btn-danger" @click="remove(User)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
Vue.use(axios)
export default {
  name: 'User',
  data() {
    return {
      result: {},
      User: {
        _id: '',
        name: '',
        address: '',
        phone: '',
        password: ''
      }
    }
  },
  created() {
    this.UserLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },
  methods: {
    UserLoad() {
      var page = "http://localhost:8000/user/getAll";
      axios.get(page)
        .then(
          ({ data }) => {
            console.log(data);
            this.result = data.data;
          }
        );
    },
    save() {
      if (this.User._id == '') {
        this.saveData();
      }
      else {
        this.updateData();
      }
    },
    saveData() {
      axios.post("http://localhost:8000/user/create", this.User)
        .then(
          ({ data }) => {
            alert("Đã thêm tài khoản");
            this.UserLoad();
          }
        )
    },
    edit(User) {
      this.User = User;
    },
    updateData() {
      var editrecords = 'http://localhost:8000/user/update/' + this.User._id;
      axios.patch(editrecords, this.User)
        .then(
          ({ data }) => {
            this.User.name = '';
            this.User.address = '',
              this.User.phone = ''
            this.id = ''
            alert("Cập nhật thành công");
            this.UserLoad();
          }
        );
    },
    remove(User) {
      var url = `http://localhost:8000/user/delete/${User._id}`;
      axios.delete(url);
      alert("Xóa thành công");
      this.UserLoad();
    },
    goToAddContact() {
            this.$router.push({ name: "products" });
        },
  }
}
</script>