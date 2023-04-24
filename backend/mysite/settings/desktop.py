from .base import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "coffee",
        "USER": "skord",
        "PASSWORD": MYSQL_DATABASE_SECRET,
        "HOST": "192.168.1.160",
        "PORT": "3306",
    },
}
