lista = [
    "startscript.js",
    "jszip/jszip.js",
    "jszip/jszip-load.js",
    "jszip/jszip-deflate.js",
    "jszip/jszip-inflate.js"
  ];
for(i=0;i<lista.length;i++){
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(lista[i]);
    s.onload = function() {
        this.parentNode.removeChild(this);
    };
    (document.head||document.documentElement).appendChild(s);    
}
// var s = document.createElement('img');
// s.id="coolimg";
// s.src="http://img.submanga.com/pages/3/205/205502850/1.jpg";
// document.body.appendChild(s);    
// capturar los ultimo caps
var table = document.querySelector('table.caps');
table.style.color = 'Red';
var tds = document.querySelectorAll('td.r.b.s.xs');
var as = document.querySelectorAll('td.s a');
// console.log(tds);


for (i = 0; i < tds.length; i++){
  //nombre del manga
  html = as[i].innerHTML;
  nombre = html.substring(0, html.indexOf("<strong>"));
  numero = html.substring(html.indexOf("<strong>")+8, html.indexOf("</strong>"));
  //id del capitulo
  lista = as[i].href.split('/');
  id=lista[lista.length-1];
  // console.log('nombre:'+nombre+' num:'+numero+' ID:'+id);
  tds[i].innerHTML = tds[i].innerHTML + '<a href="#" onClick="javascript: getCapImgList(\''+id+'\'); void 0">Descargar Aqui!!</a>'; 
}
