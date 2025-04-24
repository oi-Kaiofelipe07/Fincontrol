from rest_framework import generics  # importa as views genéricas do Django REST
from rest_framework import serializers
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from .models import Categoria, Transacao, Profile
from .serializers import CategoriaSerializer, TransacaoSerializer, ProfileSerializer

class CategoriaListCreate(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]  # Exige autenticação para acessar a view

    def get_queryset(self):
        return Categoria.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Garantindo que a categoria seja associada ao usuário autenticado
        serializer.save(usuario=self.request.user)

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
        # Associando a transação ao usuário autenticado
        serializer.save(usuario=self.request.user)

class ProfileListCreate(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        # Garantindo que o perfil seja associado ao usuário autenticado
        serializer.save(usuario=self.request.user)

# Create your views here.
