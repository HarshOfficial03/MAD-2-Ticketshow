
// import AddArticle from "./add_article.js";
// import AllArticles from "./all_articles.js";

const Authnav= Vue.component("authnav",{
    
    template:
    `
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar">
        <div class="navbar-nav">
            
            
            <router-link to="/" class="nav-item nav-link">Login</router-link>
            <router-link to="/signup" class="nav-item nav-link">SignUp</router-link>
            
        </div>
    </div>
  </nav>
</div>
    `,
});

export default Authnav;