from . import db
from flask_login import UserMixin
# from sqlalchemy.sql import func



class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    name = db.Column(db.String(150))
    admin = db.Column(db.String(100))

    def __repr__(self):
        return f"Signup(name={self.name},email={self.email},password={self.password},admin={self.admin})"


class Venue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    place = db.Column(db.String(100))
    capacity = db.Column(db.Integer)
    venues = db.relationship("Show", backref="venue")


class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    stimings = db.Column(db.String(100))
    etimings = db.Column(db.String(100))
    tags = db.Column(db.String(100))
    rating=db.Column(db.Integer)
    price = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    venue_id = db.Column(db.Integer, db.ForeignKey("venue.id"))
    shows = db.relationship("Userbook", backref="show")


class Userbook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sname = db.Column(db.String(100))
    vname = db.Column(db.String(100))
    notickets = db.Column(db.Integer)
    total = db.Column(db.Integer)
    email = db.Column(db.String(150))
    show_id = db.Column(db.Integer, db.ForeignKey("show.id"))


class Confirmbooking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pname = db.Column(db.String(100))
    cname = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    total = db.Column(db.Integer)
    overalltotal = db.Column(db.Integer)
    email = db.Column(db.String(150))
