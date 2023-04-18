#!/usr/bin/env python
from setuptools import setup, find_packages

setup(
    name="myproject",
    version="1.0",
    packages=find_packages(),
    install_requires=[
        "Django==4.1.5",
        "djangorestframework",
        "drf-nested-routers==0.93.4",
        "django-sql-utils",
        "pylint",
        "black",
        "djangorestframework-simplejwt",
        "cryptography",
        "mysqlclient==2.1.1",
        "django-cors-headers==3.14.0",
        "django-oauth-toolkit==2.2.0",
        "social-auth-app-django==5.0.0",
        "social-auth-core==4.1.0",
        "mysqlclient==2.1.1",
    ],
)
