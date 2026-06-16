const etapas = [
  {
    pergunta: "Você entra em uma mansão abandonada. O que faz?",
    respostas: [
      { texto: "Explorar o porão", final: "ruim1" },
      { texto: "Subir para o sótão", final: "ruim2" },
      { texto: "Ficar na sala principal", proxima: 1 }
    ]
  },
  {
    pergunta: "Você ouve passos atrás de você. O que faz?",
    respostas: [
      { texto: "Corre para fora", final: "bom" },
      { texto: "Se esconde atrás de um armário", proxima: 2 },
      { texto: "Enfrenta o som", final: "ruim3" }
    ]
  },
  {
    pergunta: "Uma figura aparece diante de você. O que faz?",
    respostas: [
      { texto: "Grita por ajuda", final: "ruim4" },
      { texto: "Tenta conversar", final: "neutro" },
      { texto: "Ataca a figura", final: "ruim5" }
    ]
  }
];

let etapaAtual = 0;

function mostrarEtapa() {
  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = "";
  const etapa = etapas[etapaAtual];
  const pergunta = document.createElement("h2");
  pergunta.textContent = etapa.pergunta;
  gameDiv.appendChild(pergunta);

  etapa.respostas.forEach(r => {
    const btn = document.createElement("button");
    btn.textContent = r.texto;
    btn.onclick = () => {
      if (r.final) {
        mostrarFinal(r.final);
      } else {
        etapaAtual = r.proxima;
        mostrarEtapa();
      }
    };
    gameDiv.appendChild(btn);
  });
}

function mostrarFinal(final) {
  document.getElementById("game").classList.add("hidden");
  const endDiv = document.getElementById("end");
  endDiv.classList.remove("hidden");
  document.getElementById("ending-text").textContent = "Você chegou ao " + final;
}

function restartGame() {
  etapaAtual = 0;
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("end").classList.add("hidden");
  mostrarEtapa();
}

mostrarEtapa();
