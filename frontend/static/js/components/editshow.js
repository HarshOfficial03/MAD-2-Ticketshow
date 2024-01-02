
import Adminnav from "./adminnav.js";

const EditPro= Vue.component("editproduct",{
    
  components:{
    "admin-nav":Adminnav,
},
    props:["id"],
    template:
    `
    <div>
    <admin-nav></admin-nav>
    <br>
    <h1 class="centerElement">Edit Show</h1>
        <div class="centerElement">
        <form @submit.prevent="editpro">
        <div class="centerElement">
        <table>
          <tr>
            <td>
            <label for="text">Name:</label>
            </td>
            <td>
            <input type="text" id="category" v-model="name" required>
          </td>
          
          </tr>

          <tr>
              <td>
                <label for="exampleInputPassword1" class="form-label"
                  >Start Timings:</label
                >
              </td>
              <td>
                <input type="time" id="exampleInputPassword1" v-model="stimings" />
              </td>
        
            </tr>

            <tr>
            <td>
              <label for="exampleInputPassword1" class="form-label"
                >End Timings:</label
              >
            </td>
            <td>
              <input type="time" id="exampleInputPassword1" v-model="etimings" />
            </td>
      
          </tr>

          <tr>
          <td>
            <label for="exampleInputPassword1" class="form-label"
              >Rating:</label
            >
          </td>
          <td>
            <input type="number" id="exampleInputPassword1" v-model="rating" />
          </td>
        </tr>

          <tr>
          <td>
            <label for="exampleInputPassword1" class="form-label"
              >Tags:</label
            >
          </td>
          <td>
            <input type="text" id="exampleInputPassword1" v-model="tags" />
          </td>
        </tr>
            <tr>
              <td>
                <label for="exampleInputPassword1" class="form-label"
                  >Price:</label
                >
              </td>
              <td>
                <input type="number" id="exampleInputPassword1" v-model="price" />
              </td>
            </tr>
        
            </table>
            </div>
            <div class="footerBtn">
            <button type = "submit" class ="btn btn-primary">Edit Show</button>
          </div>
          
        </form>
        </div>
        
</div>

    </div>
    `,
    data: function(){
        return{
          name:"",
          stimings:"",
          etimings:"",
          price:"",
          tags:"",
          rating:null

        }
    },
    methods:{
        logout:function(){
            localStorage.clear();
            this.$router.push("/")
        },
        editpro(){
            fetch("http://localhost:3000/productapi",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body:JSON.stringify({
                    name:this.name,
                    price:this.price,
                    etimings:this.etimings,
                    stimings:this.stimings,
                    tags:this.tags,
                    rating:this.rating,
                    id:this.id
                })
            })
            .then((response)=>{
                if(response.ok){
                    console.log(response);
                    console.log(response.json());
                    alert("Show Edited successfully")
                    this.$router.push("/adminprof");
                }else{
                    throw new Error("Request Failed");
                }
            })
            .catch((error)=>console.error(error))
        }
    },
    
    
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

export default EditPro;