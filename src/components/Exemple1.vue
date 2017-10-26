<template>
  <div>
      TEST API
    <hr>
    <br>
    <form v-on:submit.prevent>
        login : <input type="text" v-model="info.email"><br>
        mdp : <input type="password" v-model="info.password"><br>
        <input v-on:click.stop="login" type="submit" value="Envoyer">
    </form>
    <br>
      SUBSCRIBE
    <br>
    <form v-on:submit.prevent>
        name : <input type="email" v-model="info.name"><br>
        email : <input type="email" v-model="info.email"><br>
        mdp : <input type="password" v-model="info.password"><br>
        c_mdp : <input type="password" v-model="info.c_password"><br>
        <input v-on:click.stop="register" type="submit" value="Envoyer">
    </form>
    Test API
    <button v-on:click="test">Test</button>
  </div>
</template>

<script>
import axios from 'axios'

// const auth = {
//   id: '5',
//   secret: 'wQg5JowNacLau3LzMwEiLrZtDfW8PsR4MdFqoWzH'
// }

export default {
  name: 'hello',
  data () {
    return {
      info: {
        // id: auth.name,
        // secret: auth.secret,
        name: '',
        email: '',
        password: '',
        c_password: ''
      }
    }
  },
  methods: {
    login: function (event) {
      console.log(JSON.stringify(this.info))
      axios.post('http://127.0.0.1:8000/api/login', this.info)
        .then(response => {
          console.log(response.data.success)
        })
        .catch(response => {
          // List errors on response...
        })
    },
    register: function (event) {
      console.log(JSON.stringify(this.info))
      axios.post('http://127.0.0.1:8000/api/register', this.info)
        .then(response => {
          console.log(response.data.success)
        })
        .catch(response => {
          // List errors on response...
        })
    },
    test: function () {
      axios({
        url: 'http://127.0.0.1:8000/api/details',
        method: 'post',
        baseUrl: 'http://127.0.0.1:8000/api/',
        headers: {
          Accept: 'application/json',
          // Authorization: 'Bearer ' + 'AeYt4fXIbVd02vobI6eyef0Za25iia480BYYVh7IlS0qYRIw3rUHfn0XRWD8.eyJhdWQiOiI2IiwianRpIjoiZDNhOWMzMTBjNDQxYmY5MzU4YWQ1NjhlMmI4ZjBhY2I2OTBhMThiNWVjYjNiNDRkYWYzNWQ2M2VlOWNkOGI3OTQyNGJmMTFjMTlmNWQ4YjgiLCJpYXQiOjE1MDY3MDk2NzQsIm5iZiI6MTUwNjcwOTY3NCwiZXhwIjoxNTM4MjQ1Njc0LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.U-DYyHRozGfxL6qcvtK1eFYVmC9m-rZObFhOLZ5Kke2Bg7EG5Fxj1qOXH8n0G6QP8Cbu6eEvrL0dpvFK54bDI9naINiicfUDWWeltDOtD_0w6kRmfY47ERYqh5EPoCanCD7cp4-A1tZr11k4gvA2ZkJJRySh1awZJVgSreabMLDngcumyQvKcS7ipY_sgRs3p4HGNJTnb-JTAIm5gCu2OuFmBMRu8mfsxi-A7re5aykLjY3MaisyoAl7M219mChIDN4Uhjnj3IePwCfU756kpqhe4BUg3rW7FGKsrKu4wKTi3yguz58Ie8gC71tfH_rhrOVAbr9vUpIpcnRyTf4UweHOzjXin8ONy6PRKZH_67TWZMgLKcOMHtVNcdxr3yZBMHi7pkDuwf7Tq8i7gQJ0aL2ic6pqRpNFNmpnUyCTyjouBFRa6P9HJ0Y-8NwrZseYlnz5UgigNNazf8_NP2v9TWJIldejpjgwmnQ0ePdBeerdHq5JeJJTpMBVUzW0K3pA4RCCIC6LWomwwMhuRa7WhJNMcR6xgw_o2WeyMRoXicXs2IO8ymAMTi1YZ3dg0OhKyMVvGVzr9-wVtAEzZExxx0zNSfDMD2yleDOcSlyF9t_Jc_dozbH7EtbvlxGhqRIWCzpQMvAflDTKGhoaTJhb4RThvI1vfQydaqsqtGa9d6s'
          Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQzYTljMzEwYzQ0MWJmOTM1OGFkNTY4ZTJiOGYwYWNiNjkwYTE4YjVlY2IzYjQ0ZGFmMzVkNjNlZTljZDhiNzk0MjRiZjExYzE5ZjVkOGI4In0.eyJhdWQiOiI2IiwianRpIjoiZDNhOWMzMTBjNDQxYmY5MzU4YWQ1NjhlMmI4ZjBhY2I2OTBhMThiNWVjYjNiNDRkYWYzNWQ2M2VlOWNkOGI3OTQyNGJmMTFjMTlmNWQ4YjgiLCJpYXQiOjE1MDY3MDk2NzQsIm5iZiI6MTUwNjcwOTY3NCwiZXhwIjoxNTM4MjQ1Njc0LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.U-DYyHRozGfxL6qcvtK1eFYVmC9m-rZObFhOLZ5Kke2Bg7EG5Fxj1qOXH8n0G6QP8Cbu6eEvrL0dpvFK54bDI9naINiicfUDWWeltDOtD_0w6kRmfY47ERYqh5EPoCanCD7cp4-A1tZr11k4gvA2ZkJJRySh1awZJVgSreabMLDngcumyQvKcS7ipY_sgRs3p4HGNJTnb-JTAIm5gCu2OuFmBMRu8mfsxi-A7re5aykLjY3MaisyoAl7M219mChIDN4Uhjnj3IePwCfU756kpqhe4BUg3rW7FGKsrKu4wKTi3yguz58Ie8gC71tfH_rhrOVAbr9vUpIpcnRyTf4UweHOzjXin8ONy6PRKZH_67TWZMgLKcOMHtVNcdxr3yZBMHi7pkDuwf7Tq8i7gQJ0aL2ic6pqRpNFNmpnUyCTyjouBFRa6P9HJ0Y-8NwrZseYlnz5UgigNNazf8_NP2v9TWJIldejpjgwmnQ0ePdBeerdHq5JeJJTpMBVUzW0K3pA4RCCIC6LWomwwMhuRa7WhJNMcR6xgw_o2WeyMRoXicXs2IO8ymAMTi1YZ3dg0OhKyMVvGVzr9-wVtAEzZExxx0zNSfDMD2yleDOcSlyF9t_Jc_dozbH7EtbvlxGhqRIWCzpQMvAflDTKGhoaTJhb4RThvI1vfQydaqsqtGa9d6s'
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(response => {

        })
    }
  }
}
</script>
