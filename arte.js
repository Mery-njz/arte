const caderno = document.getElementById("caderno");
const paginas = document.querySelectorAll(".pagina");

let paginaAtual = 0;
const totalPaginas = paginas.length;

letstartX = 0;
let isDragging = false;

function atualizarDiario() {
    paginas.forEach((pagina, index) => {
        if (index < paginaAtual) {
            pagina.classList.add("virada");
            pagina.style.zIndex = 10 + index;
        } else {
            pagina.classList.remove("virada");
            pagina.style.zIndex = totalPaginas - index;
        }
    });
}

function avancarPagina() {
    if (paginaAtual < totalPaginas - 1) {
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

// ---- EVENTOS DE ARRASTAR COM O MOUSE ----

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
    let diffX = startX - endX; // Distância do movimento

    // Se arrastou para a esquerda (mínimo de 50 pixels) -> Avança a página
    if (diffX > 50) {
        avancarPagina();
    } 
    // Se arrastou para a direita (mínimo de 50 pixels) -> Volta a página
    else if (diffX < -50) {
        voltarPagina();
    }

    isDragging = false;
});

// Suporte para telas de toque (celular/tablet)
caderno.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

caderno.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;

    if (diffX > 50) {
        avancarPagina();
    } else if (diffX < -50) {
        voltarPagina();
    }
    isDragging = false;
});

// Inicializa a ordem das páginas
atualizarDiario();
