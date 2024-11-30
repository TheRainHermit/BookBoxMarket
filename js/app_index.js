//Gestión de Pestañas
function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

//Slideshow página de inicio
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

let modal = document.getElementById("id01");
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#id_password");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});

//Funciones del Carrito

let carrito = [];
let total = 0;

function agregarAlCarrito(id, nombre, precio) {
  const id_cajamostrar = document.getElementById("id_caja");
  // Agregar producto al carrito
  carrito.push({ id, nombre, precio });

  // Actualizar el total
  total += precio;

  id_cajamostrar.value = id;

  // Mostrar los productos en el carrito
  mostrarCarrito();
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById("carrito");
  const totalCarrito = document.getElementById("total");

  //const idcaja = document.getElementById('id_caja');

  // Limpiar la lista actual
  listaCarrito.innerHTML = "";

  // Añadir los productos al carrito
  carrito.forEach((item) => {
    const li = document.createElement("li");
    const br = document.createElement("br");
    li.textContent =
      "ID_Caja " +
      item.id +
      " | " +
      "Nombre de caja: " +
      item.nombre +
      " | " +
      " Precio: $" +
      item.precio;

    listaCarrito.appendChild(li);
    listaCarrito.appendChild(br);
  });

  // Mostrar el total
  totalCarrito.textContent = "Total: " + total;
}

//Fecha actual
function toDateInputValue(dateObject) {
  const local = new Date(dateObject);
  local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}
document.getElementById("fecha_compra").value = toDateInputValue(new Date());
document.getElementById("fecha_compra").style.visibility = "hidden";

//Select Método Pago - Carrito Compra


function getSelect() {
  var metodo_pago = document.getElementById("metodo_pago2").value;
  document.getElementById("metodo_pago").value = metodo_pago;
}


function alerta(){
  alert("Su solicitud de contacto ha sido recibida");
}