
$(function () {
    $("#btn-calcula-frete-carrinho").click(function () {
        let cepDestino = $("#txCep").val();
        if (!cepDestino) {
            $("#txCep").prop('placeholder', 'Informe o CEP');
            return false;
        }
        calculaFreteCarrinho(cepDestino);
    });
});


function AtualizarCarrinho() {
    $.get('/carrinho/itens', function (itens) {
        carrinhoMenu(itens);
        carrinhoPag(itens);
    }, 'json');
}

function informaQtd(acao = '', element) {
    if (!element) {
        return;
    }
    let valorAtual = parseFloat(element.value);
    let embalagemPadrao = parseFloat(element.dataset.qtdvda) || 0;
    if (isNaN(embalagemPadrao)) {
        embalagemPadrao = 0;
    }
    if (!valorAtual) {
        valorAtual = embalagemPadrao;
    }
    if (acao === 'up') {
        valorAtual += embalagemPadrao;
    }
    if (acao === 'down') {
        valorAtual -= embalagemPadrao;
    }
    if (valorAtual <= 0) {
        valorAtual = embalagemPadrao;
    }
    let embalagens = valorAtual / embalagemPadrao;
    let resto = valorAtual % embalagemPadrao;
    if (resto !== 0) {
        embalagens = Math.ceil(embalagens);
    }
    element.value = (embalagens * embalagemPadrao).toFixed(2);
}

function AddProduct(Codigo, IdVariacao, Qtd, Descricao) {
    $.post('/carrinho/add', { CodProduto: Codigo, IdProdVariacao: IdVariacao, Qtd: Qtd }).success(function () {
        AtualizarCarrinho();
        $(".cartMenu a").addClass("bg-success");
        $.notify('Produto: ' + Descricao + ' adicionado ao carrinho!', {
            className: 'success',
            autoHide: true,
            autoHideDelay: 3000
        });
        setTimeout(function () {
            $(".cartMenu a").removeClass("bg-success");
        }, 3000);
    });
}



function DelProduct(IdItemCart) {
    $.post('carrinho/del', { Id: IdItemCart }).success(function () {
        AtualizarCarrinho();
    });
}

function AltProduct(IdItemCart, Qtd) {
    $.post('carrinho/upd', { Id: IdItemCart, Qtd: parseFloat(Qtd).toFixed(2) }).success(function () {
        AtualizarCarrinho();
    });
}

function carrinhoPag(itens) {
    if (itens) {
        itensCarrinho = itens;
        if (itens.length > 0) {
            let html = '<ul class="cart-header">';
            html += '<li class="cart-header-description">itens</li>';
            html += '<li class="cart-header-price">pre&ccedil;o</li>';
            html += '<li class="cart-header-quantity">qtd</li>';
            html += '<li class="cart-header-subtotal">subtotal</li>';
            html += '</ul>';
            html += montaCarrinho(itens);
            $("#cart").html(html);
            $(".input-atualiza-qtd").blur(function () {
                let id = $(this).attr("id-item");
                AltProduct(id, $(this).val());
            });
            $(".btn-sub-qtd").click(function () {
                let id = $(this).attr("id-item");
                let qtd = Number($(this).attr("qtd-item")) - Number($(this).attr("qtd-emb"));
                AltProduct(id, qtd);
            });
            $(".btn-add-qtd").click(function () {
                let id = $(this).attr("id-item");
                let qtd = Number($(this).attr("qtd-item")) + Number($(this).attr("qtd-emb"));
                AltProduct(id, qtd);
            });
            $(".btn-del-item").click(function () {
                let id = $(this).attr("id-item");
                DelProduct(id);
            });
        } else {
            $("#cart").html('<div class="container text-center">' +
                '<h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2>' +
                '<p>Para adicionar produtos navegue pela loja e quando encontrar o que deseja clique em <a class="btn btn-primary" href="#"><i class="glyphicon glyphicon-shopping-cart"></i> Comprar</a></p>' +
                '</div>');
        }
    } else {
        $("#cart").html('<div class="container text-center">' +
            '<h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2>' +
            '<p>Para adicionar produtos navegue pela loja e quando encontrar o que deseja clique em <a class="btn btn-primary" href="#"><i class="glyphicon glyphicon-shopping-cart"></i> Comprar</a></p>' +
            '</div>');
    }
}

