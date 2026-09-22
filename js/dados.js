/* ========================================
   IMAGENS
   Importar (em vez de escrever o caminho como texto)
   é o que permite ao Vite enxergar essas imagens,
   incluí-las na build e otimizar/renomear o arquivo.
   Sem isso, elas não apareceriam no site publicado.
======================================== */

import imagemIA from "../imagens/ia.png.jpg";
import imagemProgramacao from "../imagens/programação.jpg";
import imagemSeguranca from "../imagens/segurançadigital.jpg";


/* ========================================
   DADOS DOS CARDS
   Só guarda informação, não mexe na tela.
   (para mudar ou adicionar um card, basta
   editar estas listas)
======================================== */

export const noticias = [
    {
        categoria: "Inteligência Artificial",
        titulo: "Inteligência Artificial ganha novos recursos",
        resumo: "Novas ferramentas de inteligência artificial estão trazendo recursos para facilitar tarefas do dia a dia.",
        imagem: imagemIA,
        alt: "Representação de inteligência artificial",
        botao: { tipo: "modal", texto: "Saiba mais" }
    },
    {
        categoria: "Programação",
        titulo: "Novidades no desenvolvimento de software",
        resumo: "Novas tecnologias estão ajudando desenvolvedores a criar aplicações mais modernas e eficientes.",
        imagem: imagemProgramacao,
        alt: "Código de programação em uma tela",
        botao: { tipo: "toast", texto: "Ver atualização" }
    },
    {
        categoria: "Segurança Digital",
        titulo: "Segurança digital ganha importância",
        resumo: "Empresas e usuários estão cada vez mais atentos à proteção de dados e à segurança na internet.",
        imagem: imagemSeguranca,
        alt: "Imagem relacionada à segurança digital",
        botao: null
    }
];


export const categorias = [
    {
        titulo: "Inteligência Artificial",
        descricao: "Notícias sobre inteligência artificial, ferramentas e novas tecnologias."
    },
    {
        titulo: "Programação",
        descricao: "Conteúdos sobre desenvolvimento de software, linguagens de programação e aplicações web."
    },
    {
        titulo: "Segurança Digital",
        descricao: "Informações sobre segurança na internet, proteção de dados e privacidade."
    },
    {
        titulo: "Inovação",
        descricao: "Novidades sobre tecnologias e soluções que estão transformando o mercado."
    }
];
