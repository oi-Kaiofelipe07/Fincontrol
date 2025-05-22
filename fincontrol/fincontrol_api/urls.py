from django.urls import path
from .views import (
    TransacaoListCreate, TransacaoDetailUpdateDelete, RegisterView, ResumoFinanceiroView
)

urlpatterns = [
    path('transacoes/', TransacaoListCreate.as_view(), name='transacao-list-create'),
    path('transacoes/<int:pk>/', TransacaoDetailUpdateDelete.as_view(), name='transacao-detail'),

    path('register/', RegisterView.as_view(), name='register'),

    path('resumo/', ResumoFinanceiroView.as_view(), name='resumo-financeiro'),
]