function carrinhoMenu(itens) {
    if (itens) {
        if (typeof tableItens !== 'undefined') {
            tableItens.itens = itens;
        }
        if (itens.length > 0) {
            $(".cart-count").html(itens.length);
            $("#cart_mini_m").html(montaCarrinho(itens, "N"));
            $("#cart_mini_d").html(montaCarrinho(itens, "N"));
            $("#cart_mini_m_footer").show();
            $("#cart_mini_d_footer").show();
            $(".footer-cart").show();
            $(".btn-checkout").show();
            $(".input-atualiza-qtd").blur(function () {
                let id = $(this).attr("id-item");
                AltProduct(id, $(this).val());
            });
            $(".btn-sub-qtd").click(function () {
                let id = $(this).attr("id-item");
                let qtd = Number($(this).attr("qtd-item")) - Number($(this).attr("qtd-emb"));
                AltProduct(id, qtd);
            });
            $(".btn-add-qtd").click(function () {
                let id = $(this).attr("id-item");
                let qtd = Number($(this).attr("qtd-item")) + Number($(this).attr("qtd-emb"));
                AltProduct(id, qtd);
            });
            $(".btn-del-item").click(function () {
                let id = $(this).attr("id-item");
                DelProduct(id);
            });

        } else {
            $(".cart-count").html('');
            $("#cart").html('<div class="container text-center">' +
                '<h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2>' +
                '<p>Para adicionar produtos navegue pela loja e quando encontrar o que deseja clique em <a class="btn btn-primary" href="<?php echo base_url() ?>"><i class="glyphicon glyphicon-shopping-cart"></i> Comprar</a></p>' +
                '</div>');
            $("#cart_mini_m").html('<div class="text-center"><h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2></div>');
            $("#cart_mini_m_footer").hide();
            $("#cart_mini_d").html('<div class="text-center"><h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2></div>');
            $("#cart_mini_d_footer").hide();
            $(".footer-cart").hide();
            $(".btn-checkout").hide();
        }
        totalizaCarrinho();
    } else {
        $(".cart-count").html('');
        $("#cart").html('<div class="container text-center">' +
            '<h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2>' +
            '<p>Para adicionar produtos navegue pela loja e quando encontrar o que deseja clique em <a class="btn btn-primary" href="<?php echo base_url() ?>"><i class="glyphicon glyphicon-shopping-cart"></i> Comprar</a></p>' +
            '</div>');
        $("#cart_mini_m").html('<div class="text-center"><h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2></div>');
        $("#cart_mini_m_footer").hide();
        $("#cart_mini_d").html('<div class="text-center"><h2><i class="fa fa-frown-o fa-2x"></i> Seu carrinho est&aacute; vazio.</h2></div>');
        $("#cart_mini_d_footer").hide();
        $(".footer-cart").hide();
        $(".btn-checkout").hide();
    }

}

function montaCarrinho(itens, buttons) {
    let scrollStyle = '';
    if (!buttons) {
        buttons = "S";
    }
    if (buttons === "N") {
        scrollStyle = 'max-height:250px;overflow:auto;overflow-x: hidden;';
    }
    let url_prefix = 'https://amgestoroutput.s3.amazonaws.com/';
    let html = '<ul class="cart-itens" style="' + scrollStyle + '">';
    let sum = 0;
    for (let i = 0; i < itens.length; i++) {
        let qtdEmb = itens[i].QtdEmb;
        if (qtdEmb === 0) {
            qtdEmb = 1;
        }

        html += '<li class="cart-item">';
        html += '<ul rel="' + itens[i].IdItemCarrinho + '">';
        html += '<li class="cart-item-image"><img src="' + url_prefix + itens[i].Imagem + '" alt="' + itens[i].Descricao + '"></li>';
        html += '<li class="cart-item-description">' + itens[i].Descricao + '</li>';
        html += '<li class="cart-item-price">' + numeral(itens[i].Unit).format("0.00") + '</li>';
        html += '<li class="cart-item-quantity">';
        if (buttons === "S") {
            html += '<div class="input-group">' +
                '<span class="input-group-btn">' +
                '<button type="button" class="btn btn-default btn-icon fa fa-minus btn-sub-qtd" id-item="' + itens[i].IdItemCarrinho + '" qtd-item="' + itens[i].Quantidade + '" qtd-emb="' + qtdEmb + '"></button>' +
                '</span>' +
                '<input type="text" class="form-control input-atualiza-qtd" id-item="' + itens[i].IdItemCarrinho + '" value="' + itens[i].Quantidade + '">' +
                '<span class="input-group-btn">' +
                '<button type="button" class="btn btn-default btn-icon fa fa-plus btn-add-qtd" id-item="' + itens[i].IdItemCarrinho + '" qtd-item="' + itens[i].Quantidade + '" qtd-emb="' + qtdEmb + '"></button>' +
                '</span>' +
                '</div>';
        } else {
            html += itens[i].Quantidade;
        }
        html += '</li>';
        html += '<li class="cart-item-subtotal">' + numeral(itens[i].Total).format("0.00") + '</li>';
        if (buttons === "S") {
            html += '<li class="cart-item-remove"><button type="button" class="btn btn-default btn-del-item" title="Remover item" id-item="' + itens[i].IdItemCarrinho + '">X</button></li>';
        }
        html += '</ul>';
        html += '</li>';
        sum += itens[i].Total;
    }
    html += '</ul>';

    return html;
}

