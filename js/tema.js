/* ========================================
   TEMA (claro / escuro)
   Fica fora do <main>, então é ligado uma vez só.

   Sem escolha salva, o site segue o tema do sistema
   operacional (prefers-color-scheme), controlado só
   por CSS. A pessoa pode escolher um tema pelo botão
   do cabeçalho; essa escolha é salva no localStorage
   e passa a mandar mais que o sistema.
======================================== */

const CHAVE_TEMA = "technews_tema";


function temaSalvo() {

    try {

        return localStorage.getItem(CHAVE_TEMA);

    } catch (erro) {

        return null;

    }

}


function salvarTema(tema) {

    try {

        localStorage.setItem(CHAVE_TEMA, tema);

    } catch (erro) {

        /* Armazenamento bloqueado: o tema não é lembrado
           depois, mas o botão continua funcionando agora */

    }

}


/* Diz se a tela está (ou vai ficar) no modo escuro, considerando
   a escolha salva e, na falta dela, a preferência do sistema */

function ehModoEscuro(tema) {

    if (tema === "escuro") {

        return true;

    }

    if (tema === "claro") {

        return false;

    }

    return Boolean(
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

}


function aplicarTema(botao, tema) {

    if (tema === null) {

        document.documentElement.removeAttribute("data-tema");

    } else {

        document.documentElement.setAttribute("data-tema", tema);

    }

    const escuro = ehModoEscuro(tema);

    if (botao) {

        botao.setAttribute("aria-pressed", escuro);
        botao.textContent = escuro ? "☀️" : "🌙";

    }

}


export function iniciarTema() {

    const botao = document.getElementById("botao-tema");

    aplicarTema(botao, temaSalvo());

    if (botao) {

        botao.addEventListener("click", function () {

            const temaAtual = document.documentElement.getAttribute("data-tema");
            const novoTema = ehModoEscuro(temaAtual) ? "claro" : "escuro";

            aplicarTema(botao, novoTema);
            salvarTema(novoTema);

        });

    }

}
