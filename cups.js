function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /* Crear lente: */
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /* Insertar lente: */
  img.parentElement.insertBefore(lens, img);
  
  /* Establecer un tamaño fijo para el DIV de resultado */
  var resultWidth = 450; // Ancho deseado en píxeles
  var resultHeight = 350; // Alto deseado en píxeles
  
  result.style.width = resultWidth + "px";
  result.style.height = resultHeight + "px";
  
  /* Calcular la relación entre el DIV de resultado y la lente: */
  cx = resultWidth / lens.offsetWidth; // Usar ancho fijo en lugar de img.width
  cy = resultHeight / lens.offsetHeight; // Usar alto fijo en lugar de img.height
  
  /* Establecer propiedades de fondo para el DIV de resultado */
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px"; // Este sigue dependiendo del tamaño de la imagen original
  
  /* Ejecutar una función cuando alguien mueva el cursor sobre la imagen o la lente: */
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /* Y también para pantallas táctiles: */
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  
  function moveLens(e) {
    var pos, x, y;
    /* Prevenir cualquier otra acción que pueda ocurrir al mover sobre la imagen */
    e.preventDefault();
    /* Obtener las posiciones x e y del cursor: */
    pos = getCursorPos(e);
    /* Calcular la posición de la lente: */
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /* Prevenir que la lente se posicione fuera de la imagen: */
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /* Establecer la posición de la lente: */
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /* Mostrar lo que la lente "ve": */
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Obtener las posiciones x e y de la imagen: */
    a = img.getBoundingClientRect();
    /* Calcular las coordenadas x e y del cursor, en relación a la imagen: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Considerar el desplazamiento de la página: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x: x, y: y};
  }
}
