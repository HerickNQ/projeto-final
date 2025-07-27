let produtosFiltrados = [];

const produtos = [
  //  Cervejas
  {
    nome: "Brahma 1L",
    vendidos: 0,
    categoria: "Cerveja",
    imagem: "assets/cervejas/brahma.jpg",
    descricao: "cerveja brahma",
    preco: 10.69,
  },
  {
    nome: "Polar 600ML",
    vendidos: 0,
    categoria: "Cerveja",
    imagem: "assets/cervejas/polar.jpg",
    descricao: "Cerveja Polar",
    preco: 5.49,
  },
  {
    nome: "Heineken Long Neck",
    vendidos: 0,
    categoria: "Cerveja",
    imagem: "assets/cervejas/heineken.jpg",
    descricao: "Cerveja heineken",
    preco: 5.99,
  },

  // Lanches
  {
    nome: "Coxinha",
    vendidos: 0,
    categoria: "Lanches",
    imagem: "assets/lanches/coxinha.jpeg",
    descricao: "salgado coxinha",
    preco: 5.99,
  },
  {
    nome: "Salame",
    vendidos: 0,
    categoria: "Petiscos",
    imagem: "assets/petiscos/salame.jpg",
    descricao: "Salame picado",
    preco: 12.90,
  },
  {
    nome: "Ovo em conserva",
    vendidos: 0,
    categoria: "Petiscos",
    imagem: "assets/petiscos/ovo-de-codorna.jpeg",
    descricao: "Ovo em conserva",
    preco: 10.90,
  },

  // Refrigerantes
  {
    nome: "Coca-Cola 600ml",
    vendidos: 0,
    categoria: "Refrigerante",
    imagem: "assets/refris/cocacola.jpg",
    descricao: "Coca-cola",
    preco: 6.90,
  },
  {
    nome: "Guaraná Antarctica lata 350ml",
    vendidos: 0,
    categoria: "Refrigerante",
    imagem: "assets/refris/guarana_lata.jpg",
    descricao: "guaraná antartica lata 350ml",
    preco: 3.50,
  },
  {
    nome: "Fanta Uva lata 350ml",
    vendidos: 0,
    categoria: "Refrigerante",
    imagem: "assets/refris/fanta_uva.jpeg",
    descricao: "Fanta Uva lata 350ml",
    preco: 3.50,
  },

  //  Doces
  {
    nome: "Chiclete",
    vendidos: 0,
    categoria: "Doces",
    imagem: "assets/doces/trident_hortela.jpg",
    descricao: "Chiclete trident",
    preco: 2.75,
  },
  {
    nome: "Bala de menta",
    vendidos: 0,
    categoria: "Doces",
    imagem: "assets/doces/bala_menta.jpg",
    descricao: "Bala de Menta",
    preco: 1.00,
  },
  {
    nome: "Chocolate ao leite",
    vendidos: 0,
    categoria: "Doces",
    imagem: "assets/doces/chocolate.jpg",
    descricao: "Chocolate ao Leite",
    preco: 10.90,
  },

  //  Salgadinos
  {
    nome: "Pipoca salgada",
    vendidos: 0,
    categoria: "Petiscos",
    imagem: "assets/petiscos/pipoca.jpg",
    descricao: "Pipoca salgada",
    preco: 2.99,
  },
  {
    nome: "Amendoim torrado",
    vendidos: 0,
    categoria: "Petiscos",
    imagem: "assets/petiscos/amendoim_torrado.jpg",
    descricao: "Amendoim torrado",
    preco: 3.00,
  },
  {
    nome: "Doritos pequeno",
    vendidos: 0,
    categoria: "Salgadinhos",
    imagem: "assets/salgadinhos/doritos.jpg",
    descricao: "Pacote Doritos pequeno 167g",
    preco: 7.00,
  },
  {
    nome: "água com gás 500ml",
    vendidos: 0,
    categoria: "Agua",
    imagem: "assets/agua/agua-c-gas.jpeg",
    descricao: "Água da Pedra Com gás garrafa de 500ml",
    preco: 2.50,
  },
  {
    nome: "Água sem gás 500ml",
    vendidos: 0,
    categoria: "Agua",
    imagem: "assets/agua//agua-s-gas.jpeg",
    descricao: "Água da Pedra Sem gás garrafa de 500ml",
    preco: 2.50,
  },
  {
    nome: "Pastel Carne/ Frango",
    vendidos: 0,
    categoria: "Lanches",
    imagem: "assets/lanches/pastel.jpeg",
    descricao: "Pastel de Carne ou Frango",
    preco: 7.00,
  },
];

// Gerar vendas aleatórias
produtos.forEach((p) => {
  p.vendidos = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
});

const container = document.getElementById("produtos");
const input = document.querySelector("input");
let categoriaSelecionada = "todas";

// Eventos para os botões de categoria
document.querySelectorAll(".filtros button").forEach((botao) => {
  botao.addEventListener("click", function () {
    categoriaSelecionada = this.getAttribute("data-categoria").toLowerCase();
    aplicarFiltro();
  });
});

// Evento de busca
input.addEventListener("input", aplicarFiltro);

