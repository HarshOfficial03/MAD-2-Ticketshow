
// import AddArticle from "./add_article.js";
import Usernav from "./usernav.js";

const Cart= Vue.component("cart",{
    
    components:{
    //     "all-articles":AllArticles,
        "user-nav":Usernav
    },
    // props:["pid","cid"],
    template:
    `
    <div>
    <user-nav></user-nav>
    <div>
    <div class="centerElement">
        <h4>CART</h4>
    </div>
    
<div v-for="i in bookings" :key="i.id" class="centerElement">
                <div class="mb-3">
                    <table>
                    
                        <tr>
                            <td><label for="exampleInputPassword1" class="form-label">Show name:</label></td>
                            <td><input type="text" id="exampleInputPassword1" name="ticketsno" :value="i.sname" readonly></td>
                        </tr>
                        <tr>
                            <td><label for="exampleInputPassword1" class="form-label">Quantity:</label></td>
                            <td><input type="text" id="exampleInputPassword1" name="quantity" :value="i.notickets" readonly></td>
                        </tr>
    
                        <tr>
                            <td><label for="exampleInputPassword1" class="form-label">Total:</label></td>
                            <td><input type="input" id="exampleInputPassword1" name="total" :value="i.total" readonly></td>
                        </tr>
                    </table>
                 
                  
                </div>
              
                  
                  
                </div>
                
                
            

                  
        </div>
       
        <div class="centerElement">
      
        
        <tr>
            <td><label for="exampleInputPassword1" class="form-label">Total Amount:</label></td>
            <td><input type="input" id="exampleInputPassword1" name="total" :value="counter" readonly></td>
        </tr>
        
        </div>
        
        <div class="footerBtn"><button @click="confirmbooking" class="btn btn-primary">Confirm your cart</button></div>
        
        <br>
    

    </div>
  </div>
    `,
    data: function(){
        return{
            bookings:"",
            counter:"0"
        }
    },
    methods:{
        
        confirmbooking(){
            fetch("http://localhost:3000/cartapi",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body:JSON.stringify({
                    current_email:localStorage.getItem('email')
                })
            })
            .then((response)=>{
                if(response.ok){
                    console.log(response);
                    console.log(response.json());
                    alert("Show Booked successfully")
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
        await fetch("http://localhost:3000/cartapi",{
            method:"POST",
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                },
                
                body:JSON.stringify({
                  current_email:localStorage.getItem('email')
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
            this.bookings=data.bookings;
            this.counter=data.counter;
            // this.bookpro=data.product;
            // console.log(this.bookcat)
            // console.log("araha hai")
            console.log(this.bookings)
            // for(i in this.bookpro){
            //     this.quantityshow=i.quantity
            // }
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

export default Cart;