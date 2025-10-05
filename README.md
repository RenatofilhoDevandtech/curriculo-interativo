# 🚀 Currículo Interativo com Assistente de Carreira IA

<div align="center">
<img width="1080" height="1080" alt="imagem-curriculo" src="https://github.com/user-attachments/assets/301f5014-448f-4b15-9c70-39f1d4d1997f" />

</div>

<div align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge" alt="Status do Projeto">
  <img src="https://img.shields.io/badge/Licença-MIT-blue?style=for-the-badge" alt="Licença">
  <img src="https://img.shields.io/badge/Versão-1.0.0-informational?style=for-the-badge" alt="Versão">
</div>

<div align="center">
  <br>
  <strong><a href="https://seu-link-do-vercel.app">Ver Demo Ao Vivo »</a></strong>
</div>

---

Este não é apenas um currículo. É uma demonstração viva de como a tecnologia pode transformar a forma como apresentamos nossas qualificações, criando uma ponte direta entre minhas habilidades e as necessidades do mercado.

**Problema resolvido:** Recrutadores analisam dezenas de currículos por dia, buscando não apenas palavras-chave, mas o contexto por trás delas. Este projeto foi criado para economizar o tempo do recrutador, respondendo proativamente às suas perguntas e demonstrando minhas habilidades na prática.


---

## 📖 Tabela de Conteúdos

- ✨ [Funcionalidades em Destaque](#-funcionalidades-em-destaque)
- 🚀 [Por que este Projeto é Diferente?](#-por-que-este-projeto-é-diferente)
- 🛠️ [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- 📂 [Estrutura do Projeto](#-estrutura-do-projeto)
- ⚙️ [Como Rodar o Projeto Localmente](#-como-rodar-o-projeto-localmente)
- 🌐 [Deploy na Vercel](#-deploy-na-vercel)
- 💬 [Contato](#-contato)

---

## ✨ Funcionalidades em Destaque

| Funcionalidade              | Descrição                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| 🔮 Design Holográfico       | Interface com efeito "liquid glass", fundo animado e brilho interativo.   |
| 🧠 Assistente de Carreira IA| Chat com IA (Google Gemini) para análise profunda e contextual do perfil. |
| 🤝 Análise de Compatibilidade | IA avalia a sinergia entre perfil e descrição de vaga.                    |
| 💬 Experiência de Chat      | Respostas em streaming e sugestões de perguntas para engajar o recrutador.|
| 📊 Contador de Visualizações| Firebase Firestore exibe engajamento em tempo real.                       |

---

## 🚀 Por que este Projeto é Diferente?

<div align="center">

| Para Recrutadores              | Para Mim (Desenvolvedor)                   |
|-------------------------------|-------------------------------------------|
| ✅ Economia de Tempo           | 💻 Demonstração de Habilidades Fullstack   |
| ✅ Contexto Instantâneo        | 🧠 Aplicação Prática de IA e APIs          |
| ✅ Avaliação Profunda e Interativa | 🎨 Foco em UX/UI e Visão de Produto     |

</div>

---

## 🛠️ Tecnologias Utilizadas

| Categoria             | Tecnologias                                      |
|----------------------|--------------------------------------------------|
| **Frontend**          | HTML5, CSS3, Tailwind CSS, JavaScript (ESM)     |
| **Backend**           | Node.js (Serverless Function)                   |
| **Inteligência Artificial** | Google Gemini API                        |
| **Banco de Dados**    | Google Firebase Firestore (NoSQL)               |
| **Hospedagem & Deploy**| Vercel                                         |

---

## 📂 Estrutura do Projeto

```bash
 curriculo-interativo/
├── api/ │ 
     └── server.js # Backend seguro que protege a chave da IA 
├── .gitignore # Protege arquivos sensíveis 
├── index.html # Página principal 
├── package.json # Dependências do projeto 
├── README.md # Este guia 
├── script.js # Lógica do frontend e interatividade 
    └── style.css # Design da página
```

---

## ⚙️ Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/)
- Vercel CLI: instale com o comando:

```bash
npm i -g vercel
```
## 🚀 Passos

### 1. Clone o Repositório

```bash
git clone https://github.com/RenatofilhoDevandtech/curriculo-interativo.git
cd curriculo-interativo
```
markdown
## 🚀 Passos para Executar o Projeto

### 2. Crie o Arquivo de Variáveis de Ambiente

```bash
touch .env
```
Adicione sua chave da API Gemini no arquivo .env:

```bash
env
GEMINI_API_KEY="sua_chave_secreta_aqui"
```
## 3. Configure o Firebase no script.js
```js
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMÍNIO",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};
```
## 4. Instale as Dependências e Rode o Servidor
```bash
npm install
vercel dev
```
## 5. Abra no Navegador

```bash
Código
http://localhost:3000
```
## 🌐 Deploy na Vercel

1. Crie um repositório no GitHub e envie os arquivos.
2. Acesse [vercel.com](https://vercel.com), clique em **Add New > Project**.
3. Importe o repositório.
4. Configure as variáveis de ambiente:

```txt
Name: GEMINI_API_KEY  
Value: sua_chave_secreta_aqui
```
## 💬 Contato

<div align="center">

Desenvolvido com ❤️ por **Renato Filho**. Vamos nos conectar!

<br><br>

<a href="https://www.linkedin.com/in/renato-filho-devandtech/">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>

<a href="https://github.com/RenatofilhoDevandtech">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>

</div>


