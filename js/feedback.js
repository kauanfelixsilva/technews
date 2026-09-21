/* ========================================
   COMPONENTES DE FEEDBACK (modal e toast)
   O modal e o toast ficam fora do <main>.
   Os elementos são buscados na hora de usar,
   assim este arquivo não depende da ordem de carga.
======================================== */

/* ---------- MODAL ---------- */

export function abrirModal() {

    const modal = document.getElementById("modal");

    if (modal) {

        modal.classList.add("ativo");

    }

}


export function fecharModal() {

    const modal = document.getElementById("modal");

    if (modal) {

        modal.classList.remove("ativo");

    }

}


/* Liga os botões de fechar (uma vez só) */

export function iniciarModal() {

    const modal = document.getElementById("modal");
    const botaoFecharModal = document.getElementById("fechar-modal");
    const botaoFechar = document.getElementById("botao-fechar");

    if (botaoFecharModal) {

        botaoFecharModal.addEventListener("click", fecharModal);

    }

    if (botaoFechar) {

        botaoFechar.addEventListener("click", fecharModal);

    }

    /* Clique fora da janela também fecha */

    if (modal) {

        modal.addEventListener("click", function (evento) {

            if (evento.target === modal) {

                fecharModal();

            }

        });

    }

}


/* ---------- TOAST ---------- */

let temporizadorToast;


export function mostrarToast(titulo, mensagem) {

    const toast = document.getElementById("toast");

    if (!toast) {

        return;

    }

    toast.querySelector("strong").textContent = titulo;
    toast.querySelector("span").textContent = mensagem;

    toast.classList.add("ativo");

    /* Se um toast já estava na tela, reinicia a contagem */

    clearTimeout(temporizadorToast);

    temporizadorToast = setTimeout(function () {

        toast.classList.remove("ativo");

    }, 4000);

}
