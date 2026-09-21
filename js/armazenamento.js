/* ========================================
   ARMAZENAMENTO (localStorage)
   Só cuida de gravar e ler no navegador.
   Não conhece formulário nem tela: recebe e
   devolve objetos comuns.

   O localStorage só guarda texto, por isso o
   objeto passa por JSON.stringify ao gravar e
   por JSON.parse ao ler.
======================================== */

const CHAVE_RASCUNHO = "technews_rascunho_cadastro";


/* Grava: converte o objeto em texto e salva */

export function salvarRascunho(rascunho) {

    try {

        localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(rascunho));

    } catch (erro) {

        /* Armazenamento bloqueado ou cheio: o site segue funcionando */

    }

}


/* Lê: busca o texto salvo e converte de volta para objeto.
   Devolve null se não houver rascunho ou se o texto estiver quebrado. */

export function carregarRascunho() {

    try {

        const texto = localStorage.getItem(CHAVE_RASCUNHO);

        if (texto === null) {

            return null;

        }

        return JSON.parse(texto);

    } catch (erro) {

        return null;

    }

}


/* Remove o rascunho (depois de um envio válido) */

export function apagarRascunho() {

    try {

        localStorage.removeItem(CHAVE_RASCUNHO);

    } catch (erro) {

        /* Sem armazenamento, não há o que apagar */

    }

}
