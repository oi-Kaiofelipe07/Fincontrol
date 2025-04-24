from rest_framework import serializers  # importa a base dos serializers
from .models import Categoria  # importa o modelo Categoria da sua app
from .models import Transacao  # importa o modelo Transacao da sua app
from .models import Profile  # importa o modelo Usuario da sua app

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'
        read_only_fields = ['usuario']

    def create(self, validated_data):
        # Acessando o usuário autenticado através do request
        user = self.context['request'].user
        # Criando a categoria associada ao usuário
        categoria = Categoria.objects.create(usuario=user, **validated_data)
        return categoria

class TransacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transacao
        fields = '__all__'
        read_only_fields = ['usuario']

    def create(self, validated_data):
        user = self.context['request'].user
        transacao = Transacao.objects.create(usuario=user, **validated_data)
        return transacao

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['usuario']

    def create(self, validated_data):
        user = self.context['request'].user
        profile, created = Profile.objects.get_or_create(usuario=user, defaults=validated_data)
        return profile

