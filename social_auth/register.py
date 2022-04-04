
from django.contrib import auth
from django.contrib.auth import authenticate
from authentication.models import User
import os
import random
from rest_framework.exceptions import AuthenticationFailed


def generate_username(name):

    username = "".join(name.split(' ')).lower()
    if not User.objects.filter(username=username).exists():
        return username
    else:
        random_username = username + str(random.randint(0, 1000))
        return generate_username(random_username)


def register_social_user(provider, user_id, email, name):
    filtered_user_by_email = User.objects.filter(email=email)
    print(email)
    if filtered_user_by_email.exists():

        if provider == filtered_user_by_email[0].auth_provider:
            print(email)
            # registered_user = authenticate(
            #     email=email, password='9UyG3Oigrh_ovqZs8P1_CHoo')
            try:
                registered_user = auth.authenticate(email=email, password='9UyG3Oigrh_ovqZs8P1_CHoo')
            except : 
                raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)
            return {
                'username': registered_user.username,
                'email': registered_user.email,
                'tokens': registered_user.tokens()}

        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:
        print("creating new user")
        user = {
            'username': generate_username(name), 'email': email,
            'password': '9UyG3Oigrh_ovqZs8P1_CHoo'}
        user = User.objects.create_user(**user)
        user.is_verified = True
        user.auth_provider = provider
        user.save()

        new_user = authenticate(
            email=email, password='9UyG3Oigrh_ovqZs8P1_CHoo')
        return {
            'email': new_user.email,
            'username': new_user.username,
            'tokens': new_user.tokens()
        }
