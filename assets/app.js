/*
-------------------------------------------------
Buscador: Biblia version Reina Valera 2000
Version: 0.1.2
Autor: Sebastián López
URI: https://github.com/sebaslopezg/JSB_2000
Iglesia Central de Cartago, Valle del Cauca
-------------------------------------------------
Datos procesados por: José Vladimir
URI: https://github.com/josevladimir/bible-json
-------------------------------------------------
*/

const mostrar = document.getElementById('mostrar');
const buscar = document.getElementById('buscar');
const cuadro_busqueda = document.getElementById('cuadro_busqueda');
const sugerencias = document.querySelector("#sugerencias");
const rango = document.getElementById('rango');
let saltos = 0;
let saltosCap = 0;
let inputTarget = false;
let clicEnBusqueda = false;

if(config.show_search_button == false){
  buscar.style.display = "none";
}

if(config.show_size_bar == false){
  rango.style.display = "none";
}

buscar.addEventListener("click", ()=>{
  busqueda();
  saltos = 0;
});

window.addEventListener("click", (e)=>{
  if(e.target.tagName != "INPUT"){
    inputTarget = false;

  }else{
    inputTarget = true;
  }

  if(e.target == cuadro_busqueda){
    clicEnBusqueda = true;
  }else if(e.target != cuadro_busqueda){
    clicEnBusqueda = false;
  }

  //console.log("Estado de clic en busqueda: " + clicEnBusqueda);
  
});

window.addEventListener("keydown", (e)=>{
  console.log(e.key)

  if(e.key == 'ArrowRight' || e.key == 'PageDown'){
    clicEnBusqueda ? "" : busqueda("siguiente"); //cambiar - Detectar si el campo está activo
  }

  if(e.key == 'ArrowLeft' || e.key == 'PageUp'){
    clicEnBusqueda ? "" : busqueda("anterior"); //cambiar - Detectar si el campo está activo
  }

  if(e.key == 'ArrowUp' && e.ctrlKey == true){
    
    inputTarget ? "" : moverRango("up");
  }

  if(e.key == 'ArrowDown' && e.ctrlKey == true){
    inputTarget ? "" : moverRango("down");
  }

});

cuadro_busqueda.addEventListener("keydown", (e) =>{

  if(e.key == 'Enter'){
    saltos = 0;
    busqueda();
  }

});

autocomplete(cuadro_busqueda, libros);

// ------------------ funcion de buscar ----------------------- //
//Editar funcion buscar, quitar validaciones para usar: separarCita()
function busqueda(siguienteAnterior = undefined){

  let texto;
  let letras = cuadro_busqueda.value;
  let arrCita = separarCita(letras)
  let libroSelecionado = buscarLibro(arrCita[0])
  let capitulo = parseInt(arrCita[1])
  let versiculo = parseInt(arrCita[2])
  
  try {
    let citaActualizada
    let placeHolder

    if (siguienteAnterior == "siguiente" || siguienteAnterior == "anterior") {

      //texto = placeHolder
      if(siguienteAnterior == "siguiente"){
        versiculo++
      }else if(siguienteAnterior == "anterior"){
        versiculo--
      }

      placeHolder = buscarCapver(libroSelecionado, capitulo, versiculo)

      if (placeHolder != undefined) {
        citaActualizada = arrCita[0] + " " + arrCita[1] + ":" + versiculo
        cuadro_busqueda.value = citaActualizada
        texto = placeHolder        
      }else{
        texto = buscarCapver(libroSelecionado, capitulo, arrCita[2])
      }
         
    }else{
      //texto = buscarCapver(libroSelecionado, capver, limver);
      texto = buscarCapver(libroSelecionado, capitulo, versiculo);
    }

    mostrar.innerHTML = texto;
  }catch (e){}
}

function buscarCapver(array, capitulo = undefined, versiculo = undefined, limver = undefined, siguienteAnterior = undefined){
  let respuesta = "";

  //buscar todo el libro
  if(capitulo == undefined && versiculo == undefined){
    console.log('todo el libro')
    array.forEach((element) => {
      element.forEach( element => {
        respuesta +=  `<p>${element}</p>`;
      });
    });
    respuesta = formatear(respuesta);
    return respuesta;
  }else if(limver == undefined){
    //Buscar todo el capitulo versiculo (capver)
    if (versiculo == undefined) {

      capitulo = parseInt(capitulo)-1;

      array[capitulo].forEach((item, index) =>{
        respuesta += `<p><span class="inver">${index+1}</span>${item}</p>`;
      });
    }else{
      capitulo = parseInt(capitulo)-1;
      versiculo = parseInt(versiculo)-1;
      respuesta = `<span class="inver">${versiculo+1}</span>`+array[capitulo][versiculo];
    }

    if (array[capitulo][versiculo] == undefined) {
      respuesta = undefined
    }else{
      respuesta = formatear(respuesta);
    }
    
    return respuesta;

  }else{
    //buscar capver con limite
    // establecer limite para la busqueda [PENDIENTE]
  }
}

function formatear(res){
  return res.replace(/\/n/gi, "<br>")
}

// ----------- Funcion para separar las citas ---------- ///

function separarCita(texto){
  
  let arrRespuesta = []
  let arrCrumbs = []
  let arrCrumbsFormated = []
  let arrTexto = texto.split(' ') 

  arrTexto.forEach((element)=>{
    crumb = element.split(':')
    crumb.forEach((el)=>arrCrumbs.push(el))
  })

  arrCrumbs.forEach((item) => {
    if(item != ""){
      arrCrumbsFormated.push(item);
    }
  });

  arrCrumbsFormated.forEach((el, index) =>{
     if (esNumero(el) && index == 0) {
      arrRespuesta[0] = el
     }else{
      if (esNumero(el)) {
        arrRespuesta.push(el)
       }
     }

     if (!esNumero(el)) {
      arrRespuesta[0] === undefined ? arrRespuesta[0] = el : arrRespuesta[0] += ` ${el}` 
     }
  })

  return arrRespuesta
}

//funcion para revisar si es numero
function esNumero(value){
  let res
  if(!Number.isNaN(value - 1)){
    res = true
  }else{
    res = false
  }

  return res
}


//RANGO

mostrar.style.fontSize = rango.value+"px";

rango.addEventListener("input", () => {
  mostrar.style.fontSize = rango.value+"px"
});

function moverRango(direccion){
  if(direccion == "up"){
    rango.setAttribute("value", rango.value++);
    mostrar.style.fontSize = rango.value+"px";
  }

  if(direccion == "down"){
    rango.setAttribute("value", rango.value--);
    mostrar.style.fontSize = rango.value+"px";
    
  }
}

//FIN RANGO


// FUNCION DE AUTOCOMPLETAR

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}