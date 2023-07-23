from flask import Flask, request, jsonify, Blueprint, jsonify
from api.models import db, User, Business_user
from api.utils import APIException
from flask_bcrypt import bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager


api = Blueprint('api', __name__)

jwt = JWTManager()

# Fonction d'initialisation de l'extension JWTManager avec l'application Flask
def initialize_jwt(api):
    jwt.init_app(api)

@api.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()
        serialized_users = [user.serialize() for user in users]
        return jsonify(users=serialized_users), 200

    except Exception as e:
        return jsonify({'error': 'Error retrieving users: ' + str(e)}), 500

# Décorez la route pour obtenir un utilisateur par son ID
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(message='User not found'), 404
    return jsonify(user.serialize())

@api.route('/business-users', methods=['GET'])
def get_all_business_users():
    try:
        business_users = Business_user.query.all()
        serialized_business_users = [business_user.serialize() for business_user in business_users]
        return jsonify(business_users=serialized_business_users), 200

    except Exception as e:
        return jsonify({'error': 'Error retrieving business users: ' + str(e)}), 500

# Décorez la route pour obtenir un business_user par son ID
@api.route('/business-users/<int:business_user_id>', methods=['GET'])
def get_business_user(business_user_id):
    business_user = Business_user.query.get(business_user_id)
    if not business_user:
        return jsonify(message='Business user not found'), 404
    return jsonify(business_user.serialize())


@api.route('/signup', methods=['POST'])
def create_user_or_business():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Vérifier si l'email et le mot de passe sont fournis
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        # Vérifier si l'email existe déjà pour un utilisateur ou une entreprise
        existing_user = User.query.filter_by(email=email).first()
        existing_business = Business_user.query.filter_by(email=email).first()

        if existing_user:
            return jsonify({'error': 'Email already exists for a user.'}), 409

        if existing_business:
            return jsonify({'error': 'Email already exists for a business.'}), 409

        # Si le champ 'name_business' est présent, c'est une inscription d'entreprise
        if 'name_business' in data:
            name_business = data.get('name_business')
            nif = data.get('nif')
            address = data.get('address')
            payment_method = data.get('payment_method')

            # Hacher le mot de passe et créer l'entreprise
            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_business = Business_user(business_name=name_business, email=email, password=password_hash, nif=nif, address=address, payment_method=payment_method)
            db.session.add(new_business)
            db.session.commit()

            return jsonify({'message': 'Business created successfully', 'business': new_business.serialize()}), 200

        # Sinon, c'est une inscription d'utilisateur
        else:
            firstname = data.get('firstname')
            lastname = data.get('lastname')
            username = data.get('username')
            Address = data.get('Address')
            dni = data.get('dni')
            location = data.get('location')
            payment_method = data.get('payment_method')

            # Hacher le mot de passe et créer l'utilisateur
            password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(email=email, password=password_hash, firstname=firstname, lastname=lastname, username=username, Address=Address, dni=dni, location=location, payment_method=payment_method)
            db.session.add(new_user)
            db.session.commit()

            return jsonify(message='User created successfully', user=new_user.serialize()), 201

    except Exception as e:
        return jsonify({'error': 'Error in user/business creation: ' + str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data.get("email") or not data.get("password"):
            return jsonify({'error': 'Email and password are required.'}), 400

        user_or_business = None

        # Vérifier si c'est un utilisateur
        user = User.query.filter_by(email=data['email']).first()
        if user:
            password_db = user.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                user_or_business = user


        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=data['email']).first()
        if business:
            password_db = business.password
            if bcrypt.check_password_hash(password_db, data["password"]):
                user_or_business = business

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401

        access_token = create_access_token(identity=user_or_business.id)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in login: ' + str(e)}), 500


@api.route('/private')
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user:
        return jsonify({'message': 'Welcome to the private area!', 'user': user.serialize()})
    else:
        business = Business_user.query.get(current_user_id)
        if business:
            return jsonify({'message': 'Welcome to the private area!', 'business': business.serialize()})
        else:
            return jsonify({'error': 'Unauthorized'}), 401


@api.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_profile(user_id):
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify({'error': 'User not found'}), 404

        data = request.get_json()

        # Update user profile data
        user.username = data.get('username', user.username)
        user.firstname = data.get('firstname', user.firstname)
        user.lastname = data.get('lastname', user.lastname)
        user.Address = data.get('Address', user.Address)
        user.dni = data.get('dni', user.dni)
        user.location = data.get('location', user.location)
        user.payment_method = data.get('payment_method', user.payment_method)

        db.session.commit()

        return jsonify({'message': 'User profile updated successfully', 'user': user.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating user profile: ' + str(e)}), 500


@api.route('/business/<int:business_id>', methods=['PUT'])
@jwt_required()
def update_business_profile(business_id):
    try:
        business = Business_user.query.get(business_id)

        if not business:
            return jsonify({'error': 'Business not found'}), 404

        data = request.get_json()

        # Update business profile data
        business.business_name = data.get('name_business', business.business_name)
        business.email = data.get('email', business.email)
        business.nif = data.get('nif', business.nif)
        business.address = data.get('address', business.address)
        business.payment_method = data.get('payment_method', business.payment_method)

        db.session.commit()

        return jsonify({'message': 'Business profile updated successfully', 'business': business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in updating business profile: ' + str(e)}), 500


@api.route('/token', methods=['POST'])
def get_token():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400

        user_or_business = None

        # Vérifier si c'est un utilisateur
        user = User.query.filter_by(email=email).first()
        if user:
            password_db = user.password
            if bcrypt.check_password_hash(password_db, password):
                user_or_business = user

        # Vérifier si c'est une entreprise
        business = Business_user.query.filter_by(email=email).first()
        if business:
            password_db = business.password
            if bcrypt.check_password_hash(password_db, password):
                user_or_business = business

        if not user_or_business:
            return jsonify({'error': 'User or Business not found or Incorrect password'}), 401

        access_token = create_access_token(identity=user_or_business.id)
        return jsonify({'access_token': access_token, 'user_or_business': user_or_business.serialize()}), 200

    except Exception as e:
        return jsonify({'error': 'Error in token generation: ' + str(e)}), 500
