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
from rest_framework.permissions import IsAuthenticated

from .models import CofPull, Cof, CofComment
from .serializers import CofPullSerializer, CofSerializer, CofCommentSerializer


class CofPullViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CofPullSerializer
    queryset = CofPull.objects.all()


class CoffeeViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CofSerializer
    queryset = Cof.objects.all()


class CofCommentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CofCommentSerializer
    queryset = CofComment.objects.all()
