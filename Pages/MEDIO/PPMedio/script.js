let pontos = 0;
const perguntasRespondidas = {}; // Armazena quais perguntas já foram respondidas

const perguntas = [
    { texto: "_____ são os responsáveis pelo trabalho?", respostaCorreta: "ELES", opcoes: ["ELES", "NÓS", "EU", "ELA"] },
    { texto: "_____ vamos ao parque amanhã", respostaCorreta: "NÓS", opcoes: ["ELAS", "TU", "EU", "NÓS"] },
    { texto: "_____ gostam de estudar", respostaCorreta: "ELAS", opcoes: ["ELAS", "NÓS", "TU", "ELA"] },
    { texto: "_____ precisa praticar esportes", respostaCorreta: "ELE", opcoes: ["ELE", "NÓS", "EU", "ELA"] },
    { texto: "_____ são legais e gentis", respostaCorreta: "ELAS", opcoes: ["ELAS", "TU", "NÓS", "ELE"] }
];

// Função para verificar a resposta
function verificarResposta(respostaCorreta, respostaEscolhida, chave, opcoes) {
    const resultadoElement = document.querySelector("#resultado");

    // Verifica se a pergunta já foi respondida
    if (perguntasRespondidas[chave]) {
        resultadoElement.textContent = "Você já respondeu essa pergunta.";
        return;
    }

    // Verificando se a resposta está correta
    if (respostaCorreta === respostaEscolhida) {
        pontos += 2; // Adiciona 2 pontos se a resposta estiver correta
        resultadoElement.textContent = "Resposta correta! Você agora tem " + pontos + " ponto(s).";
    } else {
        resultadoElement.textContent = "Resposta incorreta. Você ainda tem " + pontos + " ponto(s).";
    }

    // Marca a pergunta como respondida
    perguntasRespondidas[chave] = true;

    // Desabilita todos os botões de opções
    opcoes.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled'); // Adiciona uma classe CSS para indicar que o botão está desabilitado
    });
}

// Função genérica para adicionar eventos
function adicionarEventos(opcoes, respostaCorreta, indice) {
    opcoes.forEach(opcao => {
        opcao.addEventListener("click", () => verificarResposta(respostaCorreta, opcao.textContent.trim().toUpperCase(), indice, opcoes));
    });
}

// Função para configurar a pergunta atual
function configurarPergunta(indice) {
    const pergunta = perguntas[indice];
    const h1 = document.querySelector("h1");
    const buttons = document.querySelectorAll(".button-container button");
    const resultadoElement = document.querySelector("#resultado");

    // Atualiza o texto da pergunta
    h1.textContent = pergunta.texto;

    // Atualiza os botões de resposta
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.classList.remove('disabled'); // Remove a classe de desabilitado
    });

    // Adiciona eventos aos botões
    adicionarEventos(buttons, pergunta.respostaCorreta, indice);

    // Configura os botões de navegação
    configurarBotoesNavegacao(indice);
}

// Função para configurar os botões de navegação
function configurarBotoesNavegacao(indice) {
    const proximaButton = document.getElementById("proxima");
    const voltarDificuldadeButton = document.getElementById("voltarDificuldade");
    const voltarHomeButton = document.getElementById("voltarHome");

    proximaButton.style.display = (indice === perguntas.length - 1) ? "none" : "block"; // Esconde na última pergunta
    proximaButton.onclick = () => {
        if (indice < perguntas.length - 1) {
            configurarPergunta(indice + 1);
        } else {
            alert("Fim do quiz! Você fez " + pontos + " ponto(s).");
            window.location.href = "http://127.0.0.1:5501/Pages/nivel.html"; // URL para seleção de nível
        }
    };

   // Botão para voltar ao nível de dificuldade
   
   voltarDificuldadeButton.style.display = (indice === perguntas.length - 1) ? "block" : "none"; // Exibe apenas na última pergunta
   voltarDificuldadeButton.onclick = () => {
       window.location.href = "http://127.0.0.1:5501/Pages/MEDIO/nivelMedio.html"; // URL para voltar ao nível de dificuldade
    };

    voltarHomeButton.style.display = "block"; // Mostra em todas as perguntas
    voltarHomeButton.onclick = () => {
        window.location.href = "http://127.0.0.1:5501/Pages/Home.html"; // URL para voltar à Home
    };
}

// Inicializa o quiz ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    configurarPergunta(0);
});
