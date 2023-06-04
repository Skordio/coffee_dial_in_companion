from rest_framework import serializers
from .models import Cof, CofPull, CofComment


class CofSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cof
        fields = "__all__"


class CofPullSerializer(serializers.ModelSerializer):
    class Meta:
        model = CofPull
        fields = "__all__"


class CofCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CofComment
        fields = "__all__"
