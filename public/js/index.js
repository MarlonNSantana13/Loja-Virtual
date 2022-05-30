const db = firebase.firestore();
const produtos = db.collection('produtos');

const listaElemento = document.querySelector('#lista__produtos');


 // btnCarrinho.addEventListener('click', (e) => {
//  console.log("CLICOU NO PRODUTO");
 //});




//carrinho.innerHTML =
// `
 // <a class="a-normal" href="/carrinho.html">Carrinho</a>
//  `;


 


const criarItem = (produto) => {

    if(produto.unidades <= 0){

        return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2.2.3">
        <div class="card text-center bg-light">
          <a href="#">
            <img src="${produto.imagem}" class="card-img-top">
          </a>
          <div class="card-header text-dark">
           R$ ${produto.preco} a Unidade
          </div>
          <div class="card-body">
            <h5 class="card-title text-dark">${produto.name}</h5>
          </div>
          <div class="card-footer">
            <div class="input-group">
              <input type="text" class="number form-control" id="IDDOPRODUTO" value="0">
              <span class="input-group-btn">
                <button disabled id="submit" type="button" class="btn btn-primary btn-comprar">
                <span>Sem Estoque</span>
              </button>
            </span>
          </div>
            <small class="text-danger">${produto.unidades} Unidades em estoque</small>
          </div>
        </div>
      </div>
`
    }else{

    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2.2.3">
        <div class="card text-center bg-light">
          <a href="/${produto.name}.html">
            <img src="${produto.imagem}" class="card-img-top">
          </a>
          <div class="card-header text-dark">
           R$ ${produto.preco} a Unidade
          </div>
          <div class="card-body">
            <h5 class="card-title text-dark">${produto.name}</h5>
          </div>
          <div class="card-footer">
            <div class="input-group">
              <input type="number" class="number form-control" id="quantidade_${produto.id}" value="1">
              <span class="input-group-btn">
                <span class="btn btn-primary btn-comprar" onClick='addItemCarrinho(${produto.id})'>Adicionar ao Carrinho</span>
              </button>
            </span>
          </div>
            <small class="text-success">${produto.unidades} Unidades em estoque</small>
          </div>
        </div>
      </div>
`
    }
}


const renderizarLista = (arrayProdutos) => {
    listaElemento.innerHTML = arrayProdutos.map((produto) => {

        return criarItem(produto)

    }).join(" ")
}

produtos.get().then((querySnapshot) => {

  const arrayProdutos = querySnapshot.docs.map(item => item.data());
  renderizarLista(arrayProdutos);
   
});