
// import AddArticle from "./add_article.js";
// import AllArticles from "./all_articles.js";
import Adminnav from "./adminnav.js";
const AddCat= Vue.component("addcat",{
    
    components:{
        "admin-nav":Adminnav,
    },
    template:
    `
    <div>
    <admin-nav></admin-nav>
    <br>
    <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10 h-100">
        <h1 align="center">Add Venue</h1>
        
        
        <form @submit.prevent="addcat">

        <div class = "mb-3">
        <label for = "text">Name</label>
        <input type = "text" class = "form-control" id = "name" v-model="name" placeholder="Enter Venue name" required />
        
        <label for = "text">Place</label>
        <input type = "text" class = "form-control" id = "place" v-model="place" placeholder="Enter Venue place" required />
        
        <label for = "text">Capacity</label>
        <input type = "number" class = "form-control" id = "capacity" v-model="capacity" placeholder="Enter Venue capacity" required />
    </div>
          </br>
          <button type = "submit" class ="btn btn-primary">Add Venue</button>
        </form>
    </div>
    </div>
    </div>    
    </div>
    `,
    data: function(){
        return{
            name:"",
            place:"",
            capacity:null
        }
    },
    methods:{
        logout:function(){
            localStorage.clear();
            this.$router.push("/")
        },
        addcat(){
            fetch("http://localhost:3000/categoryapi",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body:JSON.stringify({
                    name:this.name,
                    place:this.place,
                    capacity:this.capacity
                })
            })
            .then((response)=>{
                if(response.ok){
                    console.log(response);
                    console.log(response.json());
                    alert("Venue added successfully")
                    this.$router.push("/adminprof");
                }else{
                    throw new Error("Request Failed");
                }
            })
            .catch((error)=>console.error(error))
        }
    },
    beforeRouteEnter(to, from, next) {
        if (!localStorage.getItem("token")) {
          next("/");
        } else {
          next();
        }
      }
    
    
});









// const AdminProfile= Vue.component("profile",{
    
//     components:{
//         "all-articles":AllArticles,
//         "add-article":AddArticle
//     },
//     template:`
//     <div>
//         <h1>You are in the Admin Profile Page</h1>
//         <button @click="logout">Logout</button>
//         <router-link to="/adminprof">All Articles</router-link>
//         <router-link to="/adminprof/addarticle">Add Article</router-link>
//         <router-view></router-view>
//     </div>
//     `,
//     methods:{
//         logout:function(){
//             localStorage.clear();
//             this.$router.push("/")
//         }
//     },
    
    
// });

export default AddCat;