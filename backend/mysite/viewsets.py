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

from .models import CofPull


class CofPullViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return CofPull.objects.all()
