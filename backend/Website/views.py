from functools import wraps
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask import render_template
# from flask_login import login_required
from .models import Venue, Confirmbooking, User, Show, Userbook
from flask_restful import Api, Resource, marshal_with, fields, reqparse, abort
from .cache import cache
# from .api import signup_parser_args
# from flask_login import login_user, login_required, logout_user, current_user

# from main import api,app
# from main import app
from . import db
from flask import jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_current_user
from .blocktokken import BLOCKLIST

views = Blueprint("views", __name__)
# api=Api(views)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if get_current_user().admin=="False":
            print("not authorize")
            abort(403, description = "not authorize")
        return f(*args, **kwargs)
    return decorated_function

login_parser_args = reqparse.RequestParser()
login_parser_args.add_argument("email", type=str, help="hjars", required=True)
login_parser_args.add_argument("password", help="hjarsdd", type=str, required=True)


signup_parser_args = reqparse.RequestParser()
signup_parser_args.add_argument("email", type=str, help="hjars", required=True)
signup_parser_args.add_argument("name", help="hjarsdd", type=str, required=True)
signup_parser_args.add_argument("password", help="hjarss", type=str, required=True)

output_fields = {
    "name": fields.String,
    "email": fields.String,
    "password": fields.String,
}

login_fields = {
    "access_token": fields.String,
}

home_fields = {
    "status": fields.String,
    "venue": fields.List(
        fields.Nested({"id": fields.Integer, "name": fields.String, "place":fields.String,"capacity": fields.Integer})
    ),  # Add more fields as needed
    "show": fields.List(
        fields.Nested(
            {
                "id": fields.Integer,
                "name": fields.String,
                "stimings": fields.String,
                "etimings": fields.String,
                "rating":fields.Integer,
                "tags":fields.String,
                "price": fields.Integer,
                "quantity": fields.Integer,
                "venue_id": fields.Integer,
            }
        )
    ),
}

cart_fields = {
    "status": fields.String,
    "bookings": fields.List(
        fields.Nested(
            {
                "id": fields.Integer,
                "sname": fields.String,
                "vname": fields.String,
                "notickets": fields.Integer,
                "total": fields.Integer,
                "email": fields.String,
            }
        )
    ),
    "counter": fields.Integer,
}

finalbook_fields = {
    "status": fields.String,
    "bookings": fields.List(
        fields.Nested(
            {
                "id": fields.Integer,
                "pname": fields.String,
                "cname": fields.String,
                "quantity": fields.Integer,
                "total": fields.Integer,
                "overalltotal": fields.Integer,
                "email": fields.String,
            }
        )
    ),
    "overall": fields.Integer,
}


class Login(Resource):
    def get(self):
        pass

    @marshal_with(login_fields)
    def post(self):
        print("harsh")
        args = login_parser_args.parse_args()
        email = args.get("email")
        password = args.get("password")

        user = User.query.filter_by(email=email).first()
        if user:
            if user.password == password:
                # flash("Logged In", category="success")
                # login_user(user, remember=True)
                # venue = Category.query.all()
                # show = Product.query.all()
                
                hh = create_access_token(identity=user.id)
                print(hh)
                return {"access_token": hh}

            else:
                abort(401, message="Password Incorrect")
        else:
            abort(401, message="Invalid User")


class Signup(Resource):
    def get(self):
        return {"r,j": "harsh"}

    @marshal_with(output_fields)
    def post(self):
        
        args = signup_parser_args.parse_args()
        email = args.get("email")
        name = args.get("name")
        password = args.get("password")
        user = User.query.filter_by(email=email).first()
        if user:
            abort(400, message="Email Already Exists")
           
        elif len(email) < 4:
            
            abort(400, message="email lenght is short")
        elif len(password) < 5:
            
            abort(400, message="Password is too short")
        else:
            new_user = User(email=email, name=name, password=password, admin="False")
            db.session.add(new_user)
            db.session.commit()
            
            return new_user
        # raise NotFoundError(status_code=404)


class Logout(Resource):
    @jwt_required()
    def post(self):
        BLOCKLIST.add(get_jwt()["jti"])
        return {"message": "logged out successfully"}


class Adminpage(Resource):
    @jwt_required()
    @admin_required
    @marshal_with(home_fields)
    # @cache.cached(timeout=10)
    def get(self):
        # print(get_current_user().admin)
        cat = Venue.query.all()
        pro = Show.query.all()
        return {"status": "done authorization", "venue": cat, "show": pro}

    @jwt_required()
    def post(self):
        pass


class Venueapi(Resource):
    @jwt_required()
    @admin_required
    def post(self):
        adding = request.json
        name = adding["name"]
        capacity = adding["capacity"]
        place = adding["place"]
        new_cat = Venue(name=name,capacity=capacity,place=place)
        db.session.add(new_cat)
        db.session.commit()
        return {"status": " Venue added"}

    @jwt_required()
    @admin_required
    def put(self):
        adding = request.json
        name = adding["name"]
        place = adding["place"]
        capacity = adding["capacity"]
        idd = adding["id"]
        edit_cat = Venue.query.filter_by(id=idd).first()
        edit_cat.name = name
        edit_cat.place = place
        edit_cat.capacity = capacity

        db.session.commit()
        return {"status": " Venue edited"}

    @jwt_required()
    @admin_required
    def delete(self):
        delete = request.json
        # name = adding["name"]
        idd = delete["id"]
        dell = Venue.query.filter_by(id=idd).first()
        desh = Show.query.filter_by(venue_id=idd).all()
        # print(desh)
        for items in desh:
            db.session.delete(items)
        db.session.delete(dell)
        db.session.commit()
        return {"status": "Venue Delete"}


