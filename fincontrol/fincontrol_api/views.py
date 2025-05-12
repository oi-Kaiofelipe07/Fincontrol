from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError
from django.db import models 

from .models import Categoria, Transacao, Profile
from .serializers import CategoriaSerializer, TransacaoSerializer, ProfileSerializer

# ----------- CATEGORIA -----------
class CategoriaListCreate(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['nome']
    ordering_fields = ['nome']

    def get_queryset(self):
        return Categoria.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class CategoriaDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj.usuario != self.request.user:
            raise PermissionDenied("Você não tem permissão para acessar esta categoria.")
        return obj

# ----------- TRANSACAO -----------
class TransacaoListCreate(generics.ListCreateAPIView):
    queryset = Transacao.objects.all()
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['data', 'tipo']
    ordering_fields = ['data', 'valor']

    def get_queryset(self):
        return Transacao.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class TransacaoDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transacao.objects.all()
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj.usuario != self.request.user:
            raise PermissionDenied("Você não tem permissão para acessar esta transação.")
        return obj

# ----------- PROFILE -----------
class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['nome']
    ordering_fields = ['nome']

    def get_queryset(self):
        return Profile.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class ProfileDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj.usuario != self.request.user:
            raise PermissionDenied("Você não tem permissão para acessar este perfil.")
        return obj
    

# ----------- CADASTRO -----------
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Permitir acesso sem autenticação

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username e senha são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Nome de usuário já está em uso.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({'message': 'Usuário criado com sucesso!'}, status=status.HTTP_201_CREATED)   


# ----------- RESUMO -----------
class ResumoFinanceiroView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user

        entradas = Transacao.objects.filter(usuario=usuario, tipo='entrada').aggregate(total=models.Sum('valor'))['total'] or 0
        saidas = Transacao.objects.filter(usuario=usuario, tipo='saida').aggregate(total=models.Sum('valor'))['total'] or 0
        saldo = entradas - saidas

        return Response({
            'entradas': entradas,
            'saidas': saidas,
            'saldo': saldo
        })
