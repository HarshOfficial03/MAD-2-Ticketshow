
// import AddArticle from "./add_article.js";
// import AllArticles from "./all_articles.js";

const Adminnav= Vue.component("authnav",{
    
    template:
    `
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
        <div class="navbar-nav">
            
            
            <router-link to="/adminprof" class="nav-item nav-link">Home</router-link>
            <button @click="logout" class="nav-item nav-link">Logout</button>
            
        </div>
    </div>
  </nav>
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
    }
});

export default Adminnav;