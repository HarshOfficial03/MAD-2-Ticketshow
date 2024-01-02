
// import AddArticle from "./add_article.js";
// import AllArticles from "./all_articles.js";

const Usernav= Vue.component("usernav",{
    data:function(){
        return{
            selectedField: 'name',
            searchQuery:"",
            searchcat:"",
            searchPrice: null, // To store the user's search price
            // searchExpiry: '',
        }
    },
    
    template:
    `
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
        <div class="navbar-nav">
            
            
            <router-link to="/home" class="nav-item nav-link">Home</router-link>
            <router-link to="/bookings" class="nav-item nav-link">Bookings</router-link>
            <router-link to="/cart" class="nav-item nav-link">Cart</router-link>
            <button @click="logout" class="nav-item nav-link">Logout</button>
            <div class="search-fields">
            <select v-model="selectedField">
                <option value="cname">Venue Name</option>
                <option value="name">Show Name</option>
                <option value="price">Price</option>
                
            </select>
            <input v-if="selectedField === 'cname'" v-model="searchcat" @input="filterProducts" type="text" placeholder="Search by name">
            <input v-else-if="selectedField === 'name'" v-model="searchQuery" @input="filterProducts" type="text" placeholder="Search by name">
            <input v-else-if="selectedField === 'price'" v-model.number="searchPrice" @input="filterProducts" type="number" placeholder="Search by price">
            <button class="clear-button" @click="clearSearch">Clear</button> 
            </div>
            
        </div>
    </div>
  </nav>
  <br>
</div>
    `,
    methods:{
        logout:function(){
            
            fetch("http://localhost:3000/logoutapi",{
              method:'POSt',
              headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            }).then(r=>r.json())
            .then((d)=>{
              localStorage.clear()
              this.$router.push("/")
            })
            .catch(e=>console.log("error"))
            
        },
     
        filterProducts() {
            this.$emit('search', {
                querycat: this.searchcat,
                query: this.searchQuery,
                price: this.searchPrice,
                // expiry: this.searchExpiry,
              }); // Emit the search query to the parent component
        },
        clearSearch(){
            this.selectedField='name',
            this.searchQuery="",
            this.searchcat="",
            this.searchPrice= null, // To store the user's search price
            // this.searchExpiry= '',
            this.filterProducts();
        }
        
        
    }
});

export default Usernav;