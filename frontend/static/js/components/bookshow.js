
// import AddArticle from "./add_article.js";
import Usernav from "./usernav.js";

const Book= Vue.component("bookproduct",{
    
    components:{
    //     "all-articles":AllArticles,
        "user-nav":Usernav
    },
    props:["pid","cid"],
    template:
    `
    <div>
    <user-nav></user-nav>
    <div class="centerElement">
    <div v-for="bookpro1 in bookpro" :key="bookpro1.id">
    <div v-for="bookcat1 in bookcat" :key="bookcat1.id">
    
      <h3>Show: {{ bookpro1.name }} , Venue: {{ bookcat1.name }}</h3>
      <h5>Location: {{ bookcat1.place }}</h5>
    
    <div class="centerElement">
      <form @submit.prevent="bookproduct">
        <div class="mb-3">
          <table>
            <tr>
              <h4>Tickets Available: {{ bookpro1.quantity }}</h4>
            </tr>
            <tr>
              <h4>Start timings: {{ bookpro1.stimings }}</h4>
              
              <h4>End timings: {{ bookpro1.etimings }}</h4>
            
              <h4>Tags: {{ bookpro1.tags }}</h4>
              <h4>Rating: {{ bookpro1.rating }}</h4>
            </tr>
            
            <tr>
              <td>
                <label for="exampleInputPassword1" class="form-label"
                  >Quantity:</label
                >
              </td>
              <td>
                <input
                  type="number"
                  id="exampleInputPassword1"
                  v-model="quantity"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="exampleInputPassword1" class="form-label"
                  >Price:</label
                >
              </td>
              <td>
                <input
                  type="text"
                  id="exampleInputPassword1"
                  name="timing"
                  :value="bookpro1.price"
                  readonly
                />
              </td>
            </tr>

            <tr>
              <td>
                <label for="exampleInputPassword1" class="form-label"
                  >Total:</label
                >
              </td>
              <td>
                <input
                  type="input"
                  id="exampleInputPassword1"
                  name="total"
                  :value="quantity * bookpro1.price "
                  readonly
                />
              </td>
            </tr>
          </table>

          <div class="footerBtn">
            <button type="submit" class="btn btn-primary">Add to Cart</button>
          </div>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>
          
          </form>
          </div>
    </div>
    </div>
    
    </div>

  </div>
    `,
    data: function(){
        return{
            bookpro:"",
            bookcat:"",
            quantity:"",
            errorMessage:""
        }
    },
    methods:{
        logout:function(){
            localStorage.clear();
            this.$router.push("/")
        },
        bookproduct(){
            fetch("http://localhost:3000/bookproductapi",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body:JSON.stringify({
                    
                    cid:this.cid,
                    pid:this.pid,
                    quantity:this.quantity,
                    current_email:localStorage.getItem('email')
                })
            })
            .then((response)=>{
                if(response.ok){
                    console.log(response);
                    console.log(response.json());
                    alert("Show added to cart successfully")
                    this.$router.push("/home");
                }else{
                    return response.json().then(errorData => {
                        throw new Error(errorData.message)})
                }
            })
            .catch((error) => {
                this.errorMessage = error.message;
                console.error(error);
              });
        }
    },
    mounted:async function(){
        await fetch("http://localhost:3000/bookproductapi",{
            method:"PUT",
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                },
                
                body:JSON.stringify({
                    cid:this.cid,
                    pid:this.pid
                })
            
        })
        .then((response)=>
        {
            if(response.ok){
            return response.json()
        }else{
            throw new Error("Request Failed")
        }
        })
        .then((data)=>{
            console.log(data);
            this.bookcat=data.venue;
            this.bookpro=data.show;
            console.log(this.bookcat)
            console.log("araha hai")
            console.log(this.bookpro)
            // for(i in this.bookpro){
            //     this.quantityshow=i.quantity
            // }
        })
        .catch((error)=>console.error(error))
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

export default Book;