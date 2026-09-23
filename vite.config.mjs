import { defineConfig } from "vite";
import { resolve } from "path";
import { minify } from "html-minifier-terser";
import { imagetools } from "vite-imagetools";

/* O vite build sozinho só reescreve as tags <script>/<link> do
   HTML para apontar para os arquivos com hash; ele não remove
   comentários nem espaços do HTML em si. Este plugin faz essa
   parte, depois que o Vite já processou o resto. */

function minificarHtml() {

    return {
        name: "minificar-html",
        enforce: "post",
        async transformIndexHtml(html) {

            return minify(html, {
                collapseWhitespace: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
            });

        },
    };

}

/* ========================================
   CONFIGURAÇÃO DO VITE
   O projeto segue a estrutura exigida pela disciplina
   (html/, css/, js/, imagens/ como pastas irmãs).

   A raiz do Vite (root) é a pasta html/: é isso que faz o
   build colocar o index.html na RAIZ de dist/ (dist/index.html),
   em vez de dist/html/index.html. Sem isso, o GitHub Pages (e a
   maioria dos serviços de deploy) não acharia a página inicial
   no endereço principal do site.

   Os caminhos ../css, ../js e ../imagens continuam funcionando:
   o Vite resolve os <link>/<script>/import a partir da pasta
   onde o arquivo HTML está no disco, não a partir da "root".
======================================== */

export default defineConfig({

    root: resolve(__dirname, "html"),

    /* base relativa: o site funciona em qualquer subpasta
       de domínio, sem precisar saber o link final do deploy */
    base: "./",

    plugins: [imagetools(), minificarHtml()],

    build: {
        outDir: resolve(__dirname, "dist"),
        emptyOutDir: true,
    },
});
