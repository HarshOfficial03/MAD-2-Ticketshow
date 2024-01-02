import Authnav from "./authnav.js";
const Login = Vue.component("login", {

    components:{"auth-nav":Authnav},
    data() {
        return {
          email: "",
          password: "",
          errorMessage:"",
          role:"customer",
        };
      },
    template: `
      <div>
      <auth-nav></auth-nav>
      <div class="container">
  <div class="row justify-content-center">
    <div class="col-md-14 h-100">
      <form @submit.prevent="login">
      <h3 align = "center">Login</h3>
      <div class = "form-group">
          <label for = "email">Email</label>
          <input type = "email" class = "form-control" id = "email" v-model="email" placeholder="Enter email" required />
      </div>
      
      <div class = "form-group">
          <label for = "password">Password</label>
          <input type = "password" class = "form-control" id = "password" v-model="password" placeholder="Enter password" required>
      </div>
      <br />
      <button type = "submit" class ="btn btn-primary">Log In</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
  </div>
  </div>
  </div>
        
  </div>
      
    `,
    methods: {
      check_role(){
        if(this.email==="harsh@gmail.com"){
          this.role="admin"
        }
      },
      login(){
        this.check_role();
        // console.log(this.role)
        fetch("http://localhost:3000/loginapi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
              const token=data.access_token;
              // const Role=data.Role;
              const email=this.email
              console.log(token)
              localStorage.setItem("token", token);
              localStorage.setItem("email", email);
              if(this.role==="customer"){
              this.$router.push("/home")
              }
              else{
                this.$router.push("/adminprof")
              }
            })
          .catch((error) => {
            this.errorMessage = error.message;
            console.error(error);
          });
        
      },
    },
    
  });
  
  export default Login;