class Showapi(Resource):
    @jwt_required()
    @admin_required
    def post(self):
        adding = request.json
        name = adding["name"]
        stimings = adding["stimings"]
        etimings = adding["etimings"]
        rating=adding["rating"]
        tags = adding["tags"]
        price = adding["price"]
        cid = adding["id"]
        c=Venue.query.filter_by(id=cid).first()
        # expiry1 = adding["radio"]
        # if expiry == "":
        #     expiry = expiry1
        new_product = Show(
            name=name,
            stimings=stimings,
            etimings=etimings,
            rating=rating,
            quantity=c.capacity,
            price=price,
            tags=tags,
            venue_id=cid,
        )

        db.session.add(new_product)
        db.session.commit()
        return {"status": " Show added"}

    @jwt_required()
    @admin_required
    def put(self):
        adding = request.json
        name = adding["name"]
        stimings = adding["stimings"]
        etimings = adding["etimings"]
        rating = adding["rating"]
        tags = adding["tags"]
        price = adding["price"]
        pid = adding["id"]
        # expiry1 = adding["radio"]

        editt = Show.query.filter_by(id=pid).first()
        editt.name = name
        editt.rating = rating
        editt.stimings = stimings
        editt.etimings = etimings
        # editt.quantity = quantity
        editt.price = price
        editt.tags=tags

        db.session.commit()
        return {"status": " Show edited"}

    @jwt_required()
    @admin_required
    def delete(self):
        dp = request.json
        idd = dp["id"]
        dell = Show.query.filter_by(id=idd).first()
        #     print(dell)
        db.session.delete(dell)
        db.session.commit()
        return {"status": " Show Delete"}


class Userpage(Resource):
    @jwt_required()
    # @cache.cached(timeout=10)
    @marshal_with(home_fields)
    def get(self):
        cat = Venue.query.all()
        pro = Show.query.all()
        return {"status": "done authorization", "venue": cat, "show": pro}

    @jwt_required()
    def post(self):
        pass


class Bookshow(Resource):
    @jwt_required()
    @marshal_with(home_fields)
    def post(self):
        b = request.json
        cid = b["cid"]
        pid = b["pid"]
        current_email = b["current_email"]
        cat = Venue.query.filter_by(id=cid).first()
        pro = Show.query.filter_by(id=pid).first()
        cap = int(pro.quantity)
        a = int(b["quantity"])
        price = int(pro.price)
        if a == 0:
            abort(400, message="Can't Null")
        elif a <= cap:
            total = a * price
            showbooked = Userbook(
                sname=pro.name,
                vname=cat.name,
                notickets=a,
                total=total,
                email=current_email,
                show_id=pid,
            )
            db.session.add(showbooked)
            db.session.commit()
            return {"status": "Added to cart"}
        else:
            abort(400, message="Quantity exceed")

    @jwt_required()
    @marshal_with(home_fields)
    def put(self):
        a = request.json
        cid = a["cid"]
        pid = a["pid"]
        cat, pro = [], []
        cat = Venue.query.filter_by(id=cid).first()
        pro = Show.query.filter_by(id=pid).first()

        return {"status": "done authorization", "venue": cat, "show": pro}

    @jwt_required()
    def get(self):
        pass


class Cart(Resource):
    @jwt_required()
    @marshal_with(cart_fields)
    def post(self):
        b = request.json
        current_email = b["current_email"]
        counter = 0
        a = 0

        bookings = Userbook.query.filter_by(email=current_email).all()

        # cbook = Confirmbooking.query.filter_by(email=current_email).all()
        for i in bookings:
            counter = counter + i.total
            a = a + i.total
        return {"status": "done", "bookings": bookings, "counter": counter}

    @jwt_required()
    def put(self):
        b = request.json
        current_email = b["current_email"]
        counter = 0
        a = 0

        bookings = Userbook.query.filter_by(email=current_email).all()

        cbook = Confirmbooking.query.filter_by(email=current_email).all()
        for i in bookings:
            counter = counter + i.total
            a = a + i.total

        for i in bookings:
            bookpro = Show.query.filter_by(id=i.show_id).first()
            ordervalue = i.notickets
            bookpro.quantity = bookpro.quantity - ordervalue

        print(cbook)
        for j in cbook:
            j.overalltotal = j.overalltotal + counter
            a = j.overalltotal

        for i in bookings:
            confirm = Confirmbooking(
                pname=i.sname,
                cname=i.vname,
                quantity=i.notickets,
                total=i.total,
                overalltotal=a,
                email=i.email,
            )
            db.session.add(confirm)

        Userbook.query.delete()
        db.session.commit()

        return {"status": "success"}


class Booked(Resource):
    @jwt_required()
    @marshal_with(finalbook_fields)
    @cache.cached(timeout=10)  # Cache this route for 10 minutes
    def post(self):
        b = request.json
        current_email = b["current_email"]
        a = ""
        bookings = Confirmbooking.query.filter_by(email=current_email).all()
        for i in bookings:
            a = i.overalltotal
            break
        return {"status": "done", "bookings": bookings, "overall": a}
        # return render_template("userbookings.html", bookings=bookings, overalltotal=a, user=current_user)

