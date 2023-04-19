# ./backend/users/serializers.py
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import User


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password"]
        extra_kwargs = {
            "username": {"required": True},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create(
            email=validated_data["email"],
            username=validated_data["username"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs["email"], password=attrs["password"])
        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        return {"user": user}
