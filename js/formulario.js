/* ========================================
   FORMULÁRIO DE CADASTRO
   Junta as peças: pergunta à validação se os
   campos estão certos, grava o rascunho pelo
   armazenamento e avisa a pessoa pelo toast.
======================================== */

import { validarCampo, limparValidacao } from "./validacao.js";
import { salvarRascunho, carregarRascunho, apagarRascunho } from "./armazenamento.js";
import { mostrarToast } from "./feedback.js";


/* Monta um objeto { id do campo: valor } com o que está digitado */

function lerCampos(campos) {

    const valores = {};

    campos.forEach(function (campo) {

        valores[campo.id] = campo.value;

    });

    return valores;

}


export function iniciarFormulario() {

    const formulario = document.querySelector("main form");

    if (!formulario) {

        return;

    }

    const campos = formulario.querySelectorAll("input:not([type='submit']), select");


    /* Se existe um rascunho salvo, preenche os campos com ele.
       (Os campos ficam neutros até a pessoa interagir.) */

    const rascunho = carregarRascunho();

    if (rascunho !== null) {

        campos.forEach(function (campo) {

            if (typeof rascunho[campo.id] === "string") {

                campo.value = rascunho[campo.id];

            }

        });

    }

    campos.forEach(function (campo) {

        /* Ao sair do campo, confere o que foi digitado */

        campo.addEventListener("blur", function () {

            validarCampo(campo);

        });

        /* Enquanto digita, só reconfere campos que já foram
           marcados (assim o erro some ao corrigir) */

        campo.addEventListener("input", function () {

            if (campo.classList.contains("campo-erro") ||
                campo.classList.contains("campo-sucesso")) {

                validarCampo(campo);

            }

            /* A cada alteração, atualiza o rascunho salvo */

            salvarRascunho(lerCampos(campos));

        });

    });


    /* O formulário tem "novalidate": quem valida é o JavaScript.
       O "submit" acontece mesmo com campos inválidos. */

    formulario.addEventListener("submit", function (evento) {

        /* Impede o navegador de recarregar a página */

        evento.preventDefault();

        /* Valida todos os campos e guarda o primeiro com erro */

        let primeiroErro = null;

        campos.forEach(function (campo) {

            const valido = validarCampo(campo);

            if (!valido && primeiroErro === null) {

                primeiroErro = campo;

            }

        });

        /* Se houver erro, não envia: leva o cursor até ele */

        if (primeiroErro !== null) {

            primeiroErro.focus();

            return;

        }

        formulario.reset();

        limparValidacao(campos);

        /* Cadastro enviado: o rascunho não é mais necessário */

        apagarRascunho();

        mostrarToast(
            "Cadastro realizado!",
            "Obrigado por se cadastrar no TechNews."
        );

    });

}
