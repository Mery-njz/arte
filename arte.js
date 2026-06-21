const caderno = document.getElementById("caderno");
const paginas = document.querySelectorAll(".pagina");

let paginaAtual = 0;
const totalPaginas = paginas.length;

let startX = 0;
let isDragging = false;

function atualizarDiario() {
    paginas.forEach((pagina, index) => {
        // Garante que nenhum estilo antigo interfira
        pagina.style.removeProperty("z-index");

        if (index < paginaAtual) {
            // Páginas viradas vão para a esquerda
            pagina.classList.add("virada");
            pagina.style.zIndex = 20 + index;
        } else {
            // Páginas normais ficam na direita
            pagina.classList.remove("virada");
            pagina.style.zIndex = 20 + (totalPaginas - index);
        }
    });

    // Centralização do caderno na tela
    if (paginaAtual === 0) {
        caderno.style.transform = "translateX(50%)";
    } else if (paginaAtual === totalPaginas) {
        caderno.style.transform = "translateX(-50%)";
    } else {
        caderno.style.transform = "translateX(0%)";
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

// ---- MOVIMENTOS (MOUSE) ----
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

    if (diffX > 40) {
        avancarPagina();
    } else if (diffX < -40) {
        voltarPagina();
    }

    isDragging = false;
});

// ---- MOVIMENTOS (CELULAR) ----
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

// Inicialização
atualizarDiario();





