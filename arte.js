const caderno = document.getElementById("caderno");
const paginas = document.querySelectorAll(".pagina");

let paginaAtual = 0;
const totalPaginas = paginas.length;

let startX = 0;
let isDragging = false;

function atualizarDiario() {
    paginas.forEach((pagina, index) => {
        // CORREÇÃO CRUCIAL: Remove o z-index fixo que estava no HTML para não travar o clique
        pagina.style.removeProperty("z-index");

        if (index < paginaAtual) {
            // Páginas que já viraram vão para a esquerda
            pagina.classList.add("virada");
            pagina.style.zIndex = 10 + index;
        } else {
            // Páginas que estão na direita
            pagina.classList.remove("virada");
            pagina.style.zIndex = totalPaginas - index;
        }
    });

    // Ajusta o alinhamento do caderno dependendo se está na capa ou aberto
    if (paginaAtual === 0) {
        caderno.style.transform = "translateX(50%)"; // Centraliza a capa fechada
    } else if (paginaAtual === totalPaginas) {
        caderno.style.transform = "translateX(-50%)"; // Centraliza a contracapa fechada
    } else {
        caderno.style.transform = "translateX(0%)"; // Abre centralizado mostrando os dois lados
    }
}

function avancarPagina() {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarDiario();
    }
}

function voltarPagina() {
    if (paginaAtual > 0) {
        paginaAtual--;
        atualizarDiario();
    }
}

// ---- MOVIMENTO DO MOUSE (DRAG) ----

caderno.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
});

window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    
    let endX = e.clientX;
    let diffX = startX - endX;

    // Arrastou para a esquerda -> passa a folha para a esquerda
    if (diffX > 40) {
        avancarPagina();
    } 
    // Arrastou para a direita -> puxa a folha de volta
    else if (diffX < -40) {
        back: voltarPagina();
    }

    isDragging = false;
});

// Suporte para celular (Touch)
caderno.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

caderno.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;

    if (diffX > 40) {
        avancarPagina();
    } else if (diffX < -40) {
        voltarPagina();
    }
    isDragging = false;
});

// Inicializa o estado do livro
atualizarDiario();

