import Login from "./components/login.js";
import Home from "./components/home.js";
import Signup from "./components/signup.js";
import AdminProfile from "./components/adminprof.js";

import AddCat from "./components/addvenue.js";
import EditCat from "./components/editvenue.js";
import AddPro from "./components/addshow.js";
import EditPro from "./components/editshow.js";
import Book from "./components/bookshow.js";
import Cart from "./components/cart.js";
import Bookings from "./components/bookings.js";
const routes = [
    {path:'/', component:Login},
    {path:"/home",component:Home},
    {path:'/signup',component:Signup},
    // {path:'/signup',component:Signup, props:{title:"static props component SMP"}},
    {path:'/addvenue',component:AddCat},
    {path:'/editvenue/:id',component:EditCat,props:true},
    {path:'/addshow/:id',component:AddPro ,props:true},
    {path:'/editshow/:id',component:EditPro ,props:true},
    {path:"/bookshow/:pid/:cid",component:Book,props:true},
    {path:"/cart",component:Cart},
    {path:"/bookings",component:Bookings},
    // {path:'/addcat/:id',component:AddCat,props:true},
    {path:"/adminprof",component:AdminProfile},
    
];

const router = new VueRouter({
    routes
});

const a = new Vue({
    el : "#app",
    router
});