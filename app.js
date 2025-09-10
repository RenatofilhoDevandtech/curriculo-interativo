// --- Firebase SDK ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, increment } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", function () {
  
  // =================================================================
  // MÓDULO DE DADOS: Atualize seus projetos aqui!
  // =================================================================
  const projectsData = [
    {
    title: "Currículo Interativo com IA",
    description: "Este próprio currículo, desenvolvido com HTML, TailwindCSS, Node.js e a API do Gemini para fornecer análises interativas e em tempo real.",
    technologies: ["HTML", "CSS", "TailwindCSS", "JavaScript", "Gemini API", "Firebase", "Node.js"],
    link: "#"
  },
  
  {
    title: "Site-Primefix",
    description: "PrimeFlix Moderno é uma aplicação de streaming premium, pensada para entregar uma experiência fluida, envolvente e visualmente marcante. Cada detalhe — da arquitetura ao design — foi cuidadosamente planejado.",
    technologies: ["React", "JavaScript", "CSS", "HTML", "API", "PostCSS", "React Router DOM"],
    link: "https://github.com/RenatofilhoDevandtech/Site-Primefix"
  },
  {
    title: "Projeto-Elevate",
    description: "O frontend do Elevate é a camada interativa e dinâmica da nossa plataforma, projetada para proporcionar uma experiência de usuário (UX) intuitiva, responsiva e envolvente.",
    technologies: ["React", "JavaScript", "HTML", "React Router", "Axios", "Normalize", "Tailwind CSS"],
    link: "https://github.com/RenatofilhoDevandtech/Projeto-Elevate"
  },
  {
    title: "MVP - Fluxo Ágil",
    description: "O Gestor Integrado Inteligente (GII), desenvolvido no O-HACKA-TA-ON com Microsoft Power Platform, é uma solução inovadora para eliminar dores crônicas na gestão de processos.",
    technologies: ["React", "Microsoft", "Power BI", "Figma", "HTML", "CSS", "JavaScript", "PowerApps", "Miro"],
    link: "https://github.com/RenatofilhoDevandtech/Mvp-FluxoAgil"
  },
  {
    title: "Desafio Livros Vai na Web",
    description: "Desafio técnico focado na criação de uma página web responsiva utilizando HTML, CSS, SASS e React com React Router.",
    technologies: ["React", "CSS", "HTML", "SASS", "React Router"],
    link: "https://github.com/RenatofilhoDevandtech/DesafioLivrosVaiNaWeb"
  }
];
  // =================================================================
  // MÓDULO DE UI: Funções que manipulam a interface
  // =================================================================
  const UIModule = {
    renderProjects: () => {
      const projectsList = document.getElementById('projects-list');
      if(!projectsList) return;
      projectsList.innerHTML = projectsData.map(project => `
          <div class="bg-slate-800/50 p-6 rounded-xl border border-white/10">
            <div class="flex justify-between items-start">
                <h4 class="font-bold text-blue-300 text-lg">${project.title}</h4>
                ${project.link !== '#' ? `<a href="${project.link}" target="_blank" class="text-sm text-indigo-300 hover:underline">Ver Projeto <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></a>` : ''}
            </div>
            <p class="text-stone-400 mt-2 text-sm">${project.description}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              ${project.technologies.map(tech => `<span class="bg-indigo-500/20 text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">${tech}</span>`).join('')}
            </div>
          </div>
        `).join('');
    },
    setupEventListeners: () => {
      const card = document.getElementById('curriculum-card');
      card?.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        card.style.setProperty('--glow-opacity', '1');
      });
      card?.addEventListener('mouseleave', () => card.style.setProperty('--glow-opacity', '0'));
      
      const modalToggle = document.getElementById("modal-toggle");
      modalToggle?.addEventListener("change", () => document.title = modalToggle.checked ? "Você achou um easter egg! ✨" : "Renato Filho | Desenvolvedor Fullstack");
    },
    streamText: (element, text, onComplete) => {
      element.innerHTML = '';
      // Lida com listas, mas mantém a formatação de negrito para ser aplicada durante o streaming
      const preFormattedText = text.replace(/\n\* (.*?)/g, '<li>$1</li>');

      const words = preFormattedText.split(' ');
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          // Aplica a formatação de negrito palavra por palavra
          let word = words[i].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          element.innerHTML += (i > 0 ? ' ' : '') + word;
          // Garante que o chat role para a última mensagem
          element.closest('#skill-modal-body')?.scrollTo(0, element.closest('#skill-modal-body').scrollHeight);
          i++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 50); // Velocidade da "digitação" em milissegundos
    }
  };

  // =================================================================
  // MÓDULO DO FIREBASE: Contador de visualizações
  // =================================================================
  const FirebaseModule = {
    db: null,
    init: async () => {
      // IMPORTANTE: Cole aqui o objeto de configuração do seu projeto Firebase.
      const firebaseConfig = {
       apiKey: "AIzaSyC8YO8tyvIBAtSoFN6kdS-mF6KGAR79wl0",
       authDomain: "curriculo-interativo.firebaseapp.com",
       projectId: "curriculo-interativo",
       storageBucket: "curriculo-interativo.firebasestorage.app",
       messagingSenderId: "333721113393",
       appId: "1:333721113393:web:bc7a7eb64ea5728fa25610",
      };
      try {
        const app = initializeApp(firebaseConfig);
        FirebaseModule.db = getFirestore(app);
        await signInAnonymously(getAuth(app));
        FirebaseModule.updateViewCount(); 
      } catch (error) {
        console.error("Erro ao inicializar Firebase:", error);
        document.getElementById('view-counter-container')?.classList.add('hidden');
      }
    },
    updateViewCount: async () => {
      if (!FirebaseModule.db) return;
      const counterRef = doc(FirebaseModule.db, "views", "profile-views");
      try {
        await setDoc(counterRef, { count: increment(1) }, { merge: true });
        const docSnap = await getDoc(counterRef);
        const count = docSnap.exists() ? docSnap.data().count : 1;
        document.getElementById('view-counter').textContent = count;
        document.getElementById('view-counter-container').classList.remove('hidden');
      } catch(error) {
        console.error("Erro ao atualizar contador:", error);
      }
    }
  };

  // =================================================================
  // MÓDULO DA API GEMINI: Interações com IA
  // =================================================================
  const GeminiModule = {
    call: async (userQuery, systemPrompt) => {
      const response = await fetch('/api/server', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery, systemPrompt })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(`Erro no servidor: ${err.error}`);
      }
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("A resposta da API está vazia.");
      return text;
    },
    getCVContext: () => {
      const aboutArticle = document.querySelector('#about article');
      const sections = {
        "Resumo Principal": document.getElementById('main-summary')?.innerText,
        "Sobre Mim (História Completa)": aboutArticle ? aboutArticle.innerText : '',
        "Habilidades": Array.from(document.querySelectorAll('.skill-tag')).map(el => el.firstChild.textContent).join(', '),
        "Experiências": Array.from(document.querySelectorAll('.experience-item')).map(el => el.innerText.replace(/\n/g, ' - ')).join('; '),
        "Educação": Array.from(document.querySelectorAll('#education-list > div')).map(el => el.innerText.replace(/\n/g, ' - ')).join('; '),
        "Projetos": JSON.stringify(projectsData)
      };
      return Object.entries(sections).map(([key, value]) => `- ${key}: ${value}`).join('\n');
    },
    setupEventListeners: () => {
      const skillModalToggle = document.getElementById('skill-modal-toggle');
      const chatMessages = document.getElementById('chat-messages');
      const suggestionChipsContainer = document.getElementById('suggestion-chips');

      const userAvatar = '/assets/avatar-pergunta.png';
      const aiAvatar = '/assets/avatar-ia.png';
      
      const createSuggestionChips = (suggestions = []) => {
          suggestionChipsContainer.innerHTML = '';
          if (suggestions.length === 0) return;

          suggestions.forEach(suggestion => {
              const chip = document.createElement('button');
              chip.className = 'suggestion-chip';
              chip.textContent = suggestion.label;
              // Adiciona um listener de clique que simula o clique no elemento alvo
              chip.addEventListener('click', () => {
                const targetElement = document.querySelector(suggestion.targetSelector);
                if (targetElement) {
                    targetElement.click();
                } else {
                    console.warn(`Elemento alvo para o chip não encontrado: ${suggestion.targetSelector}`);
                }
              });
              suggestionChipsContainer.appendChild(chip);
          });
      };

      const handleApiCall = async (button, action) => {
        button.disabled = true;
        
        const { systemPrompt, userQuery, userQueryText, suggestions } = action.getPrompt();

        // Lógica para o modal de chat
        if (action.modal) {
          skillModalToggle.checked = true;
          // Limpa o conteúdo anterior e prepara para a nova conversa
          chatMessages.innerHTML = '';
          suggestionChipsContainer.innerHTML = '';

          // Adiciona a "pergunta" do usuário ao chat
          chatMessages.innerHTML += `<div class="flex items-start gap-3 justify-end"><div class="chat-bubble user-bubble">${userQueryText}</div><img src="${userAvatar}" alt="Avatar do Usuário" class="w-8 h-8 rounded-full object-cover"></div>`;
          // Adiciona o balão da IA com o indicador de "digitando"
          chatMessages.innerHTML += `<div class="flex items-start gap-3" id="ai-bubble-container"><img src="${aiAvatar}" alt="Avatar da IA" class="w-8 h-8 rounded-full"><div class="chat-bubble ai-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div></div>`;
          // Rola para a mensagem mais recente
          chatMessages.parentElement.scrollTop = chatMessages.parentElement.scrollHeight;
        }

        try {
          const text = await GeminiModule.call(userQuery, systemPrompt);
          const streamTarget = action.modal 
            ? document.querySelector('#ai-bubble-container .ai-bubble') 
            : action.displayTarget;
            
          // Inicia o "streaming" da resposta, e cria os chips de sugestão ao completar
          UIModule.streamText(streamTarget, text, () => {
              if(action.modal) createSuggestionChips(suggestions);
          });
        } catch (error) {
          console.error(`Erro na ação "${action.name}":`, error);
          const errorMsg = `<p class="text-red-400">Desculpe, ocorreu um erro. Tente novamente.</p>`;
          const errorTarget = action.modal ? document.querySelector('#ai-bubble-container .ai-bubble') : action.displayTarget;
          errorTarget.innerHTML = errorMsg;
        } finally {
          // Reabilita o botão após a conclusão, independentemente do resultado
          button.disabled = false;
        }
      };
      
      // Análise de Compatibilidade de Vaga
      document.getElementById('analyze-job-btn')?.addEventListener('click', (e) => {
         const btn = e.currentTarget;
         const btnText = document.getElementById('btn-text');
         btnText.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Analisando...`;
         btn.disabled = true;

         const jobDesc = document.getElementById('job-description').value;
         if (!jobDesc.trim()) {
            alert('Por favor, cole uma descrição de vaga.');
            btnText.innerHTML = `<i class="fa-solid fa-magnifying-glass-chart"></i> Analisar Vaga`;
            btn.disabled = false;
            return;
         }
         
         const resultContainer = document.getElementById('gemini-result-container');
         const resultText = document.getElementById('gemini-result');
         resultContainer.classList.remove('hidden');

         handleApiCall(btn, {
            name: "Análise de Vaga",
            modal: false,
            displayTarget: resultText,
            getPrompt: () => ({
              systemPrompt: "PERSONA: Você é o assistente de carreira do Renato. Responda de forma amigável, em primeira pessoa ('Acredito que ele...', 'Pelo que vejo aqui...') e evite jargões. TAREFA: Se a vaga for compatível, diga que é um **'bom ponto de partida'** e liste em tópicos (*) os pontos fortes dele para a vaga. Se não for, diga que **'parece um desafio interessante, mas alguns pontos podem precisar de mais atenção'** e liste os gaps de forma construtiva.",
              userQuery: `Analise a compatibilidade do meu currículo com esta vaga. Contexto do currículo: ${GeminiModule.getCVContext()}. Vaga: ${jobDesc}`
            })
         }).finally(() => {
            btnText.innerHTML = `<i class="fa-solid fa-magnifying-glass-chart"></i> Analisar Vaga`;
            btn.disabled = false;
         });
      });
      
      document.getElementById('clear-analysis-btn')?.addEventListener('click', () => {
          document.getElementById('job-description').value = '';
          document.getElementById('gemini-result-container').classList.add('hidden');
      });

      // Botão "Por que me contratar?"
      document.getElementById('why-hire-me-btn')?.addEventListener('click', e => handleApiCall(e.currentTarget, {
        name: "Por que me contratar?", modal: true, getPrompt: () => ({
          userQueryText: 'Por que devo contratar o Renato?',
          systemPrompt: "PERSONA: Você é o assistente de carreira do Renato. Fale em primeira pessoa ('Eu acredito que...', 'A jornada dele mostra...'). SEJA ACESSÍVEL: Evite jargões. TAREFA: Crie 3 pontos-chave (*) explicando por que o Renato é um candidato valioso, usando a história de vida dele para provar a resiliência e o potencial.",
          userQuery: `Gere 3 motivos para contratar o Renato. Contexto: ${GeminiModule.getCVContext()}`,
          suggestions: [
             { label: 'Fale sobre a experiência dele', targetSelector: '[data-experience-title="Analista de Suporte N1"]' },
             { label: 'Ver projeto principal', targetSelector: '#projects-list a' } // Seleciona o primeiro link de projeto
          ]
        })
      }));

      // Tags de Habilidades
      document.querySelectorAll('.interactive-item.skill-tag').forEach(tag => {
        const skillName = tag.firstChild.textContent.trim();
        tag.dataset.skillName = skillName; // Adiciona um data-attribute para seleção
        tag.addEventListener('click', () => {
          handleApiCall(tag, { name: "Análise de Habilidade", modal: true, getPrompt: () => ({
            userQueryText: `Me fale mais sobre a habilidade: ${skillName}`,
            systemPrompt: "PERSONA: Você é o assistente de carreira do Renato. Fale em primeira pessoa ('Ele usou...', 'No currículo dele vejo que...'). SEJA ACESSÍVEL: Evite jargões. TAREFA: Gere 2-3 pontos curtos (*) sobre como o Renato aplicou uma habilidade, conectando-a aos projetos ou à história de vida dele.",
            userQuery: `Explique como o Renato aplicou "${skillName}". Contexto: ${GeminiModule.getCVContext()}`,
            suggestions: [
               { label: 'Qual sua principal soft skill?', targetSelector: '[data-skill-name="Resiliência"]' },
               { label: 'Fale sobre React', targetSelector: '[data-skill-name="React"]' }
            ]
          })});
        });
      });
      
      // Itens de Experiência
      document.querySelectorAll('.interactive-item.experience-item').forEach(item => item.addEventListener('click', () => {
        const expTitle = item.dataset.experienceTitle;
        const fullTitle = item.querySelector('h4').firstChild.textContent;
        handleApiCall(item, { name: "Análise de Experiência", modal: true, getPrompt: () => {
          const isTransition = expTitle === 'transition-to-tech';
          return {
            userQueryText: `Me fale mais sobre a experiência: ${fullTitle}`,
            systemPrompt: isTransition 
              ? "PERSONA: Você é o assistente de carreira do Renato. Fale em primeira pessoa ('A trajetória dele mostra...'). TAREFA: Crie uma narrativa curta (máx. 3 frases) sobre a transição de carreira dele, usando a história de vida para justificar sua motivação."
              : "PERSONA: Você é o assistente de carreira do Renato. Fale em primeira pessoa ('Nessa função...'). TAREFA: Resuma a experiência em 2 frases, explicando o que ele fazia e qual habilidade valiosa ele desenvolveu lá.",
            userQuery: `Fale sobre a experiência "${fullTitle}". Contexto: ${GeminiModule.getCVContext()}`,
            suggestions: [
                { label: 'Por que ele mudou de carreira?', targetSelector: '[data-experience-title="transition-to-tech"]' },
                { label: 'Qual a sua principal habilidade?', targetSelector: '[data-skill-name="React"]' }
            ]
          }
        }});
      }));
    }
  };

  function main() {
    UIModule.renderProjects();
    UIModule.setupEventListeners();
    FirebaseModule.init(); 
    GeminiModule.setupEventListeners();
  }

  main();
});

