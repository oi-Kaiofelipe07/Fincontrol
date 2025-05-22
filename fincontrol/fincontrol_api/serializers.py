from rest_framework import serializers
from .models import Transacao, Profile

class TransacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacao
        fields = ['id', 'descricao', 'valor', 'tipo', 'data', 'usuario', 'created_at']
        read_only_fields = ['usuario', 'created_at']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'nome', 'cpf', 'telefone', 'endereco']

    def validate_cpf(self, value):
        user = self.context['request'].user
        existing_profile = Profile.objects.filter(cpf=value).exclude(usuario=user).first()
        if existing_profile:
            raise serializers.ValidationError("Este CPF já está cadastrado por outro usuário.")
        return value

