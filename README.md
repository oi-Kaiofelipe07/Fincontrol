---

# 🏦 FinControl - Sistema de Controle Financeiro

Bem-vindo ao **FinControl**!
Este é um sistema de controle financeiro pessoal, desenvolvido com **Django REST Framework** no backend e **React + Vite** no frontend.

---

## 🚀 **Demonstração**

* 🔗 **Frontend (Vercel)**: [https://fincontrol-project.vercel.app](https://fincontrol-project.vercel.app)
* 🔗 **Backend (Render)**: [https://fincontrol-sevd.onrender.com](https://fincontrol-sevd.onrender.com)

---

## 🛠️ **Tecnologias Utilizadas**

### 🔹 Backend

* Python
* Django
* Django REST Framework
* SimpleJWT (Autenticação)
* SQLite (banco de dados)
* Whitenoise (servir arquivos estáticos)
* CORS Headers
* Gunicorn

### 🔹 Frontend

* React
* Vite
* TailwindCSS
* Recharts (gráficos)
* Axios

### 🔹 Deploy

* Render (Backend)
* Vercel (Frontend)

---

## 📦 **Como rodar o projeto localmente**

### ✅ Clonando o repositório

```bash
git clone https://github.com/oi-Kaiofelipe07/seu-repositorio.git
cd seu-repositorio
```

---

## ⚙️ **Backend - Django**

### ➡️ Pré-requisitos

* Python 3.10+
* pip
* virtualenv (recomendado)

### ➡️ Instalação

1. Criar e ativar ambiente virtual:

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
```

2. Instalar dependências:

```bash
pip install -r requirements.txt
```

3. Realizar as migrações:

```bash
python manage.py migrate
```

4. Criar superusuário:

```bash
python manage.py createsuperuser
```

5. Rodar o servidor:

```bash
python manage.py runserver
```

6. Acesse a API:
   [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## ⚙️ **Frontend - React + Vite**

### ➡️ Pré-requisitos

* Node.js 18+
* npm ou yarn

### ➡️ Instalação

1. Acesse a pasta `frontend`:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env.local` e adicione a variável de ambiente:

```
VITE_API_URL=http://127.0.0.1:8000
```

➡️ **Se quiser testar com backend da Render**:

```
VITE_API_URL=https://fincontrol-sevd.onrender.com
```

4. Rode o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse:
   [http://localhost:5173](http://localhost:5173)

---

## ✅ **Configurações importantes**

* **CORS**: configurado no backend para permitir requisições do frontend na Vercel.
* **Autenticação**: via JWT - JSON Web Token.
* **Proxy**: no `vite.config.ts` o proxy foi ajustado para desenvolvimento local.

---

## 📝 **Endpoints principais da API**

* `POST /api/token/` - Obter token JWT
* `POST /api/token/refresh/` - Atualizar token JWT
* `GET /api/transacoes/` - Listar transações
* `POST /api/transacoes/` - Criar transação
* `GET /api/transacoes/{id}/` - Detalhe da transação
* `PUT /api/transacoes/{id}/` - Atualizar transação
* `DELETE /api/transacoes/{id}/` - Excluir transação

---

## 📂 **Deploy**

### ✅ Backend (Render)

1. Criar conta na Render.
2. Conectar o repositório.
3. Configurar:

   * **Build Command**: `pip install -r requirements.txt`
   * **Start Command**: `gunicorn fincontrol.wsgi`
   * **Root Directory**: `fincontrol` (ou conforme estrutura).
4. Configurar variável `PYTHON_VERSION` se necessário.

### ✅ Frontend (Vercel)

1. Criar conta na Vercel.
2. Conectar o repositório.
3. Configurar:

   * **Framework**: Vite.
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Adicionar variável de ambiente `VITE_API_URL` com a URL do backend da Render.

---

## ✅ **Funcionalidades**

✅ Cadastro de transações
✅ Gráficos de entradas e saídas (Recharts)
✅ Autenticação via JWT
✅ Backend RESTful
✅ Deploy automatizado
✅ CORS configurado para produção

---

## 👨‍💻 **Desenvolvido por:**

**Kaio Felipe**
[LinkedIn](https://www.linkedin.com/in/kaiofelipee/) | [GitHub](https://github.com/oi-Kaiofelipe07)

---

## 📄 **Licença**

Este projeto está sob a licença MIT.

---

## ❓ **Dúvidas?**

Entre em contato via [LinkedIn](https://www.linkedin.com/in/kaiofelipee/).

---

