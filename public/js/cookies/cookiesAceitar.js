var purecookieTitle="Cookies.",
                  purecookieDesc="Ao usar este site, você aceita automaticamente que usamos cookies.",
                  purecookieLink='<a href="https://lojavirtuallm.web.app/privacidade.html" target="_blank">Pelo que?</a>';
                  
                  function pureFadeIn(e,o){
                    var i=document.getElementById(e);
                    i.style.opacity=0,i.style.display=o||"block",function e(){var o=parseFloat(i.style.opacity);(o+=.02)>1||(i.style.opacity=o,requestAnimationFrame(e))}()}
                    function pureFadeOut(e){var o=document.getElementById(e);o.style.opacity=1,function e(){(o.style.opacity-=.02)<0?o.style.display="none":requestAnimationFrame(e)}()}
                    function setCookie(e,o,i){var t="";if(i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3),t="; expires="+n.toUTCString()}document.cookie=e+"="+(o||"")+t+"; path=/"}
                    function getCookie(e){for(var o=e+"=",i=document.cookie.split(";"),t=0;t<i.length;t++){for(var n=i[t];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return null}
                    function eraseCookie(e){document.cookie=e+"=; Max-Age=-99999999;"}
                    function cookieConsent(){
                      getCookie("purecookieDismiss")||(
                        document.body.innerHTML+=`<div class="cookieConsentContainer" id="cookieConsentContainer" style="opacity: 1; display: block;">
                                                    <div class="cookieTitle">
                                                      <a class="a-cookies" >Cookies</a>
                                                    </div>
                                                    <div class="cookieDesc">
                                                      <p>Ao usar este site, você aceita automaticamente que usamos cookies.<a href="https://lojavirtuallm.web.app/privacidade.html" target="_blank">Pelo que?</a></p>
                                                    </div>
                                                    <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: flex-start;">
                                                      <div class="cookieButton" style="margin-right: 8px">
                                                        <a onclick="purecookieDismiss();">Aceitar</a>
                                                      </div>
                                                      <div class="cookieButton"><a onclick="purecookieDismiss();">Recusar</a></div>
                                                      </div>
                                                    </div>`,
                                                                                                                                                                                                                                                                                                
                    pureFadeIn("cookieConsentContainer"))}
                    function purecookieDismiss(){
                      setCookie("purecookieDismiss","1",7),pureFadeOut("cookieConsentContainer")}window.onload=function(){cookieConsent()};


