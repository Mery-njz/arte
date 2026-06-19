const etapas = [
  {
    pergunta: "Você acorda em um quarto escuro. O que faz?",
    respostas: [
      { texto: "Abrir a porta", proxima: 1, fundo: "quarto.jpg" },
      { texto: "Olhar pela janela", proxima: 1, fundo: "janela.jpg" },
      { texto: "Ficar parado", proxima: 1, fundo: "parado.jpg" }
    ]
  },
  {
    pergunta: "Você ouve passos se aproximando. O que faz?",
    respostas: [
      { texto: "Se esconder", proxima: 2, fundo: "armario.jpg" },
      { texto: "Correr pelo corredor", proxima: 2, fundo: "corredor.jpg" },
      { texto: "Enfrentar o som", proxima: 2, fundo: "som.jpg" }
    ]
  },
  {
    pergunta: "Uma figura aparece diante de você. O que faz?",
    respostas: [
      { texto: "Grita por ajuda", final: "⠀ ⠀ ⠀ ⠀ ⠀Final ruim ⠀ ⠀ ⠀ ⠀ ⠀⠀ ⠀ ⠀ ninguem veio te ajudar...", fundo: "grito.jpg" },
      { texto: "Tenta conversar", final: "Final ???", fundo: "conversar.jpg" },
      { texto: "Ataca a figura", final: "⠀ ⠀ ⠀ ⠀ ⠀Final bom ⠀ ⠀ ⠀ ⠀ ⠀⠀ ⠀ ⠀ ⠀ voce matou a figura!", fundo: "ataque.jpg" }
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
  document.getElementById("background").style.backgroundImage = "url('inicio.jpg')";
}

// ⚠️ Importante: o listener vem no final, depois da função existir
document.getElementById("start-btn").addEventListener("click", startGame);
