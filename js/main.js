// ===== ELEMENTOS =====
const formulario = document.querySelector("#formulario");
const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const mensajeExito = document.querySelector("#mensaje-exito");
const botonTema = document.querySelector("#btn-theme");

const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ===== FUNCIONES AUXILIARES =====
function marcarError(campo, selectorError, mensaje) {
    campo.classList.add("error");
    campo.classList.remove("correcto");
    document.querySelector(selectorError).textContent = mensaje;
}

function marcarCorrecto(campo, selectorError) {
    campo.classList.remove("error");
    campo.classList.add("correcto");
    document.querySelector(selectorError).textContent = "";
}

// ===== VALIDACIONES =====
function validarTexto(campo, selectorError, mensaje) {
    if (campo.value.trim() === "") {
        marcarError(campo, selectorError, mensaje);
        return false;
    }
    marcarCorrecto(campo, selectorError);
    return true;
}

function validarEmail() {
    const valor = email.value.trim();

    if (valor === "") {
        marcarError(email, "#error-email", "El correo es obligatorio");
        return false;
    }
    if (!patronEmail.test(valor)) {
        marcarError(email, "#error-email", "Correo no válido (ejemplo: nombre@dominio.com)");
        return false;
    }
    marcarCorrecto(email, "#error-email");
    return true;
}

// Validación en directo al salir de cada campo
nombre.addEventListener("blur", () =>
    validarTexto(nombre, "#error-nombre", "El nombre es obligatorio"));
apellido.addEventListener("blur", () =>
    validarTexto(apellido, "#error-apellido", "El apellido es obligatorio"));
email.addEventListener("blur", validarEmail);

// ===== ENVÍO DEL FORMULARIO =====
formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    mensajeExito.textContent = "";

    const nombreOk = validarTexto(nombre, "#error-nombre", "El nombre es obligatorio");
    const apellidoOk = validarTexto(apellido, "#error-apellido", "El apellido es obligatorio");
    const emailOk = validarEmail();

    if (nombreOk && apellidoOk && emailOk) {
        console.log("Formulario correcto");
        mensajeExito.textContent = "Solicitud enviada correctamente.";
        formulario.reset();
        [nombre, apellido, email].forEach((campo) => campo.classList.remove("correcto"));
    }
});

// ===== CAMBIO DE TEMA =====
try {
    if (localStorage.getItem("tema") === "oscuro") {
        document.body.classList.add("dark-mode");
    }
} catch (e) {
    // localStorage no disponible: se ignora
}

botonTema.addEventListener("click", () => {
    const oscuro = document.body.classList.toggle("dark-mode");
    try {
        localStorage.setItem("tema", oscuro ? "oscuro" : "claro");
    } catch (e) {
        // se ignora
    }
});
