hs = window.location.hostname;
if( hs=="img.submanga.com" || hs == "omg.submanga.com"){
  console.log("SM static page");
  // document.querySelector('body').innerHTML("Creando el packete, espere porfabor");
  var head = document.createElement('head');
  var body = document.createElement('body');
  document.head = head;
  document.body = body; 
  // createZipPkg(window.location.href);
  // document.querySelector('body').innerHTML("Creando el packete, espere porfabor");
  // body.innerHTML("Creando el packete, espere porfabor");
  lista = [
        "jszip/jszip.js",
        "jszip/jszip-load.js",
        "jszip/jszip-deflate.js",
        "jszip/jszip-inflate.js",
        "startscript.js",
      ];
    for(i=0;i<lista.length;i++){
        var s = document.createElement('script');
        s.src = chrome.extension.getURL(lista[i]);
        s.onload = function() {
            this.parentNode.removeChild(this);
        };
        (document.head||document.documentElement).appendChild(s);    
    }
    document.write("Creando el packete, espere porfabor");
    
}
else{
  console.log("SM main page");

  lista = [
      "startscript.js",
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
    tds[i].innerHTML = tds[i].innerHTML + '<a href="#" onClick="javascript: downloadThisForMePls(\''+id+'\'); void 0">Descargar Aqui!!</a>'; 
  }
}