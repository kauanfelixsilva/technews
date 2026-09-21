/* ========================================
   CARDS (Template Literals)
   Cada função de "criar" recebe um objeto da
   lista de dados e devolve o HTML do card.
======================================== */

import { noticias, categorias } from "./dados.js";
import { abrirModal, mostrarToast } from "./feedback.js";


function criarBotao(botao, categoria) {

    if (botao === null) {

        return "";

    }

    if (botao.tipo === "modal") {

        return `<button class="botao-modal" data-titulo="${categoria}">${botao.texto}</button>`;

    }

    return `<button class="botao-toast">${botao.texto}</button>`;

}


export function criarCardNoticia(noticia) {

    return `
        <article>
            <span class="badge">${noticia.categoria}</span>
            <h3>${noticia.titulo}</h3>
            <p>${noticia.resumo}</p>
            <img src="${noticia.imagem}" alt="${noticia.alt}">
            ${criarBotao(noticia.botao, noticia.categoria)}
        </article>
    `;

}


export function criarCardCategoria(categoria) {

    return `
        <article>
            <h3>${categoria.titulo}</h3>
            <p>${categoria.descricao}</p>
        </article>
    `;

}


/* Transforma cada item da lista em um card (map), junta tudo
   em um texto só (join) e insere no final da seção. */

export function preencherListas() {

    const listaNoticias = document.getElementById("lista-noticias");
    const listaCategorias = document.getElementById("lista-categorias");

    if (listaNoticias) {

        const cards = noticias.map(criarCardNoticia).join("");

        listaNoticias.insertAdjacentHTML("beforeend", cards);

    }

    if (listaCategorias) {

        const cards = categorias.map(criarCardCategoria).join("");

        listaCategorias.insertAdjacentHTML("beforeend", cards);

    }

}


/* Liga os botões dos cards recém-criados ao modal e ao toast */

export function ativarBotoesDosCards() {

    const botoesModal = document.querySelectorAll("main .botao-modal");

    botoesModal.forEach(function (botao) {

        botao.addEventListener("click", abrirModal);

    });

    const botaoToast = document.querySelector(".botao-toast");

    if (botaoToast) {

        botaoToast.addEventListener("click", function () {

            mostrarToast(
                "Atualização disponível!",
                "Uma nova informação foi adicionada ao TechNews."
            );

        });

    }

}
