from rest_framework import generics, filters, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.db import models
from django_filters.rest_framework import DjangoFilterBackend

from .models import Transacao, Profile
from .serializers import TransacaoSerializer, ProfileSerializer


# ----------- TRANSACAO -----------

class TransacaoListCreate(generics.ListCreateAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    
    filterset_fields = ['data', 'tipo']
    ordering_fields = ['created_at', 'data', 'valor']
    ordering = ['-created_at']

    def get_queryset(self):
        return Transacao.objects.filter(usuario=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class TransacaoDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TransacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transacao.objects.filter(usuario=self.request.user)



# ----------- PERFIL DO USUÁRIO (Apenas o próprio) -----------
class MeuPerfilView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            perfil = Profile.objects.get(usuario=request.user)
            serializer = ProfileSerializer(perfil)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({"detail": "Perfil não encontrado."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            perfil = Profile.objects.get(usuario=request.user)
            serializer = ProfileSerializer(perfil, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Profile.DoesNotExist:
            return Response({"detail": "Perfil não encontrado."}, status=status.HTTP_404_NOT_FOUND)


# ----------- REGISTRO DE USUÁRIO -----------
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



# ----------- RESUMO FINANCEIRO -----------
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
