from django.db.models import (
    BooleanField,
    Case,
    Count,
    DecimalField,
    ExpressionWrapper,
    F,
    FloatField,
    Func,
    OuterRef,
    Q,
    Subquery,
    Sum,
    When,
)
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import viewsets, filters
from rest_framework import status

from .models import CofPull, Cof, CofComment


class CofPullViewSet(viewsets.ModelViewSet):
    def list(self, request):
        Response("List", status=status.HTTP_200_OK)

    def create(self, request):
        Response("Create", status=status.HTTP_200_OK)

    def get_queryset(self):
        return CofPull.objects.all()


class CoffeeViewSet(viewsets.ModelViewSet):
    def list(self, request):
        Response("List", status=status.HTTP_200_OK)

    def create(self, request):
        Response("Create", status=status.HTTP_200_OK)

    def get_queryset(self):
        return CofPull.objects.all()
