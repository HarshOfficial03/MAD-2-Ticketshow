from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from .blocktokken import BLOCKLIST
from os import path
from .cache import cache
# from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS
db = SQLAlchemy()
DB_Name = "Database.db"

def create_app():
    app = Flask(__name__)
    # api=Api(app)
    CORS(app)
    app.config['SECRET_KEY'] = 'My secret key'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_Name}'
    app.config['JWT_SECRET_KEY']='76904890765323530498024367610823568439231453539342'
    jwt=JWTManager(app)
    
    @jwt.token_in_blocklist_loader
    def check_if_BLOCKLIST(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLOCKLIST
        
    @jwt.revoked_token_loader
    def revoked_access_callback(jwt_header, jwt_payload):
        return ({
            "description": "Token has been Revoked",
            "error":"token_revoked"
        },
        401)
        
    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        # print(jwt_data)
        identity = jwt_data["sub"]  # Extract the user_id from the JWT payload
        user = User.query.filter_by(id=identity).first()  # Query the user based on user_id
        return user    
        
    db.init_app(app)
    cache.init_app(app)

    
    app.app_context().push()
  
    from .views import views
    from .api import api
    app.register_blueprint(api, url_prefix = '/') 
    app.register_blueprint(views, url_prefix = '/') 
      

    from .models import User
    create_database(app)

    return app

def create_database(app):
    if not path.exists('instance/' + DB_Name):
        db.create_all(app=app)
        print("Database Created!")
        
