from django.urls import path

from users.views import UserDataView, SignupView, LoginView, LogoutView


urlpatterns = [
    path("data/", UserDataView.as_view(), name="data"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