function aplicarFiltro() {
  const termo = input.value.trim().toLowerCase();

  // Detectar se o termo é um filtro por faixa de vendas
  const operadores = ["<=", ">=", "<", ">", "==", "="];
  const operador = operadores.find((op) => termo.startsWith(op));
  const valor = operador ? parseInt(termo.replace(operador, "")) : null;

  let filtrados = produtos.filter((p) => {
    const porCategoria =
      categoriaSelecionada === "todas" ||
      p.categoria.toLowerCase() === categoriaSelecionada;

    let porTexto = true;

    // Se for filtro por vendas:
    if (operador && !isNaN(valor)) {
      switch (operador) {
        case ">":
          porTexto = p.vendidos > valor;
          break;
        case ">=":
          porTexto = p.vendidos >= valor;
          break;
        case "<":
          porTexto = p.vendidos < valor;
          break;
        case "<=":
          porTexto = p.vendidos <= valor;
          break;
        case "==":
        case "=":
          porTexto = p.vendidos === valor;
          break;
      }
    } else {
      // Filtro padrão por nome ou categoria
      porTexto =
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo);
    }

    return porCategoria && porTexto;
  });

  filtrados.sort((a, b) => b.vendidos - a.vendidos); // Mais vendido primeiro
  renderizar(filtrados);
  produtosFiltrados = filtrados;
}

function renderizar(lista) {
  const totalVendas = lista.reduce((acc, p) => acc + p.vendidos, 0);
  document.getElementById(
    "contador-produtos"
  ).innerHTML = `Exibindo <strong>${lista.length}</strong> produto(s) | <strong>${totalVendas}</strong> unidades vendidas`;
  container.innerHTML = "";
  if (lista.length === 0) {
    container.innerHTML = "<em>Nenhum produto encontrado.</em>";
    return;
  }

  lista.forEach((produto, index) => {
    const item = document.createElement("div");
    let classe = "";

    if (index === 0) classe = "ouro";
    else if (index === 1) classe = "prata";
    else if (index === 2) classe = "bronze";

    item.className = classe;
    item.style.cursor = "pointer"; // mostra que é clicável
    item.setAttribute("data-index", index); // para identificar o produto
    item.innerHTML = `<img src="${produto.imagem}" alt="${produto.descricao}">
        <strong class="cor-letras">${index + 1}° ${produto.nome}</strong>  ${
      produto.vendidos
    } unidades vendidas`;
    container.appendChild(item);
  });
  document.querySelectorAll("#produtos > div").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = card.getAttribute("data-index");
      abrirModal(lista[idx]);
    });
  });
}

function abrirModal(produto) {
  // Buscar posição no ranking
  const index = produtosFiltrados.findIndex(p => p.nome === produto.nome);

  // Define medalha conforme posição
  let medalha = "";
  if (index === 0) medalha = "🥇 Ouro";
  else if (index === 1) medalha = "🥈 Prata";
  else if (index === 2) medalha = "🥉 Bronze";

  document.getElementById("modalImagem").src = produto.imagem;
  document.getElementById("modalImagem").alt = produto.descricao;
  document.getElementById("modalNome").textContent = produto.nome;

  // Se tiver medalha, adiciona ao nome no modal
  document.getElementById("modalNome").textContent = medalha
    ? `${medalha} - ${produto.nome}`
    : produto.nome;

  document.getElementById("modalDescricao").textContent = produto.descricao;
  document.getElementById("modalCategoria").textContent = produto.categoria;
  document.getElementById("modalVendidos").textContent = produto.vendidos;
  document.getElementById("modalPreco").textContent = produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Mostrar o modal via Bootstrap 5 JS
  const modalElemento = document.getElementById("produtoModal");
  const modalBootstrap = new bootstrap.Modal(modalElemento);
  modalBootstrap.show();
}


// Renderização inicial
aplicarFiltro();

// PDF
function downloadPDF() {
  const button = document.querySelector(".PDF");
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando PDF...';
  const element = document.getElementById("pdf");
  const options = {
    margin: 0.6,
    filename: "TopVendas.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2},
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };
  setTimeout(() => {
  html2pdf()
    .set(options)
    .from(element)
    .save()
    .then(() => {
      button.innerHTML =
        '<i class="fa-solid fa-file-arrow-down"></i> Baixar Catálago em PDF';
    });
  }, 300);
}

// ao clicar
document.getElementById("toggleTema").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("tema", document.body.classList.contains("dark") ? "dark" : "light");
});

// ao carregar
if (localStorage.getItem("tema") === "dark") {
  document.body.classList.add("dark");
}


//inicio gráfico
let graficoAtual = null;

function abrirModalGrafico() {
  if (!produtosFiltrados.length) {
    alert("Nenhum produto para mostrar no gráfico.");
    return;
  }

  const nomes = produtosFiltrados.map(p => p.nome);
  const vendas = produtosFiltrados.map(p => p.vendidos);

  const modal = new bootstrap.Modal(document.getElementById("graficoModal"));
  modal.show();

  setTimeout(() => {
    const ctx = document.getElementById("graficoVendas").getContext("2d");

    if (graficoAtual) {
      graficoAtual.destroy();
    }

    graficoAtual = new Chart(ctx, {
      type: "bar",
      data: {
        labels: nomes,
        datasets: [{
          label: 'Unidades Vendidas',
          data: vendas,
          backgroundColor: 'rgba(30, 136, 229, 0.7)',
          borderColor: 'rgba(30, 136, 229, 1)',
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  }, 300);
}
