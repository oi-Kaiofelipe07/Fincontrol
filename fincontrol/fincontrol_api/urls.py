from django.urls import path
from .views import CategoriaListCreate, TransacaoListCreate, ProfileListCreate


urlpatterns = [
    path('categorias/', CategoriaListCreate.as_view(), name='categoria-list-create'),
    path('transacoes/', TransacaoListCreate.as_view(), name='transacao-list-create'),
    path('perfis/', ProfileListCreate.as_view(), name='profile-list-create'),
]