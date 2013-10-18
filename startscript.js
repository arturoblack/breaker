hs = window.location.hostname;
if( hs=="img.submanga.com" || hs == "omg.submanga.com"){
  console.log("SS load in static page");
  params = window.location.search;
  list_uri = params.split("&");
  name = list_uri[0].split("=")[1];
  cap = list_uri[1].split("=")[1];
  obj =  list_uri[2].split("=")[1];
  lista = JSON.parse(obj.replace(/%22/g,'"'));
  createZipPkg(name,cap,lista);
}

function downloadThisForMePls(id,name,cap){
  console.log("start"+name);
  getCapImgList(id,name,cap,function(lista,name,cap){
    str = JSON.stringify(lista);
    sd = lista[0].substring(6,10); // http://img.submanga.com/pages/2/205/205951660/1.jpg
    uri = "http://"+sd+".submanga.com/?name=" + uf(name) +"&cap="+cap+ "&lista="+str;
    console.log(uri)
    alert("redirect");
    location.href = uri;
  });
  
  // location.href = uri + "?name=" + uf(name) +"cap="+cap+ "&lista="+uf(str);
  
}
function uf(str) {
  str = escape(str);
  str = str.replace('+', '%2B');
  str = str.replace('%20', '+');
  str = str.replace('*', '%2A');
  str = str.replace('/', '%2F');
  str = str.replace('@', '%40');
  return str;
}

function urldecode(str) {
  str = str.replace('+', ' ');
  str = unescape(str);
  return str;
}
function luf(list){
  for(i=0;i<list.length;i++){

  }
}

function createZipPackage(lista){
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

function getCapImgList(id,name,cap,callback){
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
      callback(lista_urls,name,cap);
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

function createZipPkg(name,cap,lista){
  console.log("init zip pkg");
  console.log("creando zip");
  var zip = new JSZip();
  var pkg = zip.folder("nombredelcapynum");
  zip.file("Readme.txt", "chamullo\n");
var count = 1;
var max = lista.length;
console.log("trabajando en "+lista.length + " imagenes")
var images=[];
for(i=0;i<lista.length;i++){

    images[i] = new Image();
    images[i].onload = function(){
      img =this;
      // img.crossOrigin = ''; // no credentials flag. Same as img.crossOrigin='anonymous'
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      context.drawImage(img, 0, 0 );
      // myData = context.getImageData(0, 0, img.width, img.height);
      myData = canvas.toDataURL().replace("data:image/png;base64,","");
      console.log(myData)
      // "data:image/jpeg;base64,"+
      console.log("work in image n "+count);
      document.write("<br/>work in image n "+count);
      // pkg.file( ""+i+".jpg", img);
      pkg.file(""+count+".png", myData, {base64: true});
      if(count<max){
        count++;
      }
      else{
        var content = zip.generate();
        console.log("finalizando empaquetado");
        location.href="data:application/zip;base64,"+content;
      }
    };
    images[i].crossOrigin = 'anonymous';
    images[i].src = lista[i];
      
  }

  
}
