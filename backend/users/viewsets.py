# ./backend/users/viewsets.py
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import RegistrationSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class UserViewSet(viewsets.ViewSet):
    def register(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)  # Generate a refresh token for the user
            return Response(
                {
                    "message": "User registered successfully.",
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_permissions(self):
        if self.action in ["register", "login"]:
            return [permissions.AllowAny()]
        return super().get_permissions()