function totalizaCarrinho() {
    $.get('/carrinho/total', function (ret) {
        $(".cart-subtotal").html(numeral(ret.subtotal).format("0.00"));
        $(".cart-frete").html(numeral(ret.frete).format("0.00"));
        $(".cart-total").html(numeral(ret.total).format("0.00"));
    }, 'json');
}

function calculaFreteProduto(codProduto, cepDestino) {
    let divResultado = $("#div-result-frete");
    divResultado.html('<div class="text-center"><br><i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i></div>');
    $.get('/produto/calculafrete?codProduto=' + codProduto + '&cepDestino=' + cepDestino, function (data) {
        divResultado.html('');
        if (!data["0"]) {
            return false;
        }
        let htmlFrete = '<table class="table table-condensed"><thead><tr><th>tipo de entrega</th><th>frete</th><th>prazo</th></tr></thead>';

        for (let i = 0; i < data.length; i++) {
            htmlFrete += '<tr>';
            htmlFrete += '<td>' + data[i].NomeServico + '</td>';
            htmlFrete += '<td>R$ ' + numeral(data[i].Valor).format("0.00") + '</td>';
            htmlFrete += '<td>' + data[i].PrazoEntrega + ' dias &uacute;teis.</td>';
            htmlFrete += '</td>';
            if (data[i].MsgErro) {
                htmlFrete += '<tr><td colspan="3" class="obs-frete">' + data["0"].MsgErro + '</td></tr>';
            }
        }
        htmlFrete += '</table>';
        divResultado.append(htmlFrete);
    }, 'json');
}

function calculaFreteCarrinho(cepDestino) {
    let divResultado = $("#div-result-frete");
    divResultado.html('<div class="text-center"><br><i class="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i></div>');
    $.get('/carrinho/calculafrete?cepDestino=' + cepDestino, function (data) {
        divResultado.html('');
        if (!data["0"]) {
            return false;
        }
        let htmlFrete = '<table class="table table-condensed"><thead><tr><th></th><th>tipo de entrega</th><th>frete</th><th>prazo</th></tr></thead>';

        for (let i = 0; i < data.length; i++) {
            htmlFrete += '<tr>';
            htmlFrete += '<td><input type="radio" name="codFrete" value="' + data[i].Codigo + '" data-idserv="' + i + '"></td>';
            htmlFrete += '<td>' + data[i].NomeServico + '</td>';
            htmlFrete += '<td>R$ ' + numeral(data[i].Valor).format("0.00") + '</td>';
            htmlFrete += '<td>' + data[i].PrazoEntrega + ' dias &uacute;teis.</td>';
            htmlFrete += '</td>';
            if (data[i].MsgErro) {
                htmlFrete += '<tr><td colspan="4" class="obs-frete">' + data["0"].MsgErro + '</td></tr>';
            }
        }
        htmlFrete += '</table>';
        divResultado.append(htmlFrete);
        $("input[name=codFrete]").click(function () {
            informaFrete($(this).data("idserv"), cepDestino);
        });
    }, 'json');
}

function informaFrete(idServ, cepDestino) {
    $.post('/carrinho/informafrete', {
        idServico: idServ,
        cepDestino: cepDestino
    }).done(function () {
        AtualizarCarrinho();
    });
}


AtualizarCarrinho();


function buscaCep(cep, callback) {
    $.get('/carrinho/buscacep?cep=' + cep, function (ret) {
        callback(ret);
    }, 'json');
}