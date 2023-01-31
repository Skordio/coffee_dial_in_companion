from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import HttpResponse



def public(request):
    return HttpResponse("Not authenticated")

@api_view(['GET'])
def private(request):
    return HttpResponse("You shouldn't see this if not authenticated")