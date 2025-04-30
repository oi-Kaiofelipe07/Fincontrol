from django.urls import path
from .views import (
    CategoriaListCreate, CategoriaDetailUpdateDelete,
    TransacaoListCreate, TransacaoDetailUpdateDelete,
    ProfileListCreate, ProfileDetailUpdateDelete,
)

urlpatterns = [
    # Categorias
    path('categorias/', CategoriaListCreate.as_view()),
    path('categorias/<int:pk>/', CategoriaDetailUpdateDelete.as_view()),

    # Transações
    path('transacoes/', TransacaoListCreate.as_view()),
    path('transacoes/<int:pk>/', TransacaoDetailUpdateDelete.as_view()),

    # Perfis
    path('profiles/', ProfileListCreate.as_view()),
    path('profiles/<int:pk>/', ProfileDetailUpdateDelete.as_view()),
]