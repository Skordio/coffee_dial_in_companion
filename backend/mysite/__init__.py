

class Router:
    router = None

    @classmethod
    def getRouter(cls):
        from rest_framework_nested import routers

        if cls.router is None:
            cls.router = routers.DefaultRouter()
        return cls.router


getRouter = Router.getRouter