from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from .views import (
    Signup,
    Login,
    Adminpage,
    Logout,
    Venueapi,
    Showapi,
    Userpage,
    Bookshow,
    Cart,
    Booked,
    # ConfirmCart,
)


api = Blueprint("api", __name__)
api1 = Api(api)

# Authentication page Api
api1.add_resource(Signup, "/signupapi")
api1.add_resource(Login, "/loginapi")
api1.add_resource(Logout, "/logoutapi")

# Admin page api
api1.add_resource(Adminpage, "/adminpageapi")

# Venue and Show api
api1.add_resource(Venueapi, "/categoryapi")
api1.add_resource(Showapi, "/productapi")
 
# User page api
api1.add_resource(Userpage, "/userpageapi")

# book show api
api1.add_resource(Bookshow, "/bookproductapi")

# cart api
api1.add_resource(Cart, "/cartapi")

# booked done api
api1.add_resource(Booked, "/finalbookapi")
