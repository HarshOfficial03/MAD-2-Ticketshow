// const Article = Vue.component("my-article",{
//     props: ["article"],
//     template:`
//         <div>
//             <h2>{{article.title}}</h2>
//             <p>{{article.content}}</p>
//         </div>
    
//     `
// })
import Usernav from "./usernav.js";  

const Home = Vue.component("home",{
    data:function(){
        return{
            vari:"true",
            cat: [],
            pro:"",
            filteredCategories: [], // Array to store filtered categories
            filteredProducts: {},   // Object to store filtered products for each category
            searchQuery: '',
            searchcat: '',         // To store the user's search query
            searchPrice: null,       // To store the user's search price
            // searchExpiry: '',  
        }
    },
    components:{
      "user-nav":Usernav,

    },
    // props: ["pid","cid"],
    template:`
    <div>
    <div>
    <user-nav @search="handleSearch"></user-nav>
    <h1>Welcome To TicketShow WebApp</h1>
    <div class="container">
      <div class="rowDiv">
        <div v-for="cat1 in filteredCategories" :key="cat1.id" class="venueDiv">
          <div class="venueBox">
            <h3>{{ cat1.name }}</h3>
            <div v-if="filteredProducts[cat1.id].length > 0">
              <div class="hk">
                <div v-for="pro1 in filteredProducts[cat1.id]" :key="pro1.id" class="venueInnerbox">
                  <h5>{{ pro1.name }}</h5>
                  <p>Ticket available: {{ pro1.quantity }}</p>
                  <p>Rating: {{ pro1.rating }}</p>
                  <p>Tags: {{ pro1.tags }}</p>
                  <p>Price: {{ pro1.price }}</p>
                  <p>Start Time: {{ pro1.stimings }}</p>
                  <p>End Time: {{ pro1.etimings }}</p>
                  <div v-if="pro1.quantity > 0" class="venueFooter">
                    <router-link :to="'/bookshow/' + pro1.id + '/' + cat1.id">
                      <button type="button" class="btn btn-danger">Buy</button>
                      </router-link>
                      
                  </div>
                  <div v-else>
                  <button type="button" class="btn btn-secondary">Out Of Stock</button>
                
                  </div>
                </div>
              </div>
            </div>
            <p v-else>No products found</p>
            <button type="button" @click="exportjob(cat1.id)" class="btn btn-secondary">Export</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    `,
    methods:{
        
        handleSearch(searchParams) {
          this.searchQuery = searchParams.query;
          this.searchcat = searchParams.querycat;
          this.searchPrice = searchParams.price;
          // this.searchExpiry = searchParams.expiry;
        },
        exportjob(idd){
          const mail=localStorage.getItem('email')
          fetch(`http://localhost:3000/exportcsv/${idd}/${mail}`)
          .then((response)=>
        {
            if(response.ok){
            return response.json()
        }else{
            throw new Error("Request Failed")
        }
        })
        .then((data)=>{
            alert("Csv is sent on email")
            console.log("CSV Sent")
           
        })
        .catch((error)=>console.error(error))
        }
    },
    computed: {

      filterData() {
        const filteredCategories = this.cat.filter(category =>
          category.name.toLowerCase().includes(this.searchcat.toLowerCase())
        );
  
        const filteredProducts = {};
        for (const cat1 of filteredCategories) {
          filteredProducts[cat1.id] = this.pro.filter(product =>
            (this.searchQuery === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
            ( this.searchPrice === null || product.price === this.searchPrice) &&
            product.venue_id === cat1.id
          );
        }
  
        return {
          filteredCategories,
          filteredProducts,
        };
      },
      
    },
    watch: {
      filterData(newValue) {
        this.filteredCategories = newValue.filteredCategories;
        this.filteredProducts = newValue.filteredProducts;
      },
    },
    mounted:async function(){
        await fetch("http://localhost:3000/userpageapi",{
            method:"GET",
            headers:{
                // http://localhost:3000/api/articles
                // "Authentication-Token": localStorage.getItem('token'),
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
});

export default Home;