from django.contrib.auth import login, logout

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers import LoginSerializer, SignupSerializer


class UserDataView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        user = request.user
        data = {
            "logged_in": user.is_authenticated,
        }
        if user.is_authenticated:
            data["user"] = {
                "email": user.email,
            }
        return Response(data, status=status.HTTP_200_OK)


class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"detail": "Successfully registered."}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)
            return Response(
                {"detail": "Successfully logged in."}, status=status.HTTP_200_OK
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):

    def post(self, request):
        logout(request)
        return Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_200_OK
        )
