let pontos = 0;
const perguntasRespondidas = {};
let perguntaAtual = 0;

const perguntas = [
    { texto: "Acho música muito _________", respostaCorreta: "LEGAL", opcoes: ["EU", "LEGAL", "TU", "ELAS"] },
    { texto: "Futebol é _________", respostaCorreta: "CHATO", opcoes: ["CHATO", "NÓS", "JOGAR", "ELAS"] },
    { texto: "Meus avós são _________", respostaCorreta: "IDOSOS", opcoes: ["EU", "VER", "IDOSOS", "ELES"] },
    { texto: "Eu gosto de filmes _________", respostaCorreta: "LEGAIS", opcoes: ["LEGAIS", "VER", "GOSTAR", "TU"] },
    { texto: "A paisagem é _________", respostaCorreta: "BONITA", opcoes: ["BONITA", "FEIO", "TRISTE", "BELAS"] }
];

function verificarResposta(respostaCorreta, respostaEscolhida, elemento) {
    const resultadoElement = document.getElementById("resultado");
    const chave = respostaCorreta;

    if (perguntasRespondidas[chave] !== undefined) {
        resultadoElement.textContent = "Você já respondeu essa pergunta.";
        return;
    }

    if (respostaEscolhida === respostaCorreta) {
        pontos += 2;
        resultadoElement.textContent = "Resposta correta! Você agora tem " + pontos + " ponto(s).";
    } else {
        resultadoElement.textContent = "Resposta incorreta. Você ainda tem " + pontos + " ponto(s).";
    }

    perguntasRespondidas[chave] = respostaEscolhida === respostaCorreta;
    elemento.forEach(btn => btn.disabled = true);
}

function carregarPergunta(indice) {
    const pergunta = perguntas[indice];
    if (!pergunta) {
        console.log("Nenhuma pergunta encontrada.");
        return;
    }

    const h1 = document.querySelector("h1");
    h1.textContent = pergunta.texto;

    const buttons = document.querySelectorAll(".button-container button");
    buttons.forEach((btn, index) => {
        btn.textContent = pergunta.opcoes[index];
        btn.disabled = false;
        btn.onclick = () => verificarResposta(pergunta.respostaCorreta, btn.textContent, buttons);
    });

    const proximaButton = document.getElementById("proxima");
    const voltarDificuldadeButton = document.getElementById("voltarDificuldade");
    const voltarHomeButton = document.getElementById("voltarHome");

    // Lógica do botão "Próxima"
    proximaButton.style.display = (indice === perguntas.length - 1) ? "none" : "block"; // Esconde na última pergunta

    // Ação do botão "Próxima"
    proximaButton.onclick = () => {
        perguntaAtual++;
        if (perguntaAtual < perguntas.length) {
            carregarPergunta(perguntaAtual);
        } else {
            alert("Fim do quiz! Você fez " + pontos + " ponto(s).");
            // Direcionar para uma página de seleção de nível
            window.location.href = "http://127.0.0.1:5501/Pages/nivel.html"; // Altere para a URL do seu nível
        }
    };

    // Lógica para exibir o botão "Voltar ao Nível" apenas na última pergunta (pergunta 5)
    if (perguntaAtual === 4) {  // A última pergunta é a 5ª (índice 4)
        voltarDificuldadeButton.style.display = "block"; // Torna o botão visível
    } else {
        voltarDificuldadeButton.style.display = "none"; // Oculta o botão nas outras perguntas
    }

    // Adicionar o comportamento de clique no botão "Voltar ao Nível"
    voltarDificuldadeButton.onclick = () => {
        window.location.href = "http://127.0.0.1:5501/Pages/DIFICIL/nivelDificl.html"; // URL para voltar ao nível de dificuldade
    };

    // Botão para voltar para a Home
    voltarHomeButton.style.display = "block"; // Mostra em todas as perguntas
    voltarHomeButton.onclick = () => {
        window.location.href = "http://127.0.0.1:5501/Pages/Home.html"; // URL para voltar à Home
    };
}

document.addEventListener("DOMContentLoaded", function () {
    carregarPergunta(perguntaAtual);
});
