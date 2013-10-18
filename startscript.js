
function downloadThisForMePls(id,name,cap){
  lista = getCapImgList(id)
  console.log(lista);
}

function createZipPackage(lista, calback){
  console.log("creando zip");
  var zip = new JSZip();
  var pkg = zip.folder("nombredelcapynum");
  zip.file("Readme.txt", "chamullo\n");
  var count = lista.length;
  images = [];
  i=1;
  // for(i=0;i<lista.length;i++){

    images[i] = new Image();
    images[i].onload = function(){
      img =images[i];
      // img.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      context.drawImage(img, 0, 0 );
      // myData = context.getImageData(0, 0, img.width, img.height);
      myData = canvas.toDataURL();
      console.log(myData);
      console.log(img);
      // console.log(myData);
      // pkg.file( ""+i+".jpg", img);
    };
    images[i].crossOrigin = 'anonymous';
    images[i].src = lista[i];
      
  // }
  // var content = zip.generate();
  // console.log("finalizando empaquetado");
  // location.href="data:application/zip;base64,"+content;
}

function getCapImgList(id){
    // console.log(id);
    //lista del las urls de la imagenes
    url="http://submanga.com/c/"+id;
    pageLoad(url, function(html){
      data = getCountForSelect(html);
      lista_urls = [];
      if(data){
        for(i=1;i<=data.nPages;i++){
          url = data.urlImg.replace("/1.","/"+i+".");
          lista_urls[i-1] = url;
        }  
      }
      else{
        html = html.substring(html.indexOf('<div><a'),html.indexOf('</a></div>'));
        lista= html.split('</a><a');
        for(i=0;i<lista.length;i++){
          lista_urls[i]= lista[i].substring(lista[i].indexOf('<img src=')+10,lista[i].indexOf('"/>'));
        }
      } 
      console.log(lista_urls);
      createZipPackage(lista_urls);
    });
}

function pageLoad(url,callback){
  var xmlhttp;
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      callback(xmlhttp.responseText);
    }
  }
  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}

function getCountForSelect(html){
  // lastIndex = html.indexOf("</option></select>");
  lh = html.split("</option></select>");
  if(lh.length > 1){
    ll = lh[0].split(">");
    n_pages = ll[ll.length-1];
    html = html.substring(html.indexOf('<div><a'),html.indexOf('</a></div>'));
    url_img = html.substring(html.indexOf('<img src="')+10,html.indexOf('"/>'));
    return {
      nPages: n_pages,
      urlImg: url_img
    }
  }
  else{
    return false;
  }  
}


