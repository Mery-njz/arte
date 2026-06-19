const etapas = [
  {
    pergunta: "Você entra no café e sente o aroma delicioso. O que pede primeiro?",
    respostas: [
      { texto: "Um cappuccino quentinho", proxima: 1, fundo: "cappuccino.jpg" },
      { texto: "Um chá de camomila", proxima: 1, fundo: "cha.jpg" },
      { texto: "Um chocolate quente", proxima: 1, fundo: "chocolate.jpg" }
    ]
  },
  {
    pergunta: "Enquanto espera, você escolhe onde sentar:",
    respostas: [
      { texto: "Perto da janela com vista", proxima: 2, fundo: "jane.jpg" },
      { texto: "Num sofá aconchegante", proxima: 2, fundo: "sofa.jpg" },
      { texto: "Na varanda com plantas", proxima: 2, fundo: "varanda.jpg" }
    ]
  },
  {
    pergunta: "O atendente sorri e pergunta: deseja algo para acompanhar?",
    respostas: [
      { texto: "Um bolo de morango ", final: "Final doce: você saboreia um bolo delicioso e sente paz.", fundo: "bolo.jpg" },
      { texto: "Cookies quentinhos ", final: "Final aconchegante: você aproveita cookies e conversa com amigos.", fundo: "cookies.jpg" },
      { texto: "Uma fatia de torta de maçã ", final: "Final relaxante: você saboreia a torta e observa o pôr do sol.", fundo: "torta.jpg" }
    ]
  }
];

let etapaAtual = 0;

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  etapaAtual = 0;
  mostrarEtapa();
}

function mostrarEtapa() {
  const etapa = etapas[etapaAtual];
  document.getElementById("question").textContent = etapa.pergunta;
  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  etapa.respostas.forEach(r => {
    const btn = document.createElement("button");
    btn.textContent = r.texto;
    btn.onclick = () => {
      document.getElementById("background").style.backgroundImage = `url('${r.fundo}')`;
      if (r.final) {
        mostrarFinal(r.final);
      } else {
        etapaAtual = r.proxima;
        mostrarEtapa();
      }
    };
    answersDiv.appendChild(btn);
  });
}

function mostrarFinal(final) {
  document.getElementById("game-container").classList.add("hidden");
  const endDiv = document.getElementById("end");
  endDiv.classList.remove("hidden");
  document.getElementById("ending-text").textContent = final;
}

function restartGame() {
  etapaAtual = 0;
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("end").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
  document.getElementById("background").style.backgroundImage = "url('cafe.jpg')";
}

document.getElementById("start-btn").addEventListener("click", startGame);
