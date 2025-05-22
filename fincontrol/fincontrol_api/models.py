from django.db import models
from django.contrib.auth.models import User

class Transacao(models.Model):
    TIPOS = (
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
    )

    descricao = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=10, choices=TIPOS)
    data = models.DateField()
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transacoes')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'{self.descricao} - {self.tipo} - R${self.valor}'


class Profile(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=11, null=False, blank=False)

    def __str__(self):
        return f"{self.nome} - {self.usuario.username}"

# Create your models here.
