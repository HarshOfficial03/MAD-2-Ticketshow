import Authnav from "./authnav.js";
const Signup = Vue.component("signup", {
    components:{
      "auth-nav" :Authnav
    },
    template: `
    <div>
      <auth-nav></auth-nav>
      <div class="container">
  <div class="row justify-content-center">
    <div class="col-md-14 h-100">
      <form @submit.prevent="signup">
      <h3 align = "center">User Signup</h3>
      <div class = "form-group">
      <label for="username">Username:</label>
      <input type = "text" class = "form-control"  id="name" v-model="name" placeholder="Enter name" required>
      </div>
      <div class = "form-group">
          <label for = "email">Email</label>
          <input type = "email" class = "form-control" id = "email" v-model="email" placeholder="Enter email" required>
      </div>
      
      <div class = "form-group">
          <label for = "password">Password</label>
          <input type = "password" class = "form-control" id = "password" v-model="password" placeholder="Enter password" required>
      </div>
      <br />
      <button type = "submit" class ="btn btn-primary">Signup</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
  </div>
  </div>
  </div>    
  </div>
    `,
    data() {
      return {
        email: "",
        password: "",
        name:"",
        errorMessage : ""
      };
    },
    methods: {
      signup() {
        fetch("http://localhost:3000/signupapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:this.name,
            email: this.email,
            password: this.password,
          }),
        })
        .then((response) => {
          if(response.ok){
          return response.json()
      }else{
        return response.json().then(errorData => {
          throw new Error(errorData.message)})
          
      }
      })
          .then((data) => {
            // print(data)
            console.log(data.name);
            alert("Account created successfully");
            this.$router.push("/");
          })
      .catch((error) => {
        this.errorMessage = error.message;
        console.error(error);
      });
      },
    },
  });
  
  export default Signup;