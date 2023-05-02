
<template>
  <div>

    <div class="container">
      <div class="row">
        <h2 class="col">Thêm sản phẩm</h2>
        <button class="btn btn-sm btn-success col" @click="goToAddContact" style="width:35px ;">
                  tài khoản
    </button>
      </div>
    
      <form @submit.prevent="save">
      <div class="form-group">
        <label>Tên Sản Phẩm </label> 
        <input type="text" v-model="Product.name" class="form-control" placeholder="Tên Sản Phẩm">
      </div>
      <div class="form-group">
        <label>Loại sản phẩm</label>
        <input type="text" v-model="Product.type" class="form-control"  placeholder="Loại sản phẩm">
      </div>
      <div class="form-group">
        <label>Giá sản phẩm</label>
        <input type="text" v-model="Product.price" class="form-control"  placeholder="Giá sản phẩm">
      </div>
      <div class="form-group">
        <label>Hình ảnh</label>
        <input type="text" v-model="Product.image" class="form-control"  placeholder="Hình ảnh">
      </div>
      
      <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
    </form>
    </div>
    <h2>Sản Phẩm</h2>
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col">Tên Sản Phẩm</th>
          <th scope="col">Thể Loại</th>
          <th scope="col">Giá Tiền</th>
          <th scope="col">Hình Ảnh</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="Product in result" v-bind:key="Product._id">
          <td>{{ Product.name }}</td>
          <td>{{ Product.type }}</td>
          <td>{{ Product.price }}</td>
          <td><img v-bind:src="Product.image"  style="height: 50px;"/> </td>
          <td>
            <button type="button" class="btn btn-warning" @click="edit(Product)">Edit</button>
            <button type="button" class="btn btn-danger" @click=" remove(Product)">Delete</button>
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
  name: 'products',
  data() {
    return {
      result: {},
      Product: {
        _id: '',
        name: '',
        type: '',
        price: '',
        image: ''
      }
    }
  },
  created() {
    this.ProductLoad();
  },
  mounted() {
    console.log("mounted() called.......");
  },
  methods: {
    ProductLoad() {
      var page = "http://localhost:8000/product/getAll";
      axios.get(page)
        .then(
          ({ data }) => {
            console.log(data);
            this.result = data.data;
          }
        );
    },
    save() {
      if (this.Product._id == '') {
        this.saveData();
      }
      else {
        this.updateData();
      }
    },
    saveData() {
      axios.post("http://localhost:8000/product/create", this.Product)
        .then(
          ({ data }) => {
            alert("Đã thêm sản phẩm");
            this.ProductLoad();
          }
        )
    },
    edit(Product) {
      this.Product = Product;
    },
    updateData() {
      var editrecords = 'http://localhost:8000/product/update/' + this.Product._id;
      axios.patch(editrecords, this.Product)
        .then(
          ({ data }) => {
            this.Product.name = '';
            this.Product.address = '',
              this.Product.phone = ''
            this.id = ''
            alert("Cập nhật thành công");
            this.ProductLoad();
          }
        );
    },
    remove(Product) {
      var url = `http://localhost:8000/product/delete/${Product._id}`;
      axios.delete(url);
      alert("Xóa thành công");
      this.ProductLoad();
    },
    goToAddContact() {
            this.$router.push({ name: "User" });
        },
  }
}
</script>