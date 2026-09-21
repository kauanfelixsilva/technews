/* ========================================
   MENU (hambúrguer e dropdown)
   Fica fora do <main>, então é ligado uma vez só.
======================================== */

export function iniciarMenu() {

    const botaoMenu = document.getElementById("botao-menu");
    const menu = document.getElementById("menu");
    const menuDropdown = document.querySelector(".menu-dropdown");


    /* Menu hambúrguer */

    if (botaoMenu && menu) {

        botaoMenu.addEventListener("click", function () {

            menu.classList.toggle("ativo");

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

            }

        });

    }

}


/* Fecha o menu e o dropdown (usado ao trocar de página) */

export function fecharMenu() {

    const menu = document.getElementById("menu");
    const menuDropdown = document.querySelector(".menu-dropdown");

    if (menu) {

        menu.classList.remove("ativo");

    }

    if (menuDropdown) {

        menuDropdown.classList.remove("ativo");

    }

}
