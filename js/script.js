/* ========================================
   ARQUIVO PRINCIPAL
   Não tem regra própria: só importa os módulos
   e diz em que ordem eles começam a funcionar.

   dados.js         -> listas de notícias e categorias
   cards.js         -> monta os cards e liga seus botões
   validacao.js     -> regras dos campos e aviso de erro
   armazenamento.js -> localStorage (rascunho)
   mascaras.js      -> máscaras de CPF, telefone e CEP
   formulario.js    -> junta validação + rascunho + toast
   menu.js          -> menu hambúrguer e dropdown
   feedback.js      -> modal e toast
   roteador.js      -> troca de páginas da SPA
======================================== */

import { iniciarMenu, fecharMenu } from "./menu.js";
import { iniciarModal, fecharModal } from "./feedback.js";
import { preencherListas, ativarBotoesDosCards } from "./cards.js";
import { ativarMascaras } from "./mascaras.js";
import { iniciarFormulario } from "./formulario.js";
import { iniciarRoteador } from "./roteador.js";


/* Parte fixa da página (fora do <main>): ligada uma vez só */

iniciarMenu();
iniciarModal();


/* Parte que muda com a página (dentro do <main>): precisa ser
   ligada de novo sempre que o conteúdo for trocado */

function iniciarPagina() {

    fecharMenu();

    /* O modal fica fora do <main>: se a página trocar com ele aberto
       (botão voltar do navegador), ele precisa fechar junto */

    fecharModal();

    preencherListas();

    ativarBotoesDosCards();

    ativarMascaras();

    /* As máscaras vêm antes: o formulário grava o rascunho
       já com o texto formatado */

    iniciarFormulario();

}


iniciarRoteador(iniciarPagina);
