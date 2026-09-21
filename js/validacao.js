/* ========================================
   VALIDAÇÃO DO FORMULÁRIO
   Cada regra recebe o valor do campo e devolve
   a mensagem de erro (ou "" quando está tudo certo).
   Não grava nada e não sabe o que acontece depois
   do envio: só confere e avisa na tela.
======================================== */

/* Confere os dois dígitos verificadores do CPF */

export function cpfValido(cpf) {

    const numeros = cpf.replace(/\D/g, "");

    /* Rejeita CPFs com todos os dígitos iguais (111.111.111-11) */

    if (/^(\d)\1{10}$/.test(numeros)) {

        return false;

    }

    /* tamanho 9 confere o 1º dígito; tamanho 10 confere o 2º */

    for (let tamanho = 9; tamanho <= 10; tamanho++) {

        let soma = 0;

        for (let i = 0; i < tamanho; i++) {

            soma += Number(numeros[i]) * (tamanho + 1 - i);

        }

        let digito = (soma * 10) % 11;

        if (digito === 10) {

            digito = 0;

        }

        if (digito !== Number(numeros[tamanho])) {

            return false;

        }

    }

    return true;

}


/* Devolve a data de hoje no formato AAAA-MM-DD.
   (Reserva: só é usada se o Day.js não carregar.) */

function dataDeHoje() {

    const hoje = new Date();

    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return hoje.getFullYear() + "-" + mes + "-" + dia;

}


/* Nomes de pessoas e cidades: começam com letra e podem ter
   letras (com acento), espaço, apóstrofo, ponto e hífen */

const SO_LETRAS = /^\p{L}[\p{L} '.-]*$/u;

/* Data de nascimento mais antiga aceita */

const DATA_MINIMA = "1900-01-01";


/* Uma regra para cada campo (a chave é o id do campo) */

export const regras = {

    nome: function (valor) {

        if (valor === "") {

            return "Informe seu nome completo.";

        }

        if (valor.length < 3) {

            return "O nome deve ter pelo menos 3 caracteres.";

        }

        if (!SO_LETRAS.test(valor)) {

            return "O nome deve ter apenas letras.";

        }

        return "";

    },

    email: function (valor) {

        if (valor === "") {

            return "Informe seu e-mail.";

        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {

            return "Use o formato nome@dominio.com.";

        }

        return "";

    },

    data_nascimento: function (valor) {

        if (valor === "") {

            return "Informe sua data de nascimento.";

        }

        /* Day.js é uma biblioteca externa, carregada por CDN no
           index.html. Se ela não carregar (sem internet, por exemplo),
           o código usa a comparação simples de texto como reserva. */

        if (typeof dayjs === "function") {

            const data = dayjs(valor);

            if (!data.isValid()) {

                return "Data inválida.";

            }

            if (data.isAfter(dayjs(), "day")) {

                return "A data não pode ser no futuro.";

            }

            if (data.isBefore(dayjs(DATA_MINIMA))) {

                return "Informe uma data a partir de 1900.";

            }

        } else {

            if (valor > dataDeHoje()) {

                return "A data não pode ser no futuro.";

            }

            if (valor < DATA_MINIMA) {

                return "Informe uma data a partir de 1900.";

            }

        }

        return "";

    },

    telefone: function (valor) {

        if (valor === "") {

            return "Informe seu telefone.";

        }

        if (!/^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/.test(valor)) {

            return "Use o formato (11) 91234-5678.";

        }

        return "";

    },

    cpf: function (valor) {

        if (valor === "") {

            return "Informe seu CPF.";

        }

        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor)) {

            return "Use o formato 000.000.000-00.";

        }

        if (!cpfValido(valor)) {

            return "CPF inválido. Confira os números.";

        }

        return "";

    },

    cep: function (valor) {

        if (valor === "") {

            return "Informe seu CEP.";

        }

        if (!/^\d{5}-\d{3}$/.test(valor)) {

            return "Use o formato 00000-000.";

        }

        return "";

    },

    cidade: function (valor) {

        if (valor === "") {

            return "Informe sua cidade.";

        }

        if (valor.length < 2) {

            return "A cidade deve ter pelo menos 2 caracteres.";

        }

        if (!SO_LETRAS.test(valor)) {

            return "A cidade deve ter apenas letras.";

        }

        return "";

    },

    estado: function (valor) {

        if (valor === "") {

            return "Selecione um estado.";

        }

        return "";

    }

};


/* Mostra ou esconde o erro de um campo, mexendo nas classes
   CSS, nos atributos de acessibilidade e na mensagem */

function mostrarResultado(campo, mensagem) {

    let aviso = document.getElementById("erro-" + campo.id);

    if (mensagem !== "") {

        campo.classList.remove("campo-sucesso");
        campo.classList.add("campo-erro");
        campo.setAttribute("aria-invalid", "true");

        /* Cria a mensagem só se ela ainda não existir */

        if (!aviso) {

            aviso = document.createElement("span");

            aviso.id = "erro-" + campo.id;
            aviso.className = "mensagem-erro";
            aviso.setAttribute("role", "alert");

            campo.insertAdjacentElement("afterend", aviso);

            campo.setAttribute("aria-describedby", aviso.id);

        }

        aviso.textContent = mensagem;

    } else {

        campo.classList.remove("campo-erro");
        campo.classList.add("campo-sucesso");
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");

        if (aviso) {

            aviso.remove();

        }

    }

}


/* Valida um campo. Devolve true quando está válido */

export function validarCampo(campo) {

    const regra = regras[campo.id];

    if (!regra) {

        return true;

    }

    const mensagem = regra(campo.value.trim());

    mostrarResultado(campo, mensagem);

    return mensagem === "";

}


/* Volta os campos ao estado neutro (usado depois de enviar) */

export function limparValidacao(campos) {

    campos.forEach(function (campo) {

        const aviso = document.getElementById("erro-" + campo.id);

        campo.classList.remove("campo-erro", "campo-sucesso");
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");

        if (aviso) {

            aviso.remove();

        }

    });

}
