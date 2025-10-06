<p align="center">
  <img src="https://api.iconify.design/ph/robot-duotone.svg?color=%238b5cf6" width="100" alt="AI Assistant Logo">
</p>

<h1 align="center">Currículo Interativo com Assistente de Carreira IA</h1>

<p align="center">
  Uma experiência interativa que une design moderno e inteligência artificial para transformar o currículo tradicional em uma ferramenta de carreira estratégica e viva.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-4CAF50?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Status do Projeto">
  <img src="https://img.shields.io/badge/Licença-MIT-blue?style=for-the-badge&logo=mit&logoColor=white" alt="Licença">
  <img src="https://img.shields.io/badge/Versão-1.0.0-informational?style=for-the-badge" alt="Versão">
</p>

<p align="center">
  <br>
  <a href="https://curriculo-interativo-renato.vercel.app/" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/Ver%20Demo%20Ao%20Vivo-8B5CF6?style=for-the-badge&logo=vercel&logoColor=white" alt="Ver Demo Ao Vivo">
  </a>
</p>

---

### <img src="https://api.iconify.design/feather/help-circle.svg?color=%238B5CF6" width="24" style="vertical-align:middle; margin-right:8px;" /> O Problema
Recrutadores analisam dezenas de currículos por dia, buscando não apenas palavras-chave, mas o **contexto** por trás delas. Um PDF estático não responde a perguntas, não demonstra a profundidade do conhecimento e raramente se destaca. Como criar uma ponte real entre minhas qualificações e as necessidades do mercado?

### <img src="https://api.iconify.design/feather/check-circle.svg?color=%233B82F6" width="24" style="vertical-align:middle; margin-right:8px;" /> A Solução
Este projeto reimagina o currículo como um **produto digital**. Ele foi criado para economizar o tempo do recrutador, respondendo proativamente às suas perguntas e demonstrando minhas habilidades na prática, através de uma interface inteligente e conversacional.

<div align="center">
  <img width="960" alt="Screenshot do Currículo Interativo" src="https://github.com/user-attachments/assets/301f5014-448f-4b15-9c70-39f1d4d1997f">
</div>

---

### <img src="https://api.iconify.design/feather/gift.svg?color=%238B5CF6" width="24" style="vertical-align:middle; margin-right:8px;" /> Funcionalidades em Destaque

| Ícone | Funcionalidade | Descrição |
| :---: | :--- | :--- |
| <img src="https://api.iconify.design/feather/eye.svg?color=currentColor" width="20"/> | **Design Imersivo** | Interface com efeito "liquid glass", fundo animado e brilho interativo para uma experiência memorável. |
| <img src="https://api.iconify.design/feather/message-circle.svg?color=currentColor" width="20"/> | **Assistente de IA** | Chat com Google Gemini para uma análise profunda e contextual do meu perfil. |
| <img src="https://api.iconify.design/feather/git-pull-request.svg?color=currentColor" width="20"/> | **Análise de Sinergia** | IA avalia a compatibilidade entre meu perfil e a descrição de uma vaga colada pelo recrutador. |
| <img src="https://api.iconify.design/feather/trending-up.svg?color=currentColor" width="20"/> | **Contador de Views** | Firebase Firestore exibe o engajamento com o perfil em tempo real. |

---

### <img src="https://api.iconify.design/feather/tool.svg?color=%233B82F6" width="24" style="vertical-align:middle; margin-right:8px;" /> Tecnologias Utilizadas

| Camada | Stack de Tecnologias |
| :--- | :--- |
| **🎨 Frontend** | HTML5, CSS3, Tailwind CSS, JavaScript (ESM) |
| **⚙️ Backend** | Node.js (Vercel Serverless Function) |
| **🧠 IA Generativa** | Google Gemini API |
| **🗃️ Banco de Dados** | Google Firebase Firestore (NoSQL) |
| **🚀 Plataforma & DevOps**| Vercel (Hospedagem e Deploy Contínuo) |

---

### <img src="https://api.iconify.design/feather/folder.svg?color=%238B5CF6" width="24" style="vertical-align:middle; margin-right:8px;" /> Estrutura do Projeto

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

### <img src="https://api.iconify.design/feather/play-circle.svg?color=%233B82F6" width="24" style="vertical-align:middle; margin-right:8px;" /> Como Rodar o Projeto Localmente

#### 1. Pré-requisitos
* **Node.js** instalado ([nodejs.org](https://nodejs.org/)).
* **Vercel CLI** instalado: `npm i -g vercel`.

#### 2. Configuração
1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/RenatofilhoDevandtech/curriculo-interativo.git](https://github.com/RenatofilhoDevandtech/curriculo-interativo.git)
    cd curriculo-interativo
    ```
2.  **Crie o Arquivo de Chaves Secretas (`.env`):**
    ```bash
    touch .env
    ```
    Adicione sua chave da API Gemini dentro do arquivo:
    ```env
    GEMINI_API_KEY="sua_chave_secreta_aqui"
    ```
3.  **Configure o Firebase:**
    * Abra `script.js` e substitua o objeto `firebaseConfig` pelos dados do seu projeto Firebase, Faça isso para que suas visitas seja contbilizadas de forma correta pois se utilizar o meu, será contabilizado com base no meu projeto, por isso peço que atualize com os seus dados do firebase.

  ```bash
  const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "curriculo-interativo.firebaseapp.com",
  projectId: "curriculo-interativo",
  storageBucket: "curriculo-interativo.appspot.com",
  messagingSenderId: "333721113393",
  appId: "1:333721113393:web:bc7a7eb64ea5728fa25610",
  measurementId: "G-XXXXXXX"
};
```
4.  **Instale e Rode:**
    ```bash
    npm install
    vercel dev
    ```
    O projeto estará disponível em `http://localhost:3000`.

---

### <img src="https://api.iconify.design/feather/shield.svg?color=%238B5CF6" width="24" style="vertical-align:middle; margin-right:8px;" /> Nota sobre Segurança

Este projeto foi projetado com a segurança em mente.
* **Chave da IA:** A `GEMINI_API_KEY` é protegida em uma variável de ambiente e **nunca** é exposta no frontend. As chamadas são feitas através de uma função serverless que atua como um proxy seguro.
* **Chaves do Firebase:** As chaves de configuração do Firebase no frontend são públicas por design. A segurança é garantida pelas **Regras de Segurança (Security Rules)** do Firestore, que foram configuradas para permitir escrita apenas por usuários autenticados, prevenindo abuso.

---

### <img src="https://api.iconify.design/feather/send.svg?color=%233B82F6" width="24" style="vertical-align:middle; margin-right:8px;" /> Contato

<p align="center">
  Desenvolvido por <strong>Renato Filho</strong>. Vamos nos conectar!
  <br><br>
  <a href="https://www.linkedin.com/in/renato-filho-devandtech/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://github.com/RenatofilhoDevandtech">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>
