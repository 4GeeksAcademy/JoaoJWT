from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, ma
from api.models import User, Supermarket, Product, Cart
from api.utils import generate_sitemap, APIException

from api.models import UserSchema, ProductSchema, MarketSchema
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

api = Blueprint('api', __name__)

#login route
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = db.session.query(User).filter(User.email==email, User.password==password).first()
    if user is None:
        return jsonify({"Message": "Email or password wrong"}), 401

    return 'passed'

@api.route('/user/<int:id>', methods=['GET'])
def get_users(id):
    users = User.query.get(id)
    users_schema = UserSchema()
    output = users_schema.dump(users)
    return jsonify(
        {"Result": output}
    )

@api.route('/market', methods=['GET'])
def get_a_markets():
    markets = Supermarket.query.all()
    markets_schema = MarketSchema(many=True)
    output = markets_schema.dump(markets)
    return jsonify(
        {"Results": output}
    )

@api.route('/market/<int:id>', methods=['GET'])
def get_a_market(id):
    market = Supermarket.query.get(id)
    output = MarketSchema().dump(market)
    return jsonify(
        {"Result": output}
    )

@api.route('/product', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_schema = ProductSchema(many=True)
    output = products_schema.dump(products)
    return jsonify(
        {"Result": output}
    )

@api.route('/product/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get(id)
    output = ProductSchema().dump(product)
    return(
        {"Result": output}
    )

@api.route('/cart', methods=['POST', 'GET'])
def cart_add():
    if request.method == 'POST':
        username = request.json.get('username')
        product = request.json.get('product')

        register = Cart(username, product)
        db.session.add(register)
        db.session.commit()
        return jsonify({
            "Message": "new register added susessfully"
        })
    #Handling the GET request
    #output2 = db.session.query(Cart, User, Product).select_from(Cart).join(User).join(Product).all()  
    output = db.session.query(Cart, User, Product).join(User, User.id == Cart.user_id).join(Product, Product.id == Cart.product_id).all()

    cart_all = Cart.query.all()
    result = list(map(lambda x: x.testcart(),cart_all))

    return jsonify(result)