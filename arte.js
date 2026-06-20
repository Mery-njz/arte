const btnVoltar = document.getElementById("btn-voltar");
const btnAvancar = document.getElementById("btn-avancar");
const paginas = document.querySelectorAll(".pagina");

let paginaAtual = 0;
const totalPaginas = paginas.length;

function atualizarDiario() {
    paginas.forEach((pagina, index) => {
        if (index < paginaAtual) {
            // Página já virada
            pagina.classList.add("virada");
            pagina.style.zIndex = 10 + index;
        } else {
            // Página ainda não virada
            pagina.classList.remove("virada");
            pagina.style.zIndex = totalPaginas - index;
        }
    });
}

function avancarPagina() {
    if (paginaAtual < totalPaginas - 1) {   // CORRIGIDO
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

// Botões
btnAvancar.addEventListener("click", avancarPagina);
btnVoltar.addEventListener("click", voltarPagina);

// Clique direto na página
paginas.forEach((pagina, index) => {
    pagina.addEventListener("click", (e) => {
        if (e.target.tagName === "TEXTAREA") return; // não vira se clicar dentro do texto

        if (index < paginaAtual) {
            voltarPagina();
        } else if (index === paginaAtual) {
            avancarPagina();
        }
    });
});

// Inicializa
atualizarDiario();
