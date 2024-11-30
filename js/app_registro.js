const toggleconfirmPassword = document.querySelector("#toggleconfirmPassword");
const password = document.querySelector("#id_password");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});

function alertaRegistro(){
  alert("Se ha registrado exitosamente");
}