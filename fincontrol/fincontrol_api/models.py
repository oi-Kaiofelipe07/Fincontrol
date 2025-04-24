from django.db import models

from django.contrib.auth.models import User

class Categoria(models.Model):
    nome = models.CharField(max_length=100)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categorias', null=True)

    def __str__(self):
        return self.nome

class Transacao(models.Model):
    TIPOS = (
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
    )

    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=10, choices=TIPOS)
    data = models.DateField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transacoes')

    def __str__(self):
        return f'{self.descricao} - {self.tipo} - R${self.valor}'
    
class Profile(models.Model):
    nome = models.CharField(max_length=100)
    sobrenome = models.CharField(max_length=100)
    data_nascimento = models.DateField()
    telefone = models.CharField(max_length=15)
    endereco = models.CharField(max_length=255)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    cep = models.CharField(max_length=10)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    def __str__(self):
        return f'{self.nome} {self.sobrenome}'
# Create your models here.
