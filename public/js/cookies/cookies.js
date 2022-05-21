function puxaCookie(k) {
    var cookies = " " + document.cookie;
    var key = " " + k + "=";
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(";", pos);

    if (last !== -1) return cookies.substring(pos, last);

    return cookies.substring(pos);
}

function enviarCookie(k, v, expira, path) {
    if (!path) path = "/";

    var d = new Date();
    d.setTime(d.getTime() + (expira * 1000));

    document.cookie = encodeURIComponent(k) + "=" + encodeURIComponent(v) + "; expires=" + d.toUTCString() + "; path=" + path;
}

function apaga_cookie(nome){
    // Cria uma data no passado 01/01/2010
    var data = new Date(2010,0,01);
    // Converte a data para GMT
    data = data.toGMTString();
    // Tenta modificar o valor do cookie para a data expirada
    // Assim ele será apagado
    document.cookie = nome + '=; expires=' + data + '; path=/';
}
