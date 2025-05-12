from django.urls import path
from .views import RegisterView
from .views import (
    CategoriaListCreate, CategoriaDetailUpdateDelete,
    TransacaoListCreate, TransacaoDetailUpdateDelete,
    ProfileListCreate, ProfileDetailUpdateDelete, ResumoFinanceiroView
)

urlpatterns = [
    # Categorias
    path('categorias/', CategoriaListCreate.as_view(), name='categoria-list-create'),
    path('categorias/<int:pk>/', CategoriaDetailUpdateDelete.as_view(), name='categoria-detail'),

    # Transações
    path('transacoes/', TransacaoListCreate.as_view(), name='transacao-list-create'),
    path('transacoes/<int:pk>/', TransacaoDetailUpdateDelete.as_view(), name='transacao-detail'),

    # Perfis
    path('profiles/', ProfileListCreate.as_view(), name='profile-list-create'),
    path('profiles/<int:pk>/', ProfileDetailUpdateDelete.as_view(), name='profile-detail'),

    #Cadastro de usuario
    path('register/', RegisterView.as_view(), name='register'),

    path('resumo/', ResumoFinanceiroView.as_view(), name='resumo-financeiro'),
]
