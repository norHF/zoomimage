function imageZoom(imgID, resultID) {
  var img, lens, result, pointer, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  pointer = document.getElementById("pointer"); // Obtén el puntero

  // Crear lente
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  img.parentElement.insertBefore(lens, img);
  
  // Establecer un tamaño fijo para el DIV de resultado
  var resultWidth = 450; // Ancho deseado en píxeles
  var resultHeight = 350; // Alto deseado en píxeles

  result.style.width = resultWidth + "px";
  result.style.height = resultHeight + "px";

  cx = resultWidth / lens.offsetWidth;
  cy = resultHeight / lens.offsetHeight;

  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

  // Inicializar la posición de la lente y el puntero
  const borderLeftOffset = 65; 
  const borderBottomOffset = 20; 
  
  const initialX = 4 + borderLeftOffset; 
  const initialY = img.height - lens.offsetHeight - borderBottomOffset;
  
  lens.style.left = initialX + "px";
  lens.style.top = initialY + "px";

  // Mover el resultado de acuerdo a la posición inicial
  result.style.backgroundPosition = "-" + (initialX * cx) + "px -" + (initialY * cy) + "px";

  // Agregar eventos de movimiento del mouse
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  
  // Evento para mostrar y mover puntero
  lens.addEventListener("mousemove", showPointer);
  lens.addEventListener("touchmove", showPointer);

  function showPointer(e) {
    // Mostrar puntero
    pointer.style.display = "block";
    var pos = getCursorPos(e);
    pointer.style.left = (pos.x - pointer.offsetWidth / 2) + "px";
    pointer.style.top = (pos.y - pointer.offsetHeight / 2) + "px";
  }

  function moveLens(e) {
    var pos, x, y;
    e.preventDefault();
    pos = getCursorPos(e);
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);

    // Prevenir que la lente se posicione fuera de la imagen
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}

    lens.style.left = x + "px";
    lens.style.top = y + "px";
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x: x, y: y};
  }
}
