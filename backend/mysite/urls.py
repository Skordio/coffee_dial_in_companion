"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views
from mysite import getRouter
from .viewsets import CofPullViewSet, CoffeeViewSet, CofCommentViewSet
from users.viewsets import UserViewSet

router = getRouter()

router.register(r"cofpull", CofPullViewSet, basename="cofpull")
router.register(r"cofcomment", CofCommentViewSet, basename="cofcomment")
router.register(r"coffee", CoffeeViewSet, basename="coffee")
router.register(r"user", UserViewSet, basename="user")

urlpatterns = [
    path("/", include(router.urls)),
    path("social-auth/", include("social_django.urls", namespace="social")),
    path("admin/", admin.site.urls),
]
