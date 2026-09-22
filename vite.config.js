import { defineConfig } from "vite";
import { resolve } from "path";
import { minify } from "html-minifier-terser";

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
   (html/, css/, js/, imagens/ como pastas irmãs), então
   a raiz do Vite continua sendo a raiz do projeto — só
   apontamos qual HTML é o ponto de entrada da build.
======================================== */

export default defineConfig({

    /* base relativa: o site funciona em qualquer subpasta
       de domínio, sem precisar saber o link final do deploy */
    base: "./",

    plugins: [minificarHtml()],

    build: {
        outDir: "dist",

        rollupOptions: {
            input: resolve(__dirname, "html/index.html"),
        },
    },
});
