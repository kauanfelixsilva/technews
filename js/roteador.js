/* ========================================
   ROTEADOR DA SPA (navegação por hash)
   Só troca o conteúdo do <main id="app">.
   O que fazer depois de cada troca (ligar
   eventos, preencher cards...) é decidido por
   quem chama, através da função "aoRenderizar".
======================================== */

/* Cada rota diz qual template usar e qual título mostrar na aba */

const rotas = {
    "/": {
        template: "pagina-inicio",
        titulo: "TechNews"
    },
    "/categorias": {
        template: "pagina-categorias",
        titulo: "Categorias - TechNews"
    },
    "/cadastro": {
        template: "pagina-cadastro",
        titulo: "Cadastro - TechNews"
    }
};


export function iniciarRoteador(aoRenderizar) {

    const app = document.getElementById("app");


    function renderizarPagina() {

        /* "#/categorias" vira "/categorias". Tudo em minúsculas,
           para "#/Cadastro" funcionar como "#/cadastro" */

        let caminho = window.location.hash.slice(1).toLowerCase();

        /* Tira a barra do final ("#/cadastro/" vira "/cadastro") */

        if (caminho.length > 1 && caminho.endsWith("/")) {

            caminho = caminho.slice(0, -1);

        }

        /* Sem hash (ou hash que não começa com "/") vira a página inicial */

        if (!caminho.startsWith("/")) {

            caminho = "/";

        }

        /* Se a rota não existir, mostra a página inicial */

        const rota = rotas[caminho] || rotas["/"];

        const template = document.getElementById(rota.template);

        /* 1. Limpa o contêiner */

        app.innerHTML = "";

        /* 2. Injeta uma cópia do conteúdo do template */

        app.appendChild(template.content.cloneNode(true));

        /* 3. Atualiza o que muda junto com a página */

        document.title = rota.titulo;

        window.scrollTo(0, 0);

        /* 4. Avisa quem chamou que o conteúdo novo já está na tela */

        aoRenderizar();

    }


    /* Quando o hash da URL muda, desenha a página de novo */

    window.addEventListener("hashchange", renderizarPagina);


    /* Desenha a página que está aberta agora */

    renderizarPagina();

}
