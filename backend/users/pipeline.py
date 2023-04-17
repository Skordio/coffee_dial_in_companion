from .models import User


def create_user(backend, user, response, *args, **kwargs):
    if not user:
        email = response.get("email")
        user, created = User.objects.get_or_create(email=email, defaults={"username": email})
    return {"user": user}
