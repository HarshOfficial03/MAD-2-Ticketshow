// import AddArticle from "./add_article.js";
import Adminnav from "./adminnav.js";

const AdminProfile= Vue.component("profile",{
    
    components:{
        "admin-nav":Adminnav,
    },
    
    template:
    `
    <div>
    <admin-nav></admin-nav>
    <br>
   
          <h1 align="center">Ticket Show Management</h1>
      <br>
        <div v-if="vari === 'true'" >
           <div class="container">
            <div class="rowDiv">
              <div v-for="cat1 in cat" :key="cat1.id" class="venueDiv">
                <div class="venueBox">
                  <h3>{{ cat1.name }}</h3>
                  
                  <div v-if="pro">
                  <div class="hk">
                    <div v-for="pro1 in pro" :key="pro1.id">
                      <div v-if="pro1.venue_id === cat1.id" >
                      <div class="venueInnerbox">
                        <h5>{{ pro1.name }}</h5>
                        <div>
                          <b-dropdown id="dropdown-1" text="Actions" class="m-md-2">
                            <b-dropdown-item :to="'/editshow/' + pro1.id">Edit</b-dropdown-item>
                            <b-dropdown-item @click="deletepro(pro1.id)">Delete</b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </div>

                      </div>
                    </div>
                  
                
                  </div>
                  </div>
                  
                  
                    <div class="venueCenterElement"><router-link :to="'/addshow/' + cat1.id"><img src="static/js/circle_icon.svg"></router-link></div>
                    <div class="venueFooter">
                      <router-link :to="'/editvenue/' + cat1.id"><button type="button" class="btn btn-warning">Edit</button></router-link>
                      <button @click="deletecat(cat1.id)" type="button" class="btn btn-danger">Delete</button>
                    </div>
                  

                </div>
              </div>
              
            </div>
            </div>
          
      
          
          <div class="centerElement"><router-link to="/addvenue"><img src="static/js/circle_icon.svg">
          </router-link></div>
          </div>      
 </div>

    `,
    data:function(){
        return{
        vari:"true",
        cat:"",
        pro:""
    }},
    methods:{
  
        deletecat(idd){
          console.log(idd)
          fetch("http://localhost:3000/categoryapi",{
              method:"DELETE",
              headers:{
                  "Content-Type":"application/json",
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body:JSON.stringify({
                  id:idd
              })
          })
          .then((response)=>{
              if(response.ok){
                  console.log(response);
                  console.log(response.json());
                  alert("Venue Deleted successfully")
                  location.reload();
              }else{
                  throw new Error("Request Failed");
              }
          })
          .catch((error)=>console.error(error))
      },  
      deletepro(idd){
        console.log(idd)
        fetch("http://localhost:3000/productapi",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body:JSON.stringify({
                id:idd
            })
        })
        .then((response)=>{
            if(response.ok){
                console.log(response);
                console.log(response.json());
                alert("Show Deleted successfully")
                location.reload();
            }else{
                throw new Error("Request Failed");
            }
        })
        .catch((error)=>console.error(error))
    },  

    },
    mounted:async function(){
        await fetch("http://localhost:3000/adminpageapi",{
            method:"GET",
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                },
            
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
            this.cat=data.venue;
            this.pro=data.show;
            console.log(this.cat)
            console.log("araha hai")
            console.log(this.pro)
        })
        .catch((error)=>console.error(error))
    },
    beforeRouteEnter(to, from, next) {
        if (!localStorage.getItem("token")) {
          next("/");
        } else {
          next();
        }
      }
     //     <!-- Small Boxes for Shows -->
        //     <div class="row" id="showRow">
        //         <!-- Shows will be dynamically added here -->
        //     </div>

     // <router-link to="/adminprof">All Articles</router-link>
        // <router-link to="/adminprof/addarticle">Add Article</router-link>
        // <router-view></router-view>


    // login(){
    //     this.check_role();
    //     console.log(this.role)
    //     fetch("http://localhost:3000/loginapi", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: this.email,
    //         password: this.password,
    //       }),
    //     })
    //       .then((response) => {
    //         if(response.ok){
    //         return response.json()
    //     }else{
        //     this.$router.push("/")
        //     throw new Error("Request Failed")
        // }
        // })
        //   .then((data) => {
        //       const token=data.access_token;
        //       const show1=data.show;
        //       const venue1=data.venue
        //       console.log(data) 
        //       console.log(token)
        //       console.log(show1)
        //       console.log(venue1)
        //       this.venue1=venue1
        //       // for(k in venue1){
        //       //   console.log(k) 
        //       // }
        //       localStorage.setItem("token", token);
              
        //       if(this.role==="customer"){
        //       this.$router.push("/home")
        //       }
        //       else{
        //         this.$router.push("/adminprof")
        //       }
        //     })
        //   .catch((error) => {
        //     this.errorMessage = "Invalid Credentials";
        //     console.error(error);
        //   });
        
      
        // }
    
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

export default AdminProfile;