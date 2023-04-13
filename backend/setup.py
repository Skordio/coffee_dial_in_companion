#!/usr/bin/env python
from setuptools import setup, find_packages

setup(
    name="myproject",
    version="1.0",
    packages=find_packages(),
    install_requires=[
        "Django==4.1.5",
        "django-sql-utils",
        "pylint",
        "black",
        "djangorestframework-simplejwt",
        "cryptography",
        "mysqlclient==2.1.1",
        "django-cors-headers==3.14.0",
        "django-oauth-toolkit==2.2.0",
    ],
)
