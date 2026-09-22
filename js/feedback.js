/* ========================================
   COMPONENTES DE FEEDBACK (modal e toast)
   O modal e o toast ficam fora do <main>.
   Os elementos são buscados na hora de usar,
   assim este arquivo não depende da ordem de carga.
======================================== */

/* ---------- MODAL ---------- */

/* Guarda quem estava com foco antes de abrir o modal,
   para devolver o foco a esse elemento ao fechar. */

let elementoAnteriorAoFoco = null;


export function abrirModal(evento) {

    const modal = document.getElementById("modal");

    if (!modal) {

        return;

    }

    /* Se foi um clique num botão, guarda o botão. Senão, guarda
       o que estava focado no momento (ex.: chamada pelo teclado). */

    elementoAnteriorAoFoco = (evento && evento.currentTarget) || document.activeElement;

    modal.classList.add("ativo");

    /* Move o foco para dentro do modal, no botão de fechar.
       Sem isso, quem navega pelo teclado continuaria "atrás"
       do modal, numa página que parece ter mudado sem avisar. */

    const botaoFechar = document.getElementById("fechar-modal");

    if (botaoFechar) {

        botaoFechar.focus();

    }

    document.addEventListener("keydown", fecharModalComEsc);

}


export function fecharModal() {

    const modal = document.getElementById("modal");

    if (!modal) {

        return;

    }

    modal.classList.remove("ativo");

    document.removeEventListener("keydown", fecharModalComEsc);

    /* Devolve o foco para quem abriu o modal, se esse elemento
       ainda existir na página (pode ter sumido numa troca de rota) */

    if (elementoAnteriorAoFoco && document.contains(elementoAnteriorAoFoco)) {

        elementoAnteriorAoFoco.focus();

    }

    elementoAnteriorAoFoco = null;

}


function fecharModalComEsc(evento) {

    if (evento.key === "Escape") {

        fecharModal();

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
