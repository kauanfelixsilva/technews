/* ========================================
   MENU (hambúrguer e dropdown)
   Fica fora do <main>, então é ligado uma vez só.

   Os botões que abrem/fecham algo têm
   aria-expanded, atualizado aqui sempre que o
   estado muda, para leitores de tela saberem se
   o menu está aberto ou fechado.
======================================== */

export function iniciarMenu() {

    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu");
    const menuDropdown = document.querySelector(".menu-dropdown");
    const tituloDropdown = menuDropdown ? menuDropdown.querySelector("a") : null;


    /* Menu hambúrguer */

    if (botaoMenu && menu) {

        botaoMenu.addEventListener("click", function () {

            menu.classList.toggle("ativo");

            botaoMenu.setAttribute("aria-expanded", menu.classList.contains("ativo"));

        });

    }


    /* Dropdown no mobile */

    if (menuDropdown) {

        menuDropdown.addEventListener("click", function (evento) {

            /* Só o título "Categorias ▾" abre e fecha o menu.
               Os links de dentro do dropdown seguem navegando. */

            const clicouNoTitulo = evento.target.closest(".dropdown") === null;

            if (window.innerWidth <= 768 && clicouNoTitulo) {

                evento.preventDefault();

                menuDropdown.classList.toggle("ativo");

                if (tituloDropdown) {

                    tituloDropdown.setAttribute("aria-expanded", menuDropdown.classList.contains("ativo"));

                }

            }

        });

    }

}


/* Fecha o menu e o dropdown (usado ao trocar de página) */

export function fecharMenu() {

    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu");
    const menuDropdown = document.querySelector(".menu-dropdown");
    const tituloDropdown = menuDropdown ? menuDropdown.querySelector("a") : null;

    if (menu) {

        menu.classList.remove("ativo");

    }

    if (menuDropdown) {

        menuDropdown.classList.remove("ativo");

    }

    if (botaoMenu) {

        botaoMenu.setAttribute("aria-expanded", "false");

    }

    if (tituloDropdown) {

        tituloDropdown.setAttribute("aria-expanded", "false");

    }

}
