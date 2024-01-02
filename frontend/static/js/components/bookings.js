
// import AddArticle from "./add_article.js";
import Usernav from "./usernav.js"; 

const Bookings= Vue.component("bookings",{
    data:function(){
        return{
            bookings:"",
            overall:""
        }
    },
    components:{
        "user-nav":Usernav,
  
      },

    template:
    `
            <div>
            <user-nav></user-nav>
            <div>
            <div v-if="bookings && bookings.length > 0" class="bookings-list">
            <div v-for="(booking, index) in bookings" :key="index" class="booking-item">
                <h2 class="booking-title">
                <button class="booking-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + index" aria-expanded="true" :aria-controls="'collapse' + index">
                    <strong>Venue name:</strong> {{ booking.cname }}
                    <span> </span>
                    <strong>Show name:</strong> {{ booking.pname }}
                </button>
                </h2>
                <div :id="'collapse' + index" class="booking-collapse collapse show">
                <div class="booking-details">
                    <strong>Quantity: {{ booking.quantity }}</strong>
                    <strong>Total Price: {{ booking.total }}</strong>
                </div>
                </div>
            </div>
            <strong><h2 class="total">Net Amount: {{ overall }}</h2></strong>
            </div>
            <h2 v-else class="no-bookings">NO BOOKINGS</h2>
            </div>
            </div>
    `,
    mounted:async function(){
        await fetch("http://localhost:3000/finalbookapi",{
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
            this.overall=data.overall
            
            console.log(this.bookings)
            // for(i in this.bookpro){
            //     this.quantityshow=i.quantity
            // }
        })
        .catch((error)=>console.error(error))
    },
});

export default Bookings;