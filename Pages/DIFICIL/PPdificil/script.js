let pontos = 0;
const perguntasRespondidas = {}; // Armazena quais perguntas foram respondidas
let perguntaAtual = 0;

const perguntas = [
    { texto: "_______vou ao cinema.", respostaCorreta: "EU", opcoes: ["EU", "NÓS", "ANDAR", "FILME"] },
    { texto: "_______ vamos assistir ao filme.", respostaCorreta: "NÓS", opcoes: ["VER", "EU", "LEGAL", "NÓS"] },
    { texto: " _______ participam do grupo de dança.", respostaCorreta: "ELES", opcoes: ["ELES", "NÓS", "DANCAR", "EU"] },
    { texto: "_______ vai fazer prova de matemática.", respostaCorreta: "ELA", opcoes: ["ELA", "ESTUDAR", "ANDAR", "ELES"] },
    { texto: " _______ gosto de andar de skate.", respostaCorreta: "EU", opcoes: ["SKATE", "ELES", "ELAS", "EU"] }
];

function verificarResposta(respostaCorreta, respostaEscolhida, buttons) {
    const resultadoElement = document.getElementById("resultado");

    // Verifica se a pergunta foi respondida
    const chave = perguntaAtual;

    if (perguntasRespondidas[chave] !== undefined) {
        resultadoElement.textContent = "Você já respondeu essa pergunta.";
        return;
    }

    // Verifica se a resposta está correta e atualiza a pontuação
    if (respostaEscolhida === respostaCorreta) {
        pontos += 2;
        resultadoElement.textContent = "Resposta correta! Você agora tem " + pontos + " ponto(s).";
    } else {
        resultadoElement.textContent = "Resposta incorreta. Você ainda tem " + pontos + " ponto(s).";
    }

    // Marca a pergunta como respondida e desabilita os botões
    perguntasRespondidas[chave] = respostaEscolhida === respostaCorreta;
    buttons.forEach(btn => btn.disabled = true);
}

function carregarPergunta(indice) {
    const pergunta = perguntas[indice];

    // Se não houver pergunta, finaliza o quiz
    if (!pergunta) {
        alert("Fim do quiz! Você fez " + pontos + " ponto(s).");
        // Direciona para a página de seleção de nível
        window.location.href = "/Pages/nivel.html"; // Altere para a URL do seu nível
        return;
    }

    const h1 = document.querySelector("h1");
    h1.textContent = pergunta.texto;

    // Seleciona todos os botões e atribui as opções da pergunta
    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent, buttons);
    });

    // Lógica para o botão "Próxima"
    const proximaButton = document.getElementById("proxima");
    if (proximaButton) {
        proximaButton.style.display = (indice === perguntas.length - 1) ? "none" : "block"; // Esconde na última pergunta
        proximaButton.onclick = () => {
            perguntaAtual++;
            carregarPergunta(perguntaAtual);
        };
    }

    // Exibe o botão "Voltar ao Nível" na última pergunta
    const voltarDificuldadeButton = document.getElementById("voltarDificuldade");
    voltarDificuldadeButton.style.display = (indice === 4) ? "block" : "none"; // Exibe apenas na última pergunta
    voltarDificuldadeButton.onclick = () => {
        window.location.href = "http://127.0.0.1:5501/Pages/DIFICIL/nivelDificl.html"; // URL para voltar ao nível de dificuldade
    };

    // Exibe o botão de voltar à home
    const voltarHomeButton = document.getElementById("voltarHome");
    voltarHomeButton.style.display = "block"; // Sempre mostra
    voltarHomeButton.onclick = () => {
        window.location.href = "/Pages/Home.html"; // URL para voltar à Home
    };
}

document.addEventListener("DOMContentLoaded", function () {
    carregarPergunta(perguntaAtual);
});
