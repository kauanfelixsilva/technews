/* ========================================
   MÁSCARAS DOS CAMPOS
   As funções "formatar..." só transformam texto.
   A função "ativarMascaras" liga elas aos campos.
======================================== */

/* Cada máscara guarda só os dígitos que cabem no campo.
   Isso evita texto grande demais quando a pessoa cola um número longo. */

export function formatarCpf(texto) {

    let valor = texto.replace(/\D/g, "").slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return valor;

}


export function formatarTelefone(texto) {

    let valor = texto.replace(/\D/g, "").slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

    return valor;

}


export function formatarCep(texto) {

    let valor = texto.replace(/\D/g, "").slice(0, 8);

    valor = valor.replace(/^(\d{5})(\d)/, "$1-$2");

    return valor;

}


/* Liga uma máscara ao campo que tem o id informado */

function ligarMascara(id, formatar) {

    const campo = document.getElementById(id);

    if (campo) {

        campo.addEventListener("input", function () {

            campo.value = formatar(campo.value);

        });

    }

}


export function ativarMascaras() {

    ligarMascara("cpf", formatarCpf);
    ligarMascara("telefone", formatarTelefone);
    ligarMascara("cep", formatarCep);

}